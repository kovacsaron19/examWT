const sequelize = require('../sequelize')
const { DataTypes } = require('sequelize');

const JobPosting = sequelize.define('jobPosting', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3,2000]
        }
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

module.exports = JobPosting;