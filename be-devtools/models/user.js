const sequelize = require("../config/dbconn")
const { DataTypes } = require("sequelize")

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = User