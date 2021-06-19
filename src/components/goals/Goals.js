import React, { Component, useContext } from "react";
import "./Goals.css";
import service from "../../utils/service";
import { ActivityContext } from "../../TheContext";

const Goals = () => {
  const { activity } = useContext(ActivityContext);

  return (
    <>
      <div id="Goals-main">These are your goals! {activity}</div>
    </>
  );
};

export default Goals;
