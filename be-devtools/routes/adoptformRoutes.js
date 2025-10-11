const express = require("express")
const router = express.Router()
const adoptformController = require("../controllers/adoptformController")

router.post("/", adoptformController.createAdoptForm)
router.get("/", adoptformController.getAdoptForm)
router.get("/:id", adoptformController.getAdoptFormById)
router.put("/:id/approve", adoptformController.approveAdoptForm);
router.put("/:id/reject", adoptformController.rejectAdoptForm);


module.exports = router
