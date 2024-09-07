const express = require("express");
const router = express.Router();
const pool = require("../../db/conn");

router.get("/", async (req, res, next) => {
  try {
    const [p_ids] = await pool.query(
      "SELECT p_id FROM facultyProjects WHERE f_id=?",
      [req.session.f_id]
    );

    console.log(p_ids);
    // const projects = [];

    const promises = p_ids.map(async (obj) => {
      const [p_details] = await pool.query(
        "select p_name , p_dueDate from Project where p_id=? ",
        [obj.p_id]
      );
      return { ...p_details[0], p_id: obj.p_id };
    });

    const projects = await Promise.all(promises);
    console.log(projects);
    res.render("projectFacultyView", { projects });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
