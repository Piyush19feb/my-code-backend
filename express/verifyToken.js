const jwt = require("jsonwebtoken");

const jwt_auth = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) return res.status(401).send("access denied.");

  try {
    const verified = jwt.verify(token, process.env.JWT_KEY);
    req.user = verified;
    console.log("request Authenticated..");
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports.jwt_auth = jwt_auth;
