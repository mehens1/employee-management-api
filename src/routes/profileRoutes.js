const express = require('express');
const EmployeeController = require('../controllers/EmployeeController');

const router = express.Router();

router.get('/', EmployeeController.profile);

module.exports = router;

