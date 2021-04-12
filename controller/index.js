const { Task } = require("../model");

exports.Deleteall = async (req, res) => {
  Task.deleteMany()
    .then(() => {
      return res.json({
        data: "deleted",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
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
      message: err,
    });
  }
};
// get a task
exports.GetTask = (req, res) => {
  Task.findOne({ _id: req.params.id })
    .then((task) => {
      return res.json({
        status: true,
        data: task,
      });
    })
    .catch((err) => {
      return res.json({
        status: false,
        message: `Error while Fetching All Task`,
      });
    });
};

// Get all tasks
exports.GetAllTasks = async (req, res) => {
  await Task.find()
    .then((tasks) => {
      return res.json({
        status: true,
        data: tasks,
      });
    })
    .catch((err) => {
      return res.json({
        status: false,
        message: `Error while Fetching All Tasks`,
      });
    });
};

// if (editedTask.complete === false) {
//   return res.json({
//     status: false,
//     message: "not completed",
//   });
// } else {
//   SavedTask.create({
//     taskId: editedTask,
//   })
//     .then((saveTask) => {
//       return res.json({
//         status: true,
//         data: saveTask,
//       });
//     })
//     .catch((err) => {
//       return res.json({
//         status: false,
//         message: `Cannot Edit Task ${err}`,
//       });
//     });
// }

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

// get finished tasks
// exports.GetFinishedTasks = (req, res) => {
//   SavedTask.find()
//     .then((finishedtasks) => {
//       return res.json({
//         status: true,
//         data: finishedtasks,
//       });
//     })
//     .catch((err) => {
//       return res.json({
//         status: false,
//         message: `Cannot Get Task ${err}`,
//       });
//     });
// };
