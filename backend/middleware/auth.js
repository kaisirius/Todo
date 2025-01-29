const jwt = require('jsonwebtoken');
const SECRET_KEY = "GETTOUTTTTT";

function auth(req, res, next) {
  const token = req.headers.token;
  console.log(token);
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch(e) {
    res.status(401).json({
      message : "11authentication failed",
      error : e
    });
  }
}

module.exports = {
  auth,
  SECRET_KEY
}