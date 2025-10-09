const express = require("express")
const router = express.Router()
const donateController = require("../controllers/donateController")

// router.get("/", userController.getUsers)
router.post("/", donateController.createDonation)
router.get("/:id", donateController.getDonation)
// router.get("/:username", userController.getUserById)

module.exports = router