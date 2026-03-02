const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// 🔥 Get All Users (Admin Only)
router.get("/", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/admin-stats", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const totalUsers = await User.countDocuments();
    const totalFiles = await File.countDocuments();

    const uploadsByDay = await File.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$uploadedAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      totalUsers,
      totalFiles,
      uploadsByDay,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// const User = require("../models/User");
const File = require("../models/File");

router.get("/all-users", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const users = await User.find().select("-password");

    const usersWithFileCount = await Promise.all(
      users.map(async (user) => {
        const fileCount = await File.countDocuments({ userId: user._id });

        return {
          ...user.toObject(),
          fileCount,
        };
      })
    );

    res.json(usersWithFileCount);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


router.delete("/delete-user/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete user's uploaded files from DB
    await File.deleteMany({ userId: user._id });

    // Delete user
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
