const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const taskSchema = new Schema({
  taskname: { type: String, required: true },
  complete: { type: Boolean, default: false },
});

module.exports = Mongoose.model("Task", taskSchema);
