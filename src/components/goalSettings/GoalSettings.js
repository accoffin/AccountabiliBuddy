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
        <div>
          {!editable ? (
            <>
              <div>{`Goal settings for ${details.title} ${activity}`}</div>
              <h2>{`Name: ${details.title}`}</h2>
              <h2>{`Activities: `} </h2>
              {details.activities.map((activity) => {
                return <h3 key={activity}>{activity}</h3>;
              })}
              {goal.completed ? (
                <h1>Goal Complete!</h1>
              ) : (
                <>
                  <button onClick={handleComplete}>Mark as Complete!</button>
                  <button onClick={handleEdit}>Edit</button>
                </>
              )}
            </>
          ) : (
            <div>
              <form onSubmit={submitHandler}>
                <label htmlFor="name">Name your goal!</label>
                <input
                  type="text"
                  placeholder="Name of goal"
                  name="name"
                  onChange={changeHandler}
                  value={form.title}
                />
                <label htmlFor="startDate">Select Goal Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  onChange={changeHandler}
                  value={form.startDate}
                />
                <label htmlFor="endDate">Select Goal End Date</label>
                <input
                  type="date"
                  name="endDate"
                  onChange={changeHandler}
                  value={form.endDate}
                />
                <label htmlFor="activities">
                  Select Activities to accomplish your goal!
                </label>
                <input
                  type="enum"
                  placeholder="activities"
                  name="activities"
                  onChange={changeHandler}
                  value={form.activities}
                />
                <button>Update Goal!</button>
              </form>
              <button onClick={handleRemoveGoal}>Remove</button>
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
