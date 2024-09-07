const express = require("express");
const router = express.Router();
const pool = require("../../db/conn");

router.get("/", (req, res) => {
  res.render("studentLogin");
});
router.post("/", async (req, res, next) => {
  const { rollNo, password } = req.body;
  try {
    const [users] = await pool.query(
      "SELECT * FROM Student WHERE s_rollNo = ? ",
      [rollNo]
    );
    if (users.length > 0) {
      if (users[0].s_password == password) {
        req.session.s_rollNo = users[0].s_rollNo;
        res.redirect("/student/projectView");
      } else {
        res.render("studentLogin", { error: "Password wrong" });
      }
    } else {
      res.render("studentLogin", { error: "Invalid User" });
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
