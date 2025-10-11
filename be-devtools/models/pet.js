const sequelize = require("../config/dbconn")
const { DataTypes } = require("sequelize")

const Pet = sequelize.define("Pet", {
    name: {
        type: DataTypes.STRING,
    },
    species: {
        type: DataTypes.ENUM("cat", "dog")
    },
    breed: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    gender: {
        type: DataTypes.ENUM("male", "female"),
    },
    size: {
        type: DataTypes.ENUM("small", "medium", "large"),
    },
    image: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM('available', 'adopted'),
        defaultValue: 'available'
    },
})

module.exports = Pet