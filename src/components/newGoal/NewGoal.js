import React from "react";

export default function NewGoal(props) {
  return (
    <>
      <h1>{`You go ${props.user.username}!`}</h1>
      <h2>{`Complete the form below to create a new goal!`}</h2>
    </>
  );
}
