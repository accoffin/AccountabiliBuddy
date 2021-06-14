import React, { useEffect, useState } from "react";
import service from "../../utils/service";

export default function UpdateGoal({
  goal,
  handleReturnToDashboard,
  goals,
  setGoals,
}) {
  const [editable, setEditable] = useState(false);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    setDetails(goal);
  }, [goal]);

  const [form, setForm] = useState({
    name: goal.name ? goal.name : `undefined`,
    startDate: goal.startDate ? goal.startDate : "",
    endDate: goal.endDate ? goal.endDate : "",
    activities: goal.activities ? goal.activities : `undefined`,
    achievements: goal.achievements ? goal.achievements : `undefined`,
    user: goal.user[0],
  });

  const handleEdit = () => {
    setEditable(!editable);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    service.updateGoal({ form: form, goalId: goal._id }).then((response) => {
      // update goals state instead of recalling service call from Persistant Drawer
      // find which goal is pointed at the same place in storage, then update that goal
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

  const handleDelete = () => {
    // create a service call to delete based on goal id
  };

  return (
    <>
      {details && (
        <div>
          {!editable ? (
            <>
              <div>{`Goal settings for ${goal.name}`}</div>
              <h1>{`Name: ${goal.name}`}</h1>
              <h2>{`Activities: `} </h2>
              {details.activities.map((activity) => {
                return <h3 key={activity}>{activity}</h3>;
              })}
              <button onClick={handleEdit}>Edit</button>
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
                  value={form.name}
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
              <button onClick={handleDelete}>Delete</button>
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