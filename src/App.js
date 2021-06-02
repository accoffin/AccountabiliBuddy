import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
// components
import service from "./utils/service";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import CelebritiesList from "./components/celebrities/CelebritiesList";
import CelebrityDetails from "./components/celebrities/CelebrityDetails";
import ImgUpload from "./components/imgupload/ImgUpload";
import CreateCelebrity from "./components/celebrities/CreateCelebrity";
import UpdateCelebrity from "./components/celebrities/UpdateCelebrity";
import NavBar from "./components/navbar/NavBar";

class App extends React.Component {
  state = {
    // default state, we use empty array to avoid undefined errors
    celebrities: [],
    user: {},
  };
  // componentDidMount is called once when a component is initially rendered(note re-renders from state or prop changes won't re-trigger this)
  async componentDidMount() {
    // we call the getAllCelebrities route from the backend and store the info in the state
    const responseFromServer = await service.getAllCelebrities();

    const isAuthenticatedResponse = await service.isAuthenticated();
    // service.logout();
    this.setState({
      // at this point we replace the empty array in state with celbrities from DB, this will also cause a re-render
      celebrities: responseFromServer.data.celebrities,
      user: isAuthenticatedResponse.data.user || {},
    });
  }

  setUser = (userData) => {
    this.setState({
      user: userData,
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <NavBar user={this.state.user} />
        <Switch>
          {/* a route matching and route starting with /auth/signup, if we want just that route we would add exact */}
          <Route
            path="/auth/signup"
            // render the component and pass props to it, note that this is the prefered way of rendering components
            render={(props) => <Signup {...props} />}
          />
          <Route
            path="/auth/login"
            // render the component and pass props to it, note that this is the prefered way of rendering components
            render={(props) => <Login {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/celebrities"
            render={(props) => (
              <CelebritiesList
                {...props}
                celebrities={this.state.celebrities}
              />
            )}
          />
          <Route
            path="/imgupload"
            render={(props) => <ImgUpload {...props} />}
          />
          <Route
            path="/celebrity/create"
            render={(props) => <CreateCelebrity {...props} />}
          />
          <Route
            path="/celebrities/:id/edit"
            render={(props) => <UpdateCelebrity {...props} />}
          />
          {this.state.user && (
            <Route
              path="/celebrities/:id"
              render={(props) => <CelebrityDetails {...props} />}
            />
          )}
        </Switch>
      </div>
    );
  }
}

export default App;
