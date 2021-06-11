import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import NavBar from "./components/navbar/NavBar";
import Landing from "./components/landing/Landing";
import PersistentDrawer from "./components/persistentDrawer/PersistentDrawer";
import TheContext from "./TheContext"

class App extends React.Component {
  state = {
    // default state, we use empty array to avoid undefined errors
    goalSets: [],
    user: null,
  };

  setUser = (userData) => {
    this.setState({
      user: userData,
    });
  };

  render() {
    return (
      <div className="App">
      {/* <TheContext.Provider value={{ selectedGoal, user, setUser }}> */}
        <Route
          path="/"
          render={(props) => (
            <NavBar {...props} user={this.state.user} setUser={this.setUser} />
          )}
        />
        <Switch>
          <Route exact path="/" render={(props) => <Landing {...props} />} />
          <Route
            exact
            path="/auth/signup"
            render={(props) => <Signup {...props} />}
          />
          <Route
            exact
            path="/auth/login"
            render={(props) => <Login {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/dashboard"
            render={(props) => <PersistentDrawer {...props} setUser={this.setUser} />}
          />
        </Switch>
        {/* </TheContext.Provider> */}
      </div>
    );
  }
}

export default App;
