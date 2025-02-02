const { Employee } = require('../database/models');
const sendResponse = require('../utils/responseUtil');
const bcrypt = require('bcrypt');

class EmployeeController {
    static async create(req, res) {
        try {

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            const employee = await Employee.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role,
                departmentId: req.body.departmentId
            });
            const { password, ...employeeData } = employee.dataValues;
            sendResponse(res, 201, true, `Employee created successfully!`, employeeData);
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                const errors = error.errors.map(err => ({
                    field: err.path,
                    message: err.message
                }));

                if (errors.message == "email must be unique") {
                    return sendResponse(res, 400, false, 'Email already exists', errors);
                }
                sendResponse(res, 400, false, 'Validation failed', errors);
            } else {
                sendResponse(res, 400, false, error.message);
            }
        }
    }

    static async getAll(req, res) {
        try {
            const employees = await Employee.findAll({
                include: ['role', 'department']
            });
            const employeesData = employees.map(employee => {
                const { password, roleId, departmentId, ...employeeData } = employee.dataValues;
                return employeeData;
            });
            sendResponse(res, 200, true, 'Employees fetched successfully!', employeesData);
        } catch (error) {
            sendResponse(res, 400, false, error.message);
        }
    }

    static async getById(req, res) {
        try {
            const employee = await Employee.findByPk(req.params.id, {
                include: ['role', 'department']
            });
            if (employee) {
                const { password, roleId, departmentId, ...employeeData } = employee.dataValues;
                sendResponse(res, 200, true, 'Employee fetched successfully!', employeeData);
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

    static async profile(req, res) {
        try {
            const profile = await Employee.findByPk(req.user.id, {
                include: ['role', 'department']
            });
            const { password, roleId, departmentId, ...profileData } = profile.dataValues;
            sendResponse(res, 200, true, 'Profile fetched successfully!', profileData);
        } catch (error) {
            sendResponse(res, 400, false, error.message);
        }
    }
}

module.exports = EmployeeController;
