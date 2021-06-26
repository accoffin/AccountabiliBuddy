import React from "react";

export default function CompletedGoals({ completedGoals }) {
  const topStyle = {
    marginTop: '80px',
    fontFamily: 'raleway'
  }
  const bodyStyle = {
    fontFamily: 'raleway',
    fontSize: 14,
  }

  return (
    <>
      <h2 style={topStyle}>Completed Goals!</h2>
      {completedGoals.map((goal) => {
        return <h3 key={goal._id} style={bodyStyle}>{goal.name}</h3>;
      })}
    </>
  );
}
