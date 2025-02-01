const { Employee } = require('../database/models');
const sendResponse = require('../utils/responseUtil');

class EmployeeController {
    static async create(req, res) {
        try {
            const employee = await Employee.create(req.body);
            sendResponse(res, 201, true, `Employee created successfully!`, employee);
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                const errors = error.errors.map(err => ({
                    field: err.path,
                    message: err.message
                }));
                sendResponse(res, 400, false, 'Validation failed', errors);
            } else {
                sendResponse(res, 400, false, error.message);
            }
        }
    }

    static async getAll(req, res) {
        try {
            const employees = await Employee.findAll();
            sendResponse(res, 200, true, 'Employees fetched successfully!', employees);
        } catch (error) {
            sendResponse(res, 400, false, error.message);
        }
    }

    static async getById(req, res) {
        try {
            const employee = await Employee.findByPk(req.params.id);
            if (employee) {
                sendResponse(res, 200, true, 'Employee fetched successfully!', employee);
            } else {
                sendResponse(res, 404, false, 'Employee not found');
            }
        } catch (error) {
            sendResponse(res, 400, false, error.message);
        }
    }

    static async update(req, res) {
        try {
            const employee = await Employee.findByPk(req.params.id);
            if (employee) {
                await employee.update(req.body);
                sendResponse(res, 200, true, 'Employee updated successfully!', employee);
            } else {
                sendResponse(res, 404, false, 'Employee not found');
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const employee = await Employee.findByPk(req.params.id);
            if (employee) {
                await employee.destroy();
                sendResponse(res, 200, true, 'Employee deleted successfully!');
            } else {
                sendResponse(res, 404, false, 'Employee not found');
            }
        } catch (error) {
            sendResponse(res, 400, false, error.message);
        }
    }
}

module.exports = EmployeeController;
