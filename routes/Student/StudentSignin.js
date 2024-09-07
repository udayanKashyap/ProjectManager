const express = require("express");
const router = express.Router();
const pool = require("../../db/conn");

router.get("/", (req, res) => {
  res.render("studentSignin");
});

router.post("/", async (req, res, next) => {
  const { name, rollNo, email, password, contactNo } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Student (s_rollNo,s_name,s_email,s_password,s_phone) VALUES (?,?,?,?,?)",
      [rollNo, name, email, password, contactNo]
    );
    res.redirect("/login/student");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
