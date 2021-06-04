import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
// components
// import service from "./utils/service";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import NavBar from "./components/navbar/NavBar";
import Dashboard from "./components/dashboard/Dashboard";
import Landing from "./components/landing/Landing";


class App extends React.Component {
  state = {
    // default state, we use empty array to avoid undefined errors
    goalSets: [],
    user: {},
  };


  setUser = (userData) => {
    this.setState({
      user: userData,
    });
  };

  render() {
    return (
      <div className="App">
        <NavBar user={this.state.user} />
        <Switch>
          <Route path="/" render={(props) => <Landing {...props} />}/>
          <Route path="/auth/signup" render={(props) => <Signup {...props} />} />
          <Route path="/auth/login" render={(props) => <Login {...props} setUser={this.setUser} />}/>
          <Route path="/dashboard" render={(props) => <Dashboard {...props} />}/>
        </Switch>
      </div>
    );
  }
}

export default App;
