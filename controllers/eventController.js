const { response } = require("express");
const Event = require("../models/Event");

const getAllEvents = async (req, res = response) => {
  /* get all events with user info */
  const events = await Event.find().populate("user", "name");

  return res.status(200).json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response) => {
  const { title, start, end } = req.body;

  const event = new Event({ title, start, end });

  try {
    /* add teh user info to event */
    event.user = req.uid;
    const eventDB = await event.save();
    return res.status(201).json({
      ok: true,
      event: eventDB,
    });
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      msg: "Internal server errror",
    });
  }
};

const editEvent = async (req, res = response) => {
  const { id } = req.params;
  const { uid } = req;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "This event not exits",
      });
    }
    /* verificar si el usuario esta editando */
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Unauthorized",
      });
    }
    const newEvent = {
      ...req.body,
      user: uid,
    };
    const eventUpdate = await Event.findByIdAndUpdate(id, newEvent, {
      new: true,
    });
    /* para retornar el actulizado {new:true} */
    return res.status(200).json({
      ok: false,
      msg: "Event updated",
      event: eventUpdate,
    });
  } catch (error) {
    /* se puede guardar el log en un narchivo */
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Internal server errror",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const { id } = req.params;
  const { uid } = req;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "This event not exits",
      });
    }
    /* verificar si el usuario esta editando */
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Unauthorized",
      });
    }
    /* delete the event */
    await Event.findByIdAndDelete(id);
    return res.status(200).json({
      ok: true,
      msg: "Event deleted",
      event,
    });
  } catch (error) {
    /* se puede guardar el log en un narchivo */
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Internal server errror",
    });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  editEvent,
  deleteEvent,
};
