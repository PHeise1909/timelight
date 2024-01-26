const express = require('express');
const router = express.Router();
const { setAnswer } = require('../controllers/answersController');

router.post('/', setAnswer);

module.exports = router;