import React from "react";
import NewGoal from "../newGoal/NewGoal";
import UpdateGoal from "../updateGoal/UpdateGoal";

export default function DashboardFunction(props) {
  console.log(`dashboard props: createGoal ${props.createGoal}`);
  console.log(`dashboard props: selectedGoal ${props.selectedGoal}`);
  
  const renderFunction = () => {
    console.log(props.selectedGoal);
    if (props.createGoal) return <NewGoal />;
    if (props.selectedGoal !== null)
      return <UpdateGoal goal={props.selectedGoal} />;
  };

  return (
    <>
      <h1>This is the dashboard home!</h1>;
      <p>
        "Proident incididunt proident est esse ex tempor qui incididunt. Laboris
        qui eu eiusmod exercitation laborum in enim mollit. Lorem veniam
        cupidatat occaecat laborum fugiat ut nulla tempor nulla velit sunt.
        Consequat veniam nostrud reprehenderit non nisi exercitation amet. Do
        officia officia incididunt id aliqua voluptate consequat elit laboris.
        Et ut nisi excepteur et consectetur reprehenderit id quis ut nisi."
      </p>
      {renderFunction()}
    </>
  );
}
