const express = require("express");
const router = express.Router();
const task = require("../controller");

// create new task
router.post("/new/task", task.NewTask);

// get tasks
router.get("/tasks", task.GetAllTasks);

// saved finished task
router.put("/complete/task/:id", task.CompleteTask);

// delete task
router.delete("/delete/task/:id", task.DeleteTask);

// get finished tasks
// router.get("/finished/tasks", task.GetFinishedTasks);

router.delete("/tasks/del", task.Deleteall);

module.exports = router;
