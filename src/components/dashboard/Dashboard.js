import React, { useEffect, useState } from "react";
import NewGoal from "../newGoal/NewGoal";
import GoalSetting from "../goalSettings/GoalSettings";
import Activities from "../activities/Activities";
import CompletedGoals from "../completedGoal/CompletedGoals";
import Calendar from "../calendar/Calendar";
import service from "../../utils/service";

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
  const [activitiesForCalendar, setActivitiesForCalendar] = useState([]);
  useEffect(() => {
    service.getCreatedActivitiesFromUser().then((response) => {
      setActivitiesForCalendar(response.data.createdActivities);
    });
  }, []);

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
        <>
          <GoalSetting
            goal={selectedGoal}
            user={user}
            goals={goals}
            setGoals={setGoals}
            handleReturnToDashboard={handleReturnToDashboard}
          />
        </>
      );
    } else if (manageActivities) {
      return <Activities user={user} />;
    } else if (manageCompletedGoals) {
      return <CompletedGoals completedGoals={completedGoals} />;
    } else if (manageCalendar) {
      return (
        <>
          {<h1>Complete Activities To Achieve Your Goals</h1>}
          {<h2>Schedule of Activities</h2>}
          <Calendar activitiesForCalendar={activitiesForCalendar} />
        </>
      );
    } else {
      return <h3>{"Click Hamburger Menu To Begin!"}</h3>;
    }
  };

  return (
    <>
      <div>{renderFunction()}</div>

      {/* <savedActivitiesContext.Consumer>
        {(value) =>
          value.map((thing) => {
            return <h2>{thing.assetName}</h2>;
          })
        }
      </savedActivitiesContext.Consumer> */}
    </>
  );
}
