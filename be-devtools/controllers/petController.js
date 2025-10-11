const Pet = require('../models/pet');

// Get all pets with filters
const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.findAll({
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      success: true,
      data: pets,
    });
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสัตว์',
      error: error.message,
    });
  }
};

// Get single pet by ID
const getPetById = async (req, res) => {
  try {
    const { id } = req.params;

    const pet = await Pet.findByPk(id);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบข้อมูลสัตว์',
      });
    }

    res.status(200).json({
      success: true,
      data: pet,
    });
  } catch (error) {
    console.error('Error fetching pet:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสัตว์',
      error: error.message,
    });
  }
};

module.exports = {
  getAllPets,
  getPetById
};