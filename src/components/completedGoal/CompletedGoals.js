import React from "react";

export default function CompletedGoals({ completedGoals }) {
  const topStyle = {
    marginTop: "100px"
  }
  
  return (
    <>
      <h2 style={topStyle}>Completed Goals!</h2>
      {completedGoals.map((goal) => {
        return <h3 key={goal._id}>{goal.name}</h3>;
      })}
    </>
  );
}
