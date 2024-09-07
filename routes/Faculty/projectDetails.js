const express = require("express");
const router = express.Router();
const pool = require("../../db/conn");

router.get("/:id", async (req, res, next) => {
  try {
    const [rollNos] = await pool.query(
      "SELECT s_rollNo,status FROM studentProject WHERE p_id=?",
      [req.params.id]
    );
    res.render("projectDetails", {
      project: {
        name: req.query.name,
        id: req.params.id,
      },
      rollNos,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
