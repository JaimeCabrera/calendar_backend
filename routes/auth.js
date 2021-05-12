/*
 * user routes host+/api/auth/
 */
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  userRegister,
  userLogin,
  renewToken,
} = require("../controllers/authController");
const { fileValidator } = require("../middlewares/fileValidtor");
const { validateJwt } = require("../middlewares/validateJwt");

router.post(
  "/register",
  [
    //middleware de validaciones
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    fileValidator,
  ],
  userRegister
);
router.post(
  "/",
  [
    check("email", "The email is required").not().isEmpty(),
    check("password", "The password is required").not().isEmpty(),
    fileValidator,
  ],
  userLogin
);
router.get("/renew", validateJwt, renewToken);

module.exports = router;
