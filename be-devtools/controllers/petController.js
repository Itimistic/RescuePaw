const Pet = require("../models/pet");

// Get all 
exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.findAll();
    res.json(pets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch pets" });
  }
};

// Get by ID
exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pet" });
  }
};

// Add
exports.createPet = async (req, res) => {
  try {
    const newPet = await Pet.create(req.body);
    res.status(201).json(newPet);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create pet" });
  }
};

// Update
exports.updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    await pet.update(req.body);
    res.json(pet);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to update pet" });
  }
};

// Delete 
exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    await pet.destroy();
    res.json({ message: "Pet deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete pet" });
  }
};
