const sequelize = require("../config/dbconn")
const { DataTypes } = require("sequelize")

const Donation = sequelize.define("Donation", {
    donation_type: {
        type: DataTypes.ENUM("one-time", "per-month"),
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    donor_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING
    },
    order_id: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
    session_id: {
        type: DataTypes.STRING
    },
    email_sent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

})

module.exports = Donation

/**
 
donation table
- id
- donation_type
- amount
- donor_name
- donor_email
- slip_image
- status
- email_sent (true, false)

recurring_donation table
- id
- donation_id
- next_payment_date
- active

admin table
- id
- username
- password
- role

 */