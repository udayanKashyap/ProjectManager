const express = require("express");
const router = express.Router();
const pool = require("../../db/conn");

router.get("/", (req, res) => {
  res.render("facultySignin");
});

router.post("/", async (req, res, next) => {
  const { name, f_id, email, password, contactNo } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Faculty (f_id,f_name,f_email,f_password,f_phone) VALUES (?,?,?,?,?)",
      [f_id, name, email, password, contactNo]
    );
    res.redirect("/login/faculty");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
