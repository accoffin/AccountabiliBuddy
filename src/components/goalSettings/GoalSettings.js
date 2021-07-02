import React, { useEffect, useState, useContext } from "react";
import service from "../../utils/service";
import { ActivityContext } from "../../TheContext";
import CreateActivity from "../createActivity/CreateActivity";

export default function UpdateGoal({
  goal,
  handleReturnToDashboard,
  goals,
  setGoals,
  user,
}) {
  const [editable, setEditable] = useState(false);
  const [addActivities, setAddActivities] = useState(false);
  const [details, setDetails] = useState(null);
  // const { activity } = useContext(ActivityContext);
  const [createdActivities, setCreatedActivities] = useState([]);
  const [ createActivity, setCreateActivity]  = useState(false);

  useEffect(() => {
    setDetails(goal);
    console.log("goal", goal);
    setCreatedActivities(goal.created_activities);
    // eslint-disable-next-line
  }, [goal]);

  const [form, setForm] = useState({
    name: goal.title ? goal.title : `undefined`,
    startDate: goal.startDate ? goal.startDate : "",
    endDate: goal.endDate ? goal.endDate : "",
    activities: goal.activities ? goal.activities : `undefined`,
    achievements: goal.achievements ? goal.achievements : `undefined`,
    user: goal.user[0],
    completed: goal.completed,
  });

  const handleEdit = () => {
    setEditable(!editable);
  };

  const handleAddActivities = () => {
    setAddActivities(!addActivities);
  };

  const handleRemoveCreatedActivity = async (activityId) => {
    await service.removeCreatedActivity(activityId).then((response) => {
      setCreatedActivities(response.data.createdActivities);
    });
  };

  const handleComplete = () => {
    service.completeGoal({ goalId: goal._id }).then((response) => {
      // update goals state instead of recalling service call from Persistant Drawer
      // find which goal is pointed at the same place in storage, then update that goal
      const updateGoals = goals.map((eachGoal) =>
        eachGoal === goal ? response.data.updatedGoal : eachGoal
      );
      setGoals(updateGoals);
      handleReturnToDashboard();
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    service.updateGoal({ form: form, goalId: goal._id }).then((response) => {
      const updateGoals = goals.map((eachGoal) =>
        eachGoal === goal ? response.data.updatedGoal : eachGoal
      );
      setGoals(updateGoals);
      handleReturnToDashboard();
    });
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleRemoveGoal = () => {
    service.removeGoal({ goalId: goal._id }).then((response) => {
      setGoals(response.data.goals);
    });
    handleReturnToDashboard();
  };

  return (
    <>
      {details && (
        <div
          className={"reg"}
          style={{ marginLeft: "100px", marginTop: "100px" }}
        >
          {!editable ? (
            <>
              <div>{`Goal settings for ${details.title}`}</div>
              <h2>{`Name: ${details.title}`}</h2>

              {goal.completed ? (
                <h1>Goal Complete!</h1>
              ) : (
                <>
                  <button onClick={handleEdit}>Edit Goal</button>
                  <button onClick={handleAddActivities}>Add Activities</button>
                  <button onClick={handleComplete}>Mark as Complete!</button>
                </>
              )}
            </>
          ) : (
            <div
              className={"reg"}
              style={{ marginLeft: "100px", marginTop: "100px" }}
            >
              <form onSubmit={submitHandler}>
                <label htmlFor="name">GOAL NAME: </label>
                <input
                  type="text"
                  placeholder="Name of goal"
                  name="name"
                  onChange={changeHandler}
                  value={form.title}
                />
                <br />
                <label htmlFor="startDate">START DATE: </label>
                <input
                  type="date"
                  name="startDate"
                  onChange={changeHandler}
                  value={form.startDate}
                />
                <br />
                <label htmlFor="endDate">END DATE: </label>
                <input
                  type="date"
                  name="endDate"
                  onChange={changeHandler}
                  value={form.endDate}
                />
                <br />
                <br />
                <button>Save Changes</button>
              </form>
              <button onClick={handleRemoveGoal}>Remove Goal</button>
            </div>
          )}
          <h2 className={"reg"}>{`Activities: `} </h2>
          <br></br>
          {addActivities && (
            <CreateActivity
              setCreatedActivities={setCreatedActivities}
              setCreateActivity={setCreateActivity}
              setAddActivities={setAddActivities}
              user={user}
              goal={goal}
            />
          )}
          <div>
            {createdActivities ? (
              <>
                <div id={"saved-activity-main"}>
                  {createdActivities.map((activity) => {
                    return (
                      <div
                        id={"activity-card"}
                        key={activity._id}
                        onClick={() =>
                          handleRemoveCreatedActivity(activity._id)
                        }
                      >
                        <p>{activity.title}</p>
                        <p>{activity.description}</p>
                        <p>{activity.start}</p>
                        <p>{activity.end}</p>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <p>No created activities.</p>
              </>
            )}
          </div>
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          ></div>
        </div>
      )}
    </>
  );
}
