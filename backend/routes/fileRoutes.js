const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../middleware/auth");
const { uploadFile } = require("../controllers/fileController");
const File = require("../models/File");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

// ============================
// Multer Storage Setup
// ============================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// ============================
// Upload File
// ============================

router.post("/upload", auth, upload.single("file"), uploadFile);

// ============================
// Get Upload History (User Specific)
// ============================

router.get("/history", auth, async (req, res) => {
  try {
    const files = await File.find({ userId: req.user.id }).sort({
      uploadedAt: -1,
    });

    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ============================
// Get Dashboard Stats
// ============================

router.get("/stats", auth, async (req, res) => {
  try {
    const totalUploads = await File.countDocuments({
      userId: req.user.id,
    });

    const latestFile = await File.findOne({
      userId: req.user.id,
    }).sort({ uploadedAt: -1 });

    res.json({
      totalUploads,
      latestUpload: latestFile ? latestFile.uploadedAt : null,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ============================
// Re-analyze File
// ============================

router.get("/reanalyze/:id", auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    if (file.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const filePath = path.resolve("uploads", file.filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File missing on server" });
    }

    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(sheet);

    res.json({ data });
  } catch (error) {
    console.error("Reanalyze Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// router.get("/reanalyze/:id", auth, async (req, res) => {
//   try {
//     const file = await File.findById(req.params.id);

//     if (!file) {
//       return res.status(404).json({ error: "File not found" });
//     }

//     if (file.userId.toString() !== req.user.id) {
//       return res.status(403).json({ error: "Unauthorized" });
//     }

//     const filePath = path.join(__dirname, "..", "uploads", file.filename);

//     const workbook = xlsx.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];

//     const data = xlsx.utils.sheet_to_json(sheet);

//     res.json({ data });
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// ============================
// Delete File (No Route Conflict)
// ============================

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    if (file.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const filePath = path.join(__dirname, "..", "uploads", file.filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await File.findByIdAndDelete(req.params.id);

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
