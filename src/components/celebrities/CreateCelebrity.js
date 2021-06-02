import React, { Component } from "react";
import service from "../../utils/service";

export default class CreateCelebrity extends Component {
  state = {
    name: "",
    occupation: "",
    catchphrase: "",
  };

  changeHandler = (e) => {
    const inputFieldName = e.target.name;
    const value = e.target.value;
    this.setState({
      [inputFieldName]: value,
    });
  };

  sumbitHandler = (e) => {
    e.preventDefault();
    service.createCelebrity(this.state).then((_) => {
      this.props.history.push("/celebrities");
    });
  };

  render() {
    return (
      <form onSubmit={this.sumbitHandler}>
        <input
          type="text"
          name="name"
          value={this.state.name}
          placeholder="name"
          onChange={this.changeHandler}
        />
        <input
          type="text"
          name="occupation"
          value={this.state.occupation}
          placeholder="occupation"
          onChange={this.changeHandler}
        />
        <input
          type="text"
          name="catchphrase"
          value={this.state.catchphrase}
          onChange={this.changeHandler}
          placeholder="catchphrase"
        />
        <button type="submit">Create a new Celeb</button>
      </form>
    );
  }
}
