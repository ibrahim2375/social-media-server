const router = require('express').Router();
//routes
router.use('/auth/register', require('./auth'));
router.use('/auth/login', require('./login'));
router.use('/user', require('./getUserAndFriends'));
//posts 
router.use('/posts', require('./Posts/read'));
router.use('/posts/create', require('./Posts/write'));
router.use('/posts/update', require('./Posts/update'));

module.exports = router