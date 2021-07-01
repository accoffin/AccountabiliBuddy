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
    service.signup({ username, password }).then((responseFromServer) => {});
    this.props.history.push("/dashboard");
  };
  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

 

  render() {
    console.log(this, this.props);
    return (
      <form onSubmit={this.submitHandler}>
        <input
          type="text"
          value={this.state.username}
          placeholder="username"
          name="username"
          onChange={this.changeHandler}
        />
        <input
          type="password"
          value={this.state.password}
          placeholder="password"
          name="password"
          onChange={this.changeHandler}
        />
        <button className={"reg"}>SIGN UP</button>
      </form>
    );
  }
}
