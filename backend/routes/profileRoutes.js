const router  = require('express').Router();
const protect = require('../middleware/authMiddleware');
const { getMe } = require('../controllers/profileController');

router.get('/me', protect, getMe);

module.exports = router;
