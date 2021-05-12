const { response } = require("express");
const jwt = require("jsonwebtoken");
const validateJwt = (req, res = response, next) => {
  /* x-token */
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "token is needed",
    });
  }
  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "invalid token",
    });
  }
  /* validate token */

  // console.log(token);
  next();
};

module.exports = {
  validateJwt,
};
