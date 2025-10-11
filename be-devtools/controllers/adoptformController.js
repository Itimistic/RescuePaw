const AdoptForm = require('../models/adoptform');

// Get all adoption forms
exports.createAdoptForm = async (req, res) => {
    console.log('req.body', req.body);
    try {
        const { address, city, email, experiencewithPets, fullName, phone, reason, state, zip } = req.body
        const newForm = await AdoptForm.create({ address, city, email, experiencewithPets, fullName, phone, reason, state, zip })
        res.json(newForm)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

