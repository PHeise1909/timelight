const express = require('express');
const router = express.Router();
const { setUser } = require('../controllers/userController');

router.get('/', setUser);

module.exports = router;