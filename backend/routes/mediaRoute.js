const { Router } = require('express');
const { getMedia, getMediaById, createMedia, updateMedia, deleteMedia } = require('../controllers/mediaController');

const router = Router();

router.get('/', getMedia);
router.get('/:id', getMediaById);
router.post('/', createMedia);
router.put('/:id', updateMedia);
router.delete('/:id', deleteMedia);

module.exports = router;