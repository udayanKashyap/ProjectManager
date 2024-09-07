const express = require("express");
const router = express.Router();
const pool = require("../../db/conn");

router.get("/", async (req, res, next) => {
  try {
    const [project] = await pool.query(
      "SELECT p_id, status FROM studentProject WHERE s_rollNo = ? ",
      [req.session.s_rollNo]
    );
    console.log(project);
    const promises = project.map(async (project) => {
      const [result] = await pool.query("SELECT * from Project where p_id =?", [
        project.p_id,
      ]);
      return {
        ...result[0],
        status: project.status,
        s_rollNo: req.session.s_rollNo,
      };
    });
    const projects = await Promise.all(promises);
    res.render("projectStudentView", {
      projects,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
