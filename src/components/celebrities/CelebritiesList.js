import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Celebrities extends Component {
  // uncomment the line to see the props that component gets
  // console.log(this.props)
  render() {
    return (
      <div>
        {/* we map over the array we get in props and return react component which contains a Link */}
        {/* the Link component renders into *a* tag in DOM, it's special in that it doesn't reload a page */}
        {this.props.celebrities.map((celebrity) => (
          <div key={celebrity._id}>
            {/* each link is pointing to the unique id for the celebrity that is being rendered */}
            <Link to={`/celebrities/${celebrity._id}`}>{celebrity.name}</Link>
          </div>
        ))}
      </div>
    );
  }
}
