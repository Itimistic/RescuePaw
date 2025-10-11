const express = require("express")
const router = express.Router()
const adoptformController = require("../controllers/adoptformController")

router.post("/", adoptformController.createAdoptForm)


module.exports = router
