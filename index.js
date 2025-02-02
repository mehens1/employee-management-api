const express = require('express');
const roleRoutes = require('./src/routes/roleRoutes');
const departmentRoutes = require('./src/routes/departmentRoutes');
const employeeRoutes = require('./src/routes/employeeRoutes');
const authRoutes = require('./src/routes/authRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const { authenticate } = require('./src/middleware/authentication');
const { authorizeAdmin, authorizeManager, authorizeManagerForDepartment } = require('./src/middleware/authorization');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(authenticate);

app.use('/api/roles', authorizeAdmin, roleRoutes);
app.use('/api/departments', authorizeAdmin, departmentRoutes);
app.use('/api/employees', authorizeManager, authorizeManagerForDepartment, employeeRoutes);
app.use('/api/profile', profileRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
