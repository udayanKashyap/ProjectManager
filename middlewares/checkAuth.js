

function facultyAuthentication(req, res, next) {
  if (req.session.f_id) {
    next();
  } else {
    res.redirect("/login/faculty");
  }
}
function studentAuthentication(req, res, next) {
  if (req.session.s_rollNo) {
    next();
  } else {
    res.redirect("/login/student");
  }
}


module.exports = {facultyAuthentication, studentAuthentication};
