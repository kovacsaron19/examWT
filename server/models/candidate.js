const sequelize = require('../sequelize')
const { DataTypes } = require('sequelize');

const Candidate = sequelize.define('candidate', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5,100]
        }
    },
    cv: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10,10000]
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail:true
        }
    },
    jobId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Candidate;