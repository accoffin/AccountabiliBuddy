import React, { useState, useEffect } from "react";
import "./App.css";
import "./fonts/Raleway-Regular.ttf";
import { Route, Switch } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import NavBar from "./components/navbar/NavBar";
import Landing from "./components/landing/Landing";
import PersistentDrawer from "./components/persistentDrawer/PersistentDrawer";
import service from "./utils/service";
import { ActivityContextProvider } from "./TheContext";

export default function App() {
  const [user, setUser] = useState(null);
  // const updateUser = (userData) => setUser(userData);

  // prevents having to login on refresh
  useEffect(() => {
    const fetchData = async () => {
      const data = await service.isAuthenticated();
      setUser(data.data.user || {});
    };
    fetchData();
  }, []);

  return (
    <ActivityContextProvider>
      <div className="App" style={{width: "90%"}}>
        <Route
          path="/"
          render={(props) => (
            <NavBar {...props} user={user} setUser={setUser} />
          )}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Landing {...props} setUser={setUser} />}
          />
          <Route
            exact
            path="/auth/signup"
            render={(props) => <Signup {...props} />}
          />
          <Route
            exact
            path="/auth/login"
            render={(props) => <Login {...props} setUser={setUser} />}
          />
          <Route
            exact
            path="/dashboard"
            render={(props) => (
              <PersistentDrawer {...props} user={user} setUser={setUser} />
            )}
          />
        </Switch>
      </div>
    </ActivityContextProvider>
  );
}
