const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJwt } = require("../helpers/jwt");

/* 
db:user blanco
db:password E8mZPWA0kt2hz4EH
*/

const userRegister = async (req, res = response) => {
  const { name, email, password } = req.body;

  try {
    /* verifica si existe un correo registrado */
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Email is already in use",
      });
    }
    user = new User({ name, email, password });
    /* encrypt password */
    const salt = bcrypt.genSaltSync(); //10 vueltas por defecto
    user.password = bcrypt.hashSync(password, salt);
    /* guardar registro en la base de datos */
    await user.save();
    /* generate jwt */
    const token = await generateJwt(user.id, user.name);
    res.status(201).json({
      ok: "true",
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error contactar al administrador",
    });
  }
};

const userLogin = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    /* buscar un usuario con ese email */
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "The email o password are invalid",
      });
    }
    /* match passwords */
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "The email o password are invalid",
      });
    }
    /* listos para generar jwt */
    const token = await generateJwt(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error contactar al administrador",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;

  /* generate new token */
  const token = await generateJwt(uid, name);
  res.json({
    ok: "true",
    token,
    uid,
    name,
  });
};

module.exports = {
  userRegister,
  userLogin,
  renewToken,
};
