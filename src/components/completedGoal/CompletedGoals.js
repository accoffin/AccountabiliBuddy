import React from "react";

export default function CompletedGoals({ completedGoals }) {
  const bodyStyle = {
    fontFamily: "raleway",
    fontSize: 14,
  };

  return (
    <>
      <h2 className={"reg"} style={{ marginLeft: "100px", marginTop: "100px" }}>
        Completed Goals!
      </h2>
      {completedGoals.map((goal) => {
        return (
          <h3 key={goal._id} style={bodyStyle}>
            {goal.name}
          </h3>
        );
      })}
    </>
  );
}
