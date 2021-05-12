/* 
  event routes: /api/events
*/

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  getAllEvents,
  createEvent,
  editEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { isDate } = require("../helpers/isDate");
const { fileValidator } = require("../middlewares/fileValidtor");
const { validateJwt } = require("../middlewares/validateJwt");

router.use(validateJwt); //validar peticiones bajo esto

router.get("/", getAllEvents);
router.post(
  "/",
  [
    check("title", "The title is required").not().isEmpty(),
    check("start", "The start date is required").custom(isDate),
    check("end", "The end date is required").custom(isDate),
    fileValidator,
  ],
  createEvent
);
router.put(
  "/:id",
  [
    check("title", "The title is required").not().isEmpty(),
    check("start", "The start date is required").custom(isDate),
    check("end", "The end date is required").custom(isDate),
    fileValidator,
  ],
  editEvent
);
router.delete("/:id", deleteEvent);

module.exports = router;
