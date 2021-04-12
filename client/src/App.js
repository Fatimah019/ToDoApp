import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ToDo from "./Components/Todo";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={ToDo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
