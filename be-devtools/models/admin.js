const sequelize = require("../config/dbconn")
const { DataTypes } = require("sequelize")

const Admin = sequelize.define("Admin", {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Admin