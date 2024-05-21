// routes/signupRoutes.js

const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');
const multer = require('multer');
const upload = multer();
// Signup route
router.post('/signup',upload.single('photo'), signupController.signup);

module.exports = router;
