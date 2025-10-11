// import express from "express";
// import { createReport } from "../controllers/reportController";
const express = require("express")
const { createReport } = require("../controllers/reportController")
const { getAllReports, deleteReport } = require("../controllers/reportController")
const router = express.Router();

// POST /api/report → บันทึกข้อมูลรายงาน
router.post("/", createReport);

// GET /api/report → ดึงข้อมูลทั้งหมด
router.get("/", getAllReports);

router.delete("/:id", deleteReport);


module.exports = router;
