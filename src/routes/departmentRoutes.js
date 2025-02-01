const express = require('express');
const DepartmentController = require('../controllers/DepartmentController');

const router = express.Router();

router.post('/', DepartmentController.create);
router.get('/', DepartmentController.getAll);
router.get('/:id', DepartmentController.getById);
router.put('/:id', DepartmentController.update);
router.delete('/:id', DepartmentController.delete);

module.exports = router;