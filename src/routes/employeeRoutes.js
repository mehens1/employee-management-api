const express = require('express');
const EmployeeController = require('../controllers/EmployeeController');

const router = express.Router();

router.post('/', EmployeeController.create);
router.get('/', EmployeeController.getAll);
router.get('/:id', EmployeeController.getById);
router.put('/:id', EmployeeController.update);
router.delete('/:id', EmployeeController.delete);
router.get('/profile/:id', EmployeeController.profile);

module.exports = router;