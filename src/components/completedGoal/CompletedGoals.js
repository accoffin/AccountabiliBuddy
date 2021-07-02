import React from "react";
import "./CompletedGoals.css";

export default function CompletedGoals({ completedGoals }) {
  const bodyStyle = {
    fontFamily: "raleway",
    fontSize: 14,
  };

  return (
    <>
      <div id="completed-goals-main">
        <h2 className={"reg"} style={{ marginTop: "100px" }}>
          Completed Goals!
        </h2>
        {completedGoals &&
          completedGoals.map((goal) => {
            return (
              <h3 key={goal._id} className={"reg"}>
                {goal.title}
              </h3>
            );
          })}
      </div>
    </>
  );
}
