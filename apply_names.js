const fs = require('fs');
const path = require('path');

const basePath = 'C:\\SEMESTRE2026-1\\IW2\\AA1';

// Format Frontend files to kebab-case
const frontendRenames = [
  ['frontend/src/App.jsx', 'frontend/src/app.jsx'],
  ['frontend/src/components/Navbar.jsx', 'frontend/src/components/navbar.jsx'],
  ['frontend/src/pages/Dashboard.jsx', 'frontend/src/pages/dashboard.jsx'],
  ['frontend/src/pages/MediaList.jsx', 'frontend/src/pages/media-list.jsx']
];

frontendRenames.forEach(([oldFile, newFile]) => {
  const oldPath = path.join(basePath, oldFile);
  const tempPath = path.join(basePath, oldFile + '.tmp');
  const newPath = path.join(basePath, newFile);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, tempPath);
    fs.renameSync(tempPath, newPath);
  }
});

// Format Backend Media.js (force PascalCase)
const mediaPath = path.join(basePath, 'backend/models/media.js');
const mediaTemp = path.join(basePath, 'backend/models/Media.tmp.js');
const mediaPascal = path.join(basePath, 'backend/models/Media.js');

if (fs.existsSync(mediaPath)) {
    fs.renameSync(mediaPath, mediaTemp);
    fs.renameSync(mediaTemp, mediaPascal);
}

// Fix imports in main.jsx
const mainPath = path.join(basePath, 'frontend/src/main.jsx');
if (fs.existsSync(mainPath)) {
  let mainContent = fs.readFileSync(mainPath, 'utf8');
  mainContent = mainContent.replace(/'\.\/App\.jsx'/g, "'./app.jsx'");
  mainContent = mainContent.replace(/import App from '\.\/App\.jsx'/g, "import App from './app.jsx'");
  fs.writeFileSync(mainPath, mainContent);
}

// Fix imports in app.jsx
const appPath = path.join(basePath, 'frontend/src/app.jsx');
if (fs.existsSync(appPath)) {
  let appContent = fs.readFileSync(appPath, 'utf8');
  appContent = appContent.replace(/'\.\/components\/Navbar'/g, "'./components/navbar'");
  appContent = appContent.replace(/'\.\/pages\/Dashboard'/g, "'./pages/dashboard'");
  appContent = appContent.replace(/'\.\/pages\/MediaList'/g, "'./pages/media-list'");
  fs.writeFileSync(appPath, appContent);
}

console.log('Naming conventions applied successfully.');
