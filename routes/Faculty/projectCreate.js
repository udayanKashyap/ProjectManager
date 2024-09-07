const express = require("express");
const router = express.Router();
const pool = require("../../db/conn");
router.get("/", async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT s_rollNo FROM Student");
    console.log(result);
    res.render("projectCreate", {
      rollNo: result,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { project_id, project_name, project_details, issued_to, due_date } =
    req.body;
  try {
    // inserting into project database
    await pool.query(
      "INSERT INTO Project (p_id,p_name,p_details,p_issueDate,p_dueDate) VALUES (?,?,?,?,?)",
      [project_id, project_name, project_details, new Date(), due_date]
    );

    // inserting into student_project database
    if (typeof issued_to !== "string") {
      issued_to.forEach(async (rollNo) => {
        await pool.query(
          "INSERT INTO studentProject (s_rollNo,p_id,status) VALUES (?,?,?)",
          [rollNo, project_id, "Pending"]
        );
      });
    } else {
      await pool.query(
        "INSERT INTO studentProject (s_rollNo,p_id,status) VALUES (?,?,?)",
        [issued_to, project_id, "Pending"]
      );
    }

    //inserting into faculty_project
    await pool.query("INSERT INTO facultyProjects (f_id,p_id) VALUES (?,?)", [
      req.session.f_id,
      project_id,
    ]);

    res.redirect("/faculty/projectView");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
