const express = require("express")
const router = express.Router()
const donateController = require("../controllers/donateController")

router.get("/", donateController.getDonation)
router.post("/", donateController.createDonation)
router.get("/:id", donateController.getDonationByOrderId)
// router.get("/:username", userController.getUserById)

module.exports = router