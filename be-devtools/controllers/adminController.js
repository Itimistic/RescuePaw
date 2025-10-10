const Admin = require("../models/admin")

exports.getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findAll()
        res.json(admin)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.createAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const newAdmin = await Admin.create({ username, email, password })
        res.json(newAdmin)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getAdminById = async (req, res) => {
    try {
        const { id } = req.params
        const admin = await Admin.findOne({
            where: {
                id: id
            }
        })
        if (!admin) return res.status(404).json({ error: "User not found" })
        res.json(admin)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}