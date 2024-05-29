const express = require('express');
const { getProfile, updateProfile, deleteAccount, uploadProfileImage } = require('../controllers/profileController');
const authenticateToken = require('../middleware/authMiddleware');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/', authenticateToken, getProfile);
router.put('/', authenticateToken, updateProfile);
router.delete('/', authenticateToken, deleteAccount);
router.post('/image', authenticateToken, upload.single('profileImage'), uploadProfileImage);

module.exports = router;
