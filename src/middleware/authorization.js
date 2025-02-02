const { Employee, Role, Department } = require('../database/models');
const sendResponse = require('../utils/responseUtil');

const authorizeAdmin = async (req, res, next) => {
    try {
        const employee = await Employee.findByPk(req.user.id, {
            include: {
                model: Role,
                as: 'role'
            }
        });

        // Admin has full access
        if (!employee.role || employee.role.name.toLowerCase() !== 'admin') {
            return sendResponse(res, 403, false, 'Access Denied, Because you are not an admin!');
        }

        next();
    } catch (error) {
        sendResponse(res, 500, false, error.message);
    }
};

const authorizeManager = async (req, res, next) => {
    try {
        const employee = await Employee.findByPk(req.user.id, {
            include: {
                model: Role,
                as: 'role'
            }
        });

        if (!employee.role || (employee.role.name.toLowerCase() !== 'manager' && employee.role.name.toLowerCase() !== 'admin')) {
            return sendResponse(res, 403, false, 'Access Denied, because you are not a Manager!');
        }

        next();
    } catch (error) {
        sendResponse(res, 500, false, error.message);
    }
};

const authorizeManagerForDepartment = async (req, res, next) => {
    try {
        const employee = await Employee.findByPk(req.user.id, {
            include: {
                model: Department,
                as: 'department'
            }
        });

        const targetEmployee = await Employee.findByPk(req.user.id);

        if (employee.department.id !== targetEmployee.departmentId) {
            return sendResponse(res, 403, false, 'Access Denied!');
        }

        next();
    } catch (error) {
        sendResponse(res, 500, false, error.message);
    }
};

module.exports = { authorizeAdmin, authorizeManager, authorizeManagerForDepartment };