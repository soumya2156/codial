const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
// const demoController = require('../controllers/demo_controller');

console.log('router loaded SUCCESSFULLY!!');

router.get('/' , homeController.home);
router.use('/users' , require('./users'));
router.use('/demo' , require('./demo'));
// router.get('/demo1' , demoController.demo);

module.exports = router;
