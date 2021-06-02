import React, { Component } from "react";
import service from "../../utils/service";

export default class Celebrity extends Component {
  state = {
    celebrityData: {},
  };
  componentDidMount() {
    // unique id of the celebrity that we need to display on the page
    // see Celebrities.js to see how this is done
    const celebId = this.props.match.params.id;
    // call the route in the backend that gives us a data about unique celebrity based on an id
    service.getCelebrityInfo(celebId).then((responseFromServer) => {
      console.log(responseFromServer);
      // this would be a good point to store the data in the state
      this.setState({
        celebrityData: responseFromServer.data.celebrity,
      });
    });
  }
  render() {
    const { name, occupation, catchphrase } = this.state.celebrityData;
    return (
      <div>
        Name: {name} <br />
        Occupation: {occupation} <br />
        Catchphrase: {catchphrase}
      </div>
    );
  }
}
