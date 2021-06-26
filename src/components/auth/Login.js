import service from "../../utils/service";
import React, { Component } from "react";

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
  };
  submitHandler = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    service.login({ username, password }).then((responseFromServer) => {
      const { user } = responseFromServer.data;
      this.props.setUser(user);
      this.props.history.push("/dashboard");
    });
  };
  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  render() {
    return (
      <form onSubmit={this.submitHandler} className={"reg"}>
        <input
          type="text"
          value={this.state.username}
          placeholder="username"
          name="username"
          className={"reg"}
          onChange={this.changeHandler}
        />
        <input
          type="password"
          value={this.state.password}
          placeholder="password"
          name="password"
          onChange={this.changeHandler}
        />
        <button className={"reg"}>LOGIN</button>
      </form>
    );
  }
}
