const sequelize = require("../config/dbconn")
const { DataTypes } = require("sequelize")

const AdoptForm = sequelize.define("AdoptForm", {
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    experiencewithPets: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    // agreeTerms: {
    //     type: DataTypes.BOOLEAN,
    //     allowNull: false,
    // },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = AdoptForm