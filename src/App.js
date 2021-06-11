import React, { useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import NavBar from "./components/navbar/NavBar";
import Landing from "./components/landing/Landing";
import PersistentDrawer from "./components/persistentDrawer/PersistentDrawer";

export default function App() {
  const [user, setUser] = useState(null);
  const updateUser = (userData) => setUser(userData);

  return (
    <>
      <div className="App">
        <Route
          path="/"
          render={(props) => (
            <NavBar {...props} user={user} setUser={updateUser} />
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
            render={(props) => <Login {...props} setUser={updateUser} />}
          />
          <Route
            exact
            path="/dashboard"
            render={(props) => (
              <PersistentDrawer {...props} user={user} setUser={updateUser} />
            )}
          />
        </Switch>
      </div>
    </>
  );
}
