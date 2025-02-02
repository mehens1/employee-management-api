# Employee Management API

This is an Employee Management API built with Node.js, Express, and Sequelize. The API allows for managing employees, departments, and roles within an organization. It includes authentication and authorization mechanisms to ensure secure access to the resources.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication and Authorization](#authentication-and-authorization)
- [Database](#database)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/employee-management-api.git
    cd employee-management-api
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Set up the database:
    ```sh
    npx sequelize-cli db:migrate
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```

2. The server will be running on `http://localhost:3000`.

## API Endpoints

### Authentication

- `POST /api/auth/login`: Login and obtain a JWT token.

### Employees

- `POST /api/employees`: Create a new employee.
- `GET /api/employees`: Get all employees.
- `GET /api/employees/:id`: Get an employee by ID.
- `PUT /api/employees/:id`: Update an employee by ID.
- `DELETE /api/employees/:id`: Delete an employee by ID.
- `GET /api/profile`: Get the profile of the logged-in employee.

### Departments

- `POST /api/departments`: Create a new department.
- `GET /api/departments`: Get all departments.
- `GET /api/departments/:id`: Get a department by ID.
- `PUT /api/departments/:id`: Update a department by ID.
- `DELETE /api/departments/:id`: Delete a department by ID.

### Roles

- `POST /api/roles`: Create a new role.
- `GET /api/roles`: Get all roles.
- `GET /api/roles/:id`: Get a role by ID.
- `PUT /api/roles/:id`: Update a role by ID.
- `DELETE /api/roles/:id`: Delete a role by ID.

## Authentication and Authorization

- The API uses JWT for authentication.
- The  middleware is used to protect routes.
- The  middleware is used to restrict access to admin-only routes.
- The  middleware is used to restrict access to the user's own resources.

## Database

- The project uses MySQL as the database.
- Sequelize is used as the ORM.
- Database configuration can be found in .

## Environment Variables

Create a file in the root directory and add the following environment variables:
DB_HOST=localhost
DB_USER=your_local_server_username
DB_PASSWORD=your_local_server_password (if any)
DB_NAME=your_local_server_db_name
DB_DIALECT=mysql
JWT_SECRET=generate_your_jwt_token
