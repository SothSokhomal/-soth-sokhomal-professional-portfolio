import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFilePath = path.join(__dirname, '../security_audit.log');

export const securityLogger = {
  log: (event, details) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] EVENT: ${event} | DETAILS: ${JSON.stringify(details)}\n`;
    fs.appendFile(logFilePath, logEntry, (err) => {
      if (err) console.error('[Security Logger] Failed to write to audit log', err);
    });
  }
};

