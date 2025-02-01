const express = require('express');
const roleRoutes = require('./src/routes/roleRoutes');
const departmentRoutes = require('./src/routes/departmentRoutes');
const employeeRoutes = require('./src/routes/employeeRoutes');

const app = express();

app.use(express.json());

app.use('/api/roles', roleRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
