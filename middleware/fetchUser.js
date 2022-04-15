const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "youaresecurehere";

const fetchUser = async (req, res, next) => {
  const authToken = req.header("Auth-Token");
  if (!authToken) {
    return res
      .status(401)
      .send({ error: "Please Login with the correct token" });
  }
  try {
    const userData = jwt.verify(authToken, JWT_SECRET_KEY);
    req.user = userData.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please login with correct token" });
  }
};

module.exports = fetchUser;
