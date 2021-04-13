import React, { Component } from "react";
import "../../Css_Files/todo.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskname: "",
      tasks: [],
      color: "#000",
      textDecoration: "none",
      textDecorationColor: "transparent",
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
    e.preventDefault();
    let taskform = { taskname: this.state.taskname };
    axios
      .post("/new/task", taskform)
      .then(() => {
        this.setState({
          name: "",
        });
        window.location.reload(false);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  // get all tasks created
  getAllTasks = () => {
    axios
      .post("/tasks")
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
    axios
      .put(`/complete/task/${id}`)
      .then(() => {
        window.location.reload(false);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  componentDidMount() {
    this.getAllTasks();
  }
  render() {
    const style = {
      color: this.state.color,
      textDecoration: this.state.textDecoration,
      textDecorationColor: this.state.textDecorationColor,
    };
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
            <div className="heading-todo">
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
              </form>
            </div>
            <ul>
              {this.state.tasks.length === 0 ? (
                <div className="text-center">
                  <h3>No Tasks Yet</h3>
                </div>
              ) : (
                this.state.tasks.map((task) => {
                  return (
                    <li
                      key={task._id}
                      className="flex space-between align-center task-list"
                      onClick={() => this.onCompleteTask(task._id)}
                    >
                      <p
                        style={
                          task.complete === true
                            ? { color: "grey", textDecoration: "line-through" }
                            : { color: "#000" }
                        }
                      >
                        {task.taskname}
                      </p>
                      <div>
                        <button
                          className="remove-btn"
                          style={
                            task.complete === true
                              ? { display: "none" }
                              : { display: "inline" }
                          }
                          onClick={() => this.deleteTask(task._id)}
                        >
                          Remove
                        </button>
                        <span
                          className="complete-text"
                          style={
                            task.complete === true
                              ? { display: "inline" }
                              : { display: "none" }
                          }
                        >
                          complete
                        </span>
                      </div>
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
