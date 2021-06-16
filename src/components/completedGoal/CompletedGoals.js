import React from "react";

export default function CompletedGoals({ completedGoals }) {
  return (
    <>
      <h2>Completed Goals!</h2>
      {completedGoals.map((goal) => {
        return <h3 key={goal._id}>{goal.name}</h3>;
      })}
    </>
  );
}
