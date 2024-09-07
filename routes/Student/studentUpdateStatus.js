const express = require("express");
const router = express.Router();
const pool = require("../../db/conn");

router.post("/", async (req, res, next) => {
  const { s_rollNo, p_id, p_dueDate } = req.body;
  const dueDate = new Date(p_dueDate);
  const today = new Date();

  // Set the time of today to 00:00:00 for a fair comparison
  today.setHours(0, 0, 0, 0);
  try {
    if (dueDate > today) {
      await pool.query(
        "UPDATE studentProject SET status = 'Completed' WHERE p_id = ? AND s_rollNo = ?",
        [p_id, s_rollNo]
      );
      res.json({ message: "Status updated" });
    } else {
      await pool.query(
        "UPDATE studentProject SET status = 'Late Submission' WHERE p_id = ? AND s_rollNo = ?",
        [p_id, s_rollNo]
      );
      res.json({ message: "due date exceeded" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
