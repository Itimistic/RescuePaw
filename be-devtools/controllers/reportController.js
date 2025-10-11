// import Report from "../models/report.js";

const Report = require("../models/reports")

exports.createReport = async (req, res) => {
  try {
    const { event, location, date, time, details, image } = req.body;

    const report = await Report.create({
      event,
      location,
      date,
      time,
      details,
      image,
    });

    res.status(201).json({ message: "บันทึกข้อมูลสำเร็จ", data: report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "ไม่สามารถดึงข้อมูลได้" });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Delete id:", id);
    const report = await Report.findByPk(id);
    console.log("Found report:", report); 

    if (!report) {
      return res.status(404).json({ message: "ไม่พบข้อมูล" });
    }

    await report.destroy();
    res.json({ message: "ลบข้อมูลสำเร็จ" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการลบข้อมูล" });
  }
};

// exports.createReport = async (req, res) => {
//   try {
//     const report = await Report.create(req.body);
//     res.status(201).json({ message: "Report created successfully", report });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating report", error });
//   }
// };
