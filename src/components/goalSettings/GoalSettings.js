import React, { useEffect, useState, useContext } from "react";
import service from "../../utils/service";
import { ActivityContext } from "../../TheContext";

export default function UpdateGoal({
  goal,
  handleReturnToDashboard,
  goals,
  setGoals,
}) {
  const [editable, setEditable] = useState(false);
  const [details, setDetails] = useState(null);
  const { activity } = useContext(ActivityContext);
  console.log("this is activities", activity);
  useEffect(() => {
    setDetails(goal);
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
        <div className={"reg"} style={{marginLeft: "100px", marginTop: "100px"}}>
          {!editable ? (
            <>
              <div>{`Goal settings for ${goal.title} ${activity}`}</div>
              <h2>{`Name: ${goal.title}`}</h2>
              <h2 className={"reg"}>{`Activities: `} </h2>
              {details.activities.map((activity) => {
                return <h3 key={activity} className={"reg"} style={{ textTransform: 'uppercase'}}>{activity}</h3>;
              })}
              {goal.completed ? (
                <h1>Goal Complete!</h1>
              ) : (
                <>
                  <button onClick={handleEdit}>Edit Goal</button>
                  <button onClick={handleComplete}>Mark as Complete!</button>
                </>
              )}
            </>
          ) : (
            <div className={"reg"} style={{marginLeft: "100px", marginTop: "100px"}}>
              <form onSubmit={submitHandler}>
                <label htmlFor="name">GOAL NAME: </label>
                <input
                  type="text"
                  name="title"
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
                <label htmlFor="activities">ADD ACTIVITIES: </label>
                <input
                  type="enum"
                  name="activities"
                  onChange={changeHandler}
                  value={form.activities}
                />
                <br />
                <button>Save Changes</button>
              </form>
              <button onClick={handleRemoveGoal}>Remove Goal</button>
            </div>
          )}

          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          ></div>
        </div>
      )}
    </>
  );
}
