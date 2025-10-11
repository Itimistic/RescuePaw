const sequelize = require("../config/dbconn")
const { DataTypes } = require("sequelize")

const Report = sequelize.define("Report", {
    event: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
        unique: false
    },
    details: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    }
})

module.exports = Report
