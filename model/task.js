const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const taskSchema = new Schema({
  taskname: { type: String },
  complete: { type: Boolean, default: false },
  // savedtask: [{ type: Schema.Types.ObjectId, ref: "SavedTask" }],
});

module.exports = Mongoose.model("Task", taskSchema);
