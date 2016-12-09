
var express = require('express');
var router = express.Router();
var loginCtrl = require('./controllers/loginCtrl');
var userCtrl = require('./controllers/userCtrl');
var itemCtrl = require('./controllers/ItemCtrl');
var basketCtrl = require('./controllers/basketCtrl');

router.post('/login',loginCtrl.login);
router.get('/logout',loginCtrl.logout);
router.post('/register',userCtrl.addUser);

router.use(loginCtrl.checkToken);

router.get('/profile',userCtrl.getUserInfo);
router.get('/allItems',itemCtrl.getAllItems);

router.post('/addToBasket',basketCtrl.addToBasket);
router.post('/removeFromBasket',basketCtrl.removeFromBasket);
router.get('/showBasket',basketCtrl.showBasket);


module.exports = router;
