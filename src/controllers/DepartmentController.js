const { Department } = require('../database/models');
const sendResponse = require('../utils/responseUtil');

class DepartmentController {
    static async create(req, res) {
        try {
            console.log('req.body: ', req.body);
            const department = await Department.create(req.body);
            sendResponse(res, 201, true, "Department created successfully!", department);
        } catch (error) {
            sendResponse(res, 400, false, error.message);
        }
    }

    static async getAll(req, res) {
        try {
            const departments = await Department.findAll();
            sendResponse(res, 200, true, "Departments fetched successfully!", departments);
        } catch (error) {
            sendResponse(res, 400, false, error.message);
        }
    }

    static async getById(req, res) {
        try {
            const department = await Department.findByPk(req.params.id);
            if (department) {
                sendResponse(res, 200, true, "Department fetched successfully!", department);
            } else {
                sendResponse(res, 404, false, 'Department not found');
            }
        } catch (error) {
            sendResponse(res, 400, false, error.message);
        }
    }

    static async update(req, res) {
        try {
            const department = await Department.findByPk(req.params.id);
            if (department) {
                await department.update(req.body);
                sendResponse(res, 200, true, "Department updated successfully!", department);
            } else {
                sendResponse(res, 404, false, 'Department not found');
            }
        } catch (error) {
            sendResponse(res, 400, false, error.message);
        }
    }

    static async delete(req, res) {
        try {
            const department = await Department.findByPk(req.params.id);
            if (department) {
                await department.destroy();
                sendResponse(res, 200, true, "Department deleted successfully!");
            } else {
                sendResponse(res, 404, false, 'Department not found');
            }
        } catch (error) {
            sendResponse(res, 400, false, error.message);
        }
    }
}

module.exports = DepartmentController;
