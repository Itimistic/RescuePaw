const User = require("../models/user")

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const newUser = await User.create({ username, email, password })
        res.json(newUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { username } = req.params
        const user = await User.findOne({
            where: {
                username: username
            }
        })
        if (!user) return res.status(404).json({ error: "User not found" })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}