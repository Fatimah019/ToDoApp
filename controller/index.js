const { Task } = require("../model");

// create product post
exports.NewTask = async (req, res) => {
  // check that task name is not empty
  req.check("name", "task name cannot be empty").notEmpty();

  try {
    let task = new Task({
      taskname: req.body.taskname,
    });
    task.save((err, taskitem) => {
      if (err) {
        return res.json({
          status: false,
          message: `Error Occurred. Couldnt save task.`,
        });
      } else {
        return res.json({
          status: true,
          data: taskitem,
        });
      }
    });
  } catch (err) {
    return res.json({
      status: false,
      message: "Error Occurred.",
    });
  }
};

// Get all tasks
exports.GetAllTasks = (req, res) => {
  Task.find()
    .then((tasks) => {
      return res.json({
        status: true,
        data: tasks,
      });
    })
    .catch(() => {
      return res.json({
        status: false,
        message: `Error while Fetching All Tasks`,
      });
    });
};

// complete a task
exports.CompleteTask = (req, res) => {
  Task.findByIdAndUpdate(
    { _id: req.params.id },
    {
      complete: true,
    },
    { new: true }
  )
    .then((editedTask) => {
      return res.json({
        status: true,
        data: editedTask,
      });
    })
    .catch((err) => {
      return res.json({
        status: false,
        message: `Task Cannot Be Completed ${err}`,
      });
    });
};

// delete a post
exports.DeleteTask = async (req, res) => {
  Task.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      return res.json({
        status: true,
        message: "Task Deleted",
      });
    })
    .catch((err) => {
      return res.json({
        status: false,
        message: `Cannot Delete Task ${err}`,
      });
    });
};
