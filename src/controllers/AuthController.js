require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Employee } = require('../database/models');
const sendResponse = require('../utils/responseUtil');

class AuthController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await Employee.findOne({
                where: { email },
                include: [
                    'role',
                    'department'
                ]
            });

            if (!user) {
                return sendResponse(res, 401, false, 'Invalid email or password');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return sendResponse(res, 401, false, 'Invalid email or password');
            }

            const role = user.role ? user.role.dataValues.name : null;

            const token = jwt.sign(
                { id: user.id, role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            const { password: userPassword, ...userData } = user.dataValues;

            res.json({
                status: true,
                message: 'Login successful!',
                data: {
                    token: `Bearer ${token}`,
                    user: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        role: user.role,
                        department: user.department
                    }
                }
            });
        } catch (error) {
            sendResponse(res, 400, false, error.message);
        }
    }
}

module.exports = AuthController;