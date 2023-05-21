const { Router } = require('express');
const authController = require('../controllers/userController');
const router = Router();
var bodyParser = require('body-parser')
const authorization = require('../middleware/authorization')

router.post('/register', authController.signup);
router.get('/login', authController.login);
router.get('/user', authorization, authController.get_User); 


module.exports = router;