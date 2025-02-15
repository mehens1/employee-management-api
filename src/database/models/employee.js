'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      // Correct association for roleId
      Employee.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role'
      });
      // Correct association for departmentId
      Employee.belongsTo(models.Department, {
        foreignKey: 'departmentId',
        as: 'department'
      });
    }
  }

  Employee.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id',
      }
    },
    departmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Departments',
        key: 'id'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Employee',
    tableName: 'employees'
  });

  return Employee;
};

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Employee extends Model {
//     static associate(models) {
//       Employee.belongsTo(models.Department, {
//         foreignKey: 'departmentId',
//         as: 'department'
//       });
//       Employee.belongsTo(models.Role, {
//         foreignKey: 'roleId',
//         as: 'role'
//       })
//     }
//   }
//   Employee.init({
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true
//     },
//     roleId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'Roles',
//         key: 'id',
//       }
//     },
//     departmentId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'Departments',
//         key: 'id'
//       }
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//   }, {
//     sequelize,
//     modelName: 'Employee',
//     tableName: 'employees'
//   });
//   return Employee;
// };