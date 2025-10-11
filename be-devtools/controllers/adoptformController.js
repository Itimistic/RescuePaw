const AdoptForm = require('../models/adoptform');

// Get all adoption forms
exports.createAdoptForm = async (req, res) => {
    console.log('req.body', req.body);
    try {
        const { address, city, email, experiencewithpets, agreeterms, fullName, phone, reason, state, zip, pet_id } = req.body
        const newForm = await AdoptForm.create({ address, city, email, experiencewithpets, agreeterms, fullName, phone, reason, state, zip, pet_id })
        res.json(newForm)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

exports.getAdoptForm = async (req, res) => {
  console.log("yess")
  try {
    const adopt = await AdoptForm.findAll();

    res.status(200).json({
      success: true,
      data: adopt,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch adopt" });
  }

};

exports.getAdoptFormById = async (req, res) => {
  try {
    const adopt = await AdoptForm.findByPk(req.params.id);
    if (!adopt) return res.status(404).json({ message: "Adopt Form not found" });
    res.json({ data: adopt });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch adopt" });
  }
};

exports.approveAdoptForm = async (req, res) => {
    console.log(req.params.id)
  try {
    const form = await AdoptForm.findByPk(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });

    form.status = "approved";
    await form.save();

    res.json({ success: true, data: form });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.rejectAdoptForm = async (req, res) => {
  try {
    const form = await AdoptForm.findByPk(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });

    form.status = "rejected";
    await form.save();

    res.json({ success: true, data: form });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
