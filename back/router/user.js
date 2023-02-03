const router = require('express').Router();
const userCtrl = require('../controllers/user');

const auth = require ('../auth/auth')

router.post('/signup', auth, userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/', auth, userCtrl.getUsers)
router.delete('/:id', auth, userCtrl.deleteUser)

module.exports = router; 