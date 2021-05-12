const jwt = require("jsonwebtoken");
const generateJwt = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
      name,
    };
    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Error al generar el token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJwt,
};
