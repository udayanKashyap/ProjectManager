const express = require("express");
const router = express.Router();
const pool = require("../../db/conn");

router.get("/", (req, res) => {
  res.render("facultyLogin");
});
router.post("/", async (req, res, next) => {
  const { f_id, password } = req.body;
  try {
    const [users] = await pool.query("SELECT * FROM Faculty WHERE f_id = ? ", [
      f_id,
    ]);
    if (users.length > 0) {
      if (users[0].f_password == password) {
        req.session.f_id = users[0].f_id;
        res.redirect("/faculty/projectView");
      } else {
        res.render("facultyLogin", { error: "Password wrong" });
      }
    } else {
      res.render("facultyLogin", { error: "Invalid User" });
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
