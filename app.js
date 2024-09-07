const express = require("express");
const app = express();
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const factulySignin = require("./routes/Faculty/FacultySignin");
const facultyLogin = require("./routes/Faculty/FacultyLogin");
const studentSignin = require("./routes/Student/StudentSignin");
const studentLogin = require("./routes/Student/StudentLogin");
const projectDetails = require("./routes/Faculty/projectDetails");
const facultyProjectView = require("./routes/Faculty/projectView");
const studentProjectView = require("./routes/Student/projectView");
const studentUpdateStatus = require("./routes/Student/studentUpdateStatus");
const options = {
  host: "localhost",
  port: 3307,
  user: "root",
  password: "",
  database: "project_management_session",
};
const projectCreate = require("./routes/Faculty/projectCreate");
const sessionStore = new MySQLStore(options);
const {facultyAuthentication, studentAuthentication} = require("./middlewares/checkAuth");

app.use(
  session({
    key: "session",
    secret: "session_cookie_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  express.urlencoded({
    extended: "false",
  })
);
app.set("view engine", "ejs");
app.use(express.json());


app.get("/", (req, res) => {
  res.render("index");
});

//faculty
app.use("/signin/faculty", factulySignin);
app.use("/login/faculty", facultyLogin);
app.use("/faculty/projectCreate", facultyAuthentication, projectCreate);
app.use("/faculty/projectView", facultyAuthentication, facultyProjectView);
app.use("/faculty/projectDetails", facultyAuthentication, projectDetails);
//students
app.use("/signin/student", studentSignin);
app.use("/login/student", studentLogin);
app.use("/student/projectView", studentAuthentication, studentProjectView);
app.use("/student/updateStatus", studentAuthentication, studentUpdateStatus);
//logout
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.clearCookie("session");
    res.redirect("/");
  });
});

//error middle
app.use((err, req, res, next) => {
  res.send(err);
});
app.listen(3000, () => {
  console.log("server running in http://localhost:3000");
});
