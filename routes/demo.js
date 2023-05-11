const express =require('express');
const router = express.Router();
const demoController = require('../controllers/demo_controller');

router.get('/demo' ,  demoController.demo);
module.exports = router;