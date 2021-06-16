import React from "react";
import NewGoal from "../newGoal/NewGoal";
import GoalSetting from "../goalSettings/GoalSettings";
import Activities from "../activities/Activities";
import CompletedGoals from "../completedGoal/CompletedGoals";
import Calendar from "../calendar/Calendar";
import Chart from "react-google-charts";

export default function DashboardFunction({
  selectedGoal,
  user,
  handleReturnToDashboard,
  createGoal,
  goals,
  setGoals,
  manageActivities,
  manageCompletedGoals,
  completedGoals,
  manageCalendar,
}) {
  const renderFunction = () => {
    // conditional renders components based on props
    if (createGoal) {
      return (
        <NewGoal
          user={user}
          setGoals={setGoals}
          handleReturnToDashboard={handleReturnToDashboard}
        />
      );
    } else if (selectedGoal !== null) {
      return (
        <GoalSetting
          goal={selectedGoal}
          user={user}
          goals={goals}
          setGoals={setGoals}
          handleReturnToDashboard={handleReturnToDashboard}
        />
      );
    } else if (manageActivities) {
      return <Activities />;
    } else if (manageCompletedGoals) {
      return <CompletedGoals completedGoals={completedGoals} />;
    } else if (manageCalendar) {
      return <Calendar completedGoals={completedGoals} />;
    } else {
      return <h3>{"Click Hamburger Menu To Begin!"}</h3>;
    }
  };

  return (
    <>
    <div>
    <Chart
  width={'500px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7],
  ]}
  options={{
    title: 'My Daily Activities',
  }}
  rootProps={{ 'data-testid': '1' }}
/>
    </div>
      <div>{renderFunction()}</div>
    </>
  );
}
