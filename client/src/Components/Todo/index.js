import React, { Component } from "react";
import "../../Css_Files/todo.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskname: "",
      tasks: "",
      statusMessage: "",
      complete: false,
      taskcompleted: false,
    };
  }

  // handle inout change
  handleInputChange = (e) => {
    this.setState({
      taskname: e.target.value,
    });
  };

  // method to add a task
  addTask = (e) => {
    let taskform = { taskname: this.state.taskname };
    axios
      .post("/new/task", taskform)
      .then((res) => {
        if (res.data.status === false) {
          this.setState({
            statusMessage: res.data.message,
          });
        } else {
          this.setState({
            statusMessage: "Task Successfully Added",
          });
        }
        this.setState({
          name: "",
        });
      })
      .catch((err) => {
        toast.error(err);
      });
    window.location.reload(false);
    e.preventDefault();
  };

  // get all tasks created
  getAllTasks = () => {
    axios
      .get("/tasks")
      .then((res) => {
        this.setState({
          tasks: res.data.data,
        });
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  // delete a task
  deleteTask = (id) => {
    axios
      .delete(`/delete/task/${id}`)
      .then(() => {
        window.location.reload(false);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  // on completing a task
  onCompleteTask = (id) => {
    localStorage.setItem("saved_task", id);
    axios
      .put(`/complete/task/${id}`)
      .then((res) => {
        console.log(res.data.data);
        if (res.data.data.complete === true) {
          this.setState({
            complete: true,
          });
        } else {
          this.setState({
            complete: false,
          });
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  componentDidMount() {
    this.getAllTasks();
  }
  render() {
    const delBtnStatus =
      this.state.completionStatus === "grey"
        ? { display: "none" }
        : { display: "inline" };
    return (
      <div className="todo-container">
        <div className="list-container">
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className="toast-container"
          />
          <div className="list-container-inner">
            <p className="todo-title">To Do</p>
            <form method="post" onSubmit={this.addTask}>
              <label className="flex space-between align-center">
                <input
                  type="text"
                  placeholder="What needs to be done?"
                  name="name"
                  onChange={this.handleInputChange}
                  value={this.state.taskname}
                  className="task-input"
                />
                <input
                  type="submit"
                  placeholder="What needs to be done?"
                  value="Add"
                  className="add-btn"
                />
              </label>
              <div className="status-msg">{this.state.statusMessage}</div>
            </form>
            <ul>
              {this.state.tasks.length === 0 ? (
                <div className="text-center">
                  <h3>No Tasks Yet</h3>
                </div>
              ) : (
                this.state.tasks.map((task) => {
                  let savedItem = localStorage.getItem("saved_task", task._id);
                  return (
                    <li
                      key={task._id}
                      className="flex space-between align-center task-list"
                    >
                      <p
                        onClick={() => this.onCompleteTask(task._id)}
                        className={
                          this.state.complete && savedItem === task._id
                            ? "complete"
                            : "incomplete"
                        }
                      >
                        {task.taskname}
                      </p>
                      <button
                        className={
                          this.state.complete && savedItem === task._id
                            ? "remove-btn-complete"
                            : "remove-btn"
                        }
                        // style={delBtnStatus}
                        onClick={() => this.deleteTask(task._id)}
                      >
                        Remove
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
