const express = require('express');
const router = express.Router();
const { getEvaluation } = require('../controllers/evaluationController');

router.get('/', getEvaluation);

module.exports = router;