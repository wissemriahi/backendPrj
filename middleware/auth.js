const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if there's no token
  if (!token) {
    return res
      .status(401)
      .json({ message: "No Token sent, authorization was denied" });
  }

  //   Verify if there's a token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token!" });
  }
};
