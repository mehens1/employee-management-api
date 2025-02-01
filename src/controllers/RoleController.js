const { Role } = require('../database/models');
const sendResponse = require('../utils/responseUtil');

class RoleController {
    static async create(req, res) {
        try {
            const role = await Role.create(req.body);
            sendResponse(res, 201, true, "Role created successfully!", role);
        } catch (error) {
            sendResponse(res, 400, false, error.message);
        }
    }

    static async getAll(req, res) {
        try {
            const roles = await Role.findAll();
            sendResponse(res, 200, true, "Role fetched successfully!", roles);
        } catch (error) {
            sendResponse(res, 400, false, error.message);
        }
    }

    static async getById(req, res) {
        try {
            const role = await Role.findByPk(req.params.id);
            if (role) {
                sendResponse(res, 200, true, "Role fetched successfully!", role);
            } else {
                sendResponse(res, 404, false, 'Role not found');
            }
        } catch (error) {
            sendResponse(res, 400, false, error.message);
        }
    }

    static async update(req, res) {
        try {
            const role = await Role.findByPk(req.params.id);
            if (role) {
                await role.update(req.body);
                sendResponse(res, 200, true, "Role updated successfully!", role);
            } else {
                sendResponse(res, 404, false, 'Role not found');
            }
        } catch (error) {
            sendResponse(res, 400, false, error.message);
        }
    }

    static async delete(req, res) {
        try {
            const role = await Role.findByPk(req.params.id);
            if (role) {
                await role.destroy();
                sendResponse(res, 200, true, "Role deleted successfully!");
            } else {
                sendResponse(res, 404, false, 'Role not found');
            }
        } catch (error) {
            sendResponse(res, 400, false, error.message);
        }
    }
}

module.exports = RoleController;
