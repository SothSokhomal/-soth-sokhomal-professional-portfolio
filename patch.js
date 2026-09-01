import fs from 'fs';

let code = fs.readFileSync('server.js', 'utf8');

const fixes = [
  { find: "app.('', authMiddleware, async (req, res) => {", 
    replace: "app.post('/api/projects', authMiddleware, validate(ProjectSchema), async (req, res) => {" }, // 710
  { find: "app.('', authMiddleware, async (req, res) => {", 
    replace: "app.post('/api/messages', contactLimiter, validate(MessageSchema), async (req, res) => {" }, // 850
  { find: "app.('', authMiddleware, async (req, res) => {", 
    replace: "app.put('/api/settings', authMiddleware, validate(SettingsSchema), async (req, res) => {" }, // 976
  { find: "app.('', authMiddleware, async (req, res) => {", 
    replace: "app.post('/api/upload-resume', authMiddleware, async (req, res) => {" }, // 1070
  { find: "app.('', authMiddleware, async (req, res) => {", 
    replace: "app.post('/api/experiences', authMiddleware, validate(ExperienceSchema), async (req, res) => {" }, // 1278
  { find: "app.('', authMiddleware, async (req, res) => {", 
    replace: "app.post('/api/achievements', authMiddleware, validate(AchievementSchema), async (req, res) => {" }, // 1342
  { find: "app.('', authMiddleware, async (req, res) => {", 
    replace: "app.post('/api/tech-categories', authMiddleware, validate(TechCategorySchema), async (req, res) => {" }, // 1410
  { find: "app.('', authMiddleware, async (req, res) => {", 
    replace: "app.post('/api/languages', authMiddleware, validate(LanguageSchema), async (req, res) => {" } // 1472
];

fixes.forEach(fix => {
  code = code.replace(fix.find, fix.replace);
});

// Now we also need to protect PUT, DELETE, and remaining unprotected endpoints
code = code.replace("app.put('/api/projects/:id', async (req, res) => {", "app.put('/api/projects/:id', authMiddleware, validate(ProjectSchema), async (req, res) => {");
code = code.replace("app.delete('/api/projects/:id', async (req, res) => {", "app.delete('/api/projects/:id', authMiddleware, async (req, res) => {");

code = code.replace("app.put('/api/messages/:id/read', async (req, res) => {", "app.put('/api/messages/:id/read', authMiddleware, async (req, res) => {");
code = code.replace("app.delete('/api/messages/:id', async (req, res) => {", "app.delete('/api/messages/:id', authMiddleware, async (req, res) => {");

code = code.replace("app.post('/api/upload', upload.single('file'), async (req, res) => {", "app.post('/api/upload', authMiddleware, upload.single('file'), async (req, res) => {");

code = code.replace("app.put('/api/experiences/:id', async (req, res) => {", "app.put('/api/experiences/:id', authMiddleware, validate(ExperienceSchema), async (req, res) => {");
code = code.replace("app.delete('/api/experiences/:id', async (req, res) => {", "app.delete('/api/experiences/:id', authMiddleware, async (req, res) => {");

code = code.replace("app.put('/api/achievements/:id', async (req, res) => {", "app.put('/api/achievements/:id', authMiddleware, validate(AchievementSchema), async (req, res) => {");
code = code.replace("app.delete('/api/achievements/:id', async (req, res) => {", "app.delete('/api/achievements/:id', authMiddleware, async (req, res) => {");

code = code.replace("app.put('/api/tech-categories/:id', async (req, res) => {", "app.put('/api/tech-categories/:id', authMiddleware, validate(TechCategorySchema), async (req, res) => {");
code = code.replace("app.delete('/api/tech-categories/:id', async (req, res) => {", "app.delete('/api/tech-categories/:id', authMiddleware, async (req, res) => {");

code = code.replace("app.put('/api/languages/:id', async (req, res) => {", "app.put('/api/languages/:id', authMiddleware, validate(LanguageSchema), async (req, res) => {");
code = code.replace("app.delete('/api/languages/:id', async (req, res) => {", "app.delete('/api/languages/:id', authMiddleware, async (req, res) => {");

fs.writeFileSync('server.js', code);
console.log('Patch complete.');

