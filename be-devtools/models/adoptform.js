const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconn");
const Pet = require("./pet");

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
  experiencewithpets: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  agreeterms: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
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
  pet_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pet,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  status: {
    type: DataTypes.ENUM("wait", "approved", "rejected"),
    defaultValue: "wait"
  }
});

// 🧩 สร้าง Association ตรงนี้ได้เลย
AdoptForm.belongsTo(Pet, { foreignKey: "pet_id" });
Pet.hasMany(AdoptForm, { foreignKey: "pet_id" });

module.exports = AdoptForm;
