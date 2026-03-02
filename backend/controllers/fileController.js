const File = require("../models/File");
const xlsx = require("xlsx");
const path = require("path");

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Save file info in MongoDB
    const newFile = new File({
      userId: req.user.id,
      filename: req.file.filename,
      originalName: req.file.originalname,
    });

    await newFile.save();

    // Read Excel file
    const filePath = path.join(__dirname, "..", "uploads", req.file.filename);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(sheet);

    res.status(200).json({
      message: "File uploaded successfully",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
