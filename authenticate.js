const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    console.log("No token: ", token);
    return res.sendStatus(401);
  }

  jwt.verify(token, "shhhh", (err, user) => {
    if (err) {
      console.log("Authentication failed: ", err);
      return res.sendStatus(403);
    } else {
      req.user = user;
      next();
    }
  });
};
//
module.exports = authenticateToken;
