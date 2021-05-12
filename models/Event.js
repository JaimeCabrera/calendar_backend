const { Schema, model } = require("mongoose");

const EventSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

/* Aaddtionals configurations to delete __v,and replace _id :id */
EventSchema.method("toJSON", function () {
  /* acceso a todas las propiedasdes */
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Event", EventSchema);
