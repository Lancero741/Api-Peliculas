const fs = require('fs');
const path = require('path');

const basePath = 'C:\\SEMESTRE2026-1\\IW2\\AA1';

// Fix Models: estado -> isActive (Boolean)
const models = ['Director.js', 'Genero.js', 'Productora.js', 'Tipo.js'];
models.forEach(model => {
    const p = path.join(basePath, 'backend/models', model);
    if (!fs.existsSync(p)) return;
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/estado:\s*\{\s*type:\s*String,\s*required:\s*true,\s*enum:\s*\['Activo',\s*'Inactivo'\],\s*default:\s*'Activo'\s*\}/g, 'isActive: { type: Boolean, default: true }');
    fs.writeFileSync(p, content);
});

// Fix Controllers
const controllers = [
    { file: 'generoController.js', single: 'genero', plural: 'generos', model: 'Genero' },
    { file: 'productoraController.js', single: 'productora', plural: 'productoras', model: 'Productora' },
    { file: 'tipoController.js', single: 'tipo', plural: 'tipos', model: 'Tipo' },
    { file: 'directorController.js', single: 'director', plural: 'directores', model: 'Director' }
];

controllers.forEach(({file, single, plural, model}) => {
    const p = path.join(basePath, 'backend/controllers', file);
    if (!fs.existsSync(p)) return;
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/const entities =/g, `const ${plural} =`);
    content = content.replace(/res\.status\(200\)\.json\(entities\)/g, `res.status(200).json(${plural})`);
    content = content.replace(/const entity =/g, `const ${single} =`);
    content = content.replace(/if \(\!entity\)/g, `if (!${single})`);
    content = content.replace(/res\.status\(200\)\.json\(entity\)/g, `res.status(200).json(${single})`);
    content = content.replace(/res\.status\(201\)\.json\(entity\)/g, `res.status(201).json(${single})`);
    
    // rename generic exist flags
    content = content.replace(/const exists =/g, `const existing${model} =`);
    content = content.replace(/if \(exists\)/g, `if (existing${model})`);
    content = content.replace(/const directorDB =/g, `const existingDirector =`);
    content = content.replace(/if \(directorDB\)/g, `if (existingDirector)`);
    
    // descriptive errors
    content = content.replace(/\{\s*msg:\s*'Error',\s*error\s*\}/g, `{ message: 'Error procesando los datos para la entidad ${single}', errorDetails: error }`);
    
    fs.writeFileSync(p, content);
});

// Fix mediaController.js 'exists'
const mediaCPath = path.join(basePath, 'backend/controllers/mediaController.js');
if (fs.existsSync(mediaCPath)) {
    let mediaCContent = fs.readFileSync(mediaCPath, 'utf8');
    mediaCContent = mediaCContent.replace(/const exists =/g, `const existingMedia =`);
    mediaCContent = mediaCContent.replace(/if \(exists\)/g, `if (existingMedia)`);
    fs.writeFileSync(mediaCPath, mediaCContent);
}

// Fix React pages: data -> fetchedMediaList, item -> mediaItem
const mediaListPath = path.join(basePath, 'frontend/src/pages/media-list.jsx');
if (fs.existsSync(mediaListPath)) {
    let mediaListContent = fs.readFileSync(mediaListPath, 'utf8');
    mediaListContent = mediaListContent.replace(/const \{ data \} = await api\.get\('\/media'\);/g, "const { data: fetchedMediaList } = await api.get('/media');");
    mediaListContent = mediaListContent.replace(/setMedias\(data\);/g, "setMedias(fetchedMediaList);");
    mediaListContent = mediaListContent.replace(/medias\.map\(item =>/g, "medias.map(mediaItem =>");
    mediaListContent = mediaListContent.replace(/item\./g, "mediaItem.");
    fs.writeFileSync(mediaListPath, mediaListContent);
}

// Rename routes to reveal their role
const routes = ['director', 'genero', 'media', 'productora', 'tipo'];
const indexP = path.join(basePath, 'backend/index.js');
if (fs.existsSync(indexP)) {
    let indexC = fs.readFileSync(indexP, 'utf8');
    routes.forEach(r => {
        const oldR = path.join(basePath, `backend/routes/${r}.js`);
        const newR = path.join(basePath, `backend/routes/${r}Route.js`);
        if(fs.existsSync(oldR)) {
            fs.renameSync(oldR, newR);
            indexC = indexC.replace(`require('./routes/${r}')`, `require('./routes/${r}Route')`);
        }
    });
    fs.writeFileSync(indexP, indexC);
}

console.log("Semantic refactor complete!");
