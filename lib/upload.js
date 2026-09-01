import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary credentials if available
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  console.log('[Cloudinary] Configured successfully.');
} else {
  console.warn('[Cloudinary Warning] Missing Cloudinary environment variables (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET). File uploads will use GridFS or local fallback.');
}

/**
 * Uploads a file buffer (PDF or Image) to Cloudinary.
 * @param {Buffer} fileBuffer - File buffer from multer memoryStorage
 * @param {string} originalName - Original filename
 * @param {string} folder - Destination folder in Cloudinary
 * @returns {Promise<{ secure_url: string, public_id: string }>}
 */
export const uploadFileToCloudinary = (fileBuffer, originalName, folder = 'portfolio/certificates') => {
  return new Promise((resolve, reject) => {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return reject(new Error('Cloudinary environment variables are not configured in .env file.'));
    }

    const isPdf = originalName.toLowerCase().endsWith('.pdf');
    // PDF files should use 'raw' resource_type or 'auto'
    const resourceType = isPdf ? 'raw' : 'auto';

    const safeName = originalName
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9]/g, '_');

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        public_id: `${Date.now()}_${safeName}`,
      },
      (error, result) => {
        if (error) {
          console.error('[Cloudinary Upload Error]:', error);
          return reject(error);
        }
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
};
