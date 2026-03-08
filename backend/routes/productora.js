const { Router } = require('express');

const { getProductoras, createProductora } = require('../controllers/tipoController');

const router = Router();

router.get('/', getProductoras);

router.post('/', createProductora);

module.exports = router;