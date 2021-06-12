import React, { useEffect, useState } from "react";
import service from "../../utils/service";

export default function UpdateGoal({ goal, handleReturnToDashboard }) {
  const [editable, setEditable] = useState(false);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    setDetails(goal);
    console.log("goal from details", goal);
    // setEditable(!editable);
  });

  const [form, setForm] = useState({
    name: goal.name,
    startDate: goal.startDate,
    endDate: goal.endDate,
    activities: goal.activities,
    achievements: goal.achievements,
    user: goal.user,
  });

  const handleEdit = () => {
    setEditable(!editable);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // create a service to update DB
    service.updateGoal(form);
    handleReturnToDashboard();
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleDelete = () => {
    // create a service call to delete base on goal id
  };

  console.log("this is details from goal settings", details);
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
                  value={goal.name}
                />
                <label htmlFor="startDate">Select Goal Start Date</label>
                <input type="date" name="startDate" onChange={changeHandler} value={goal.startDate}/>
                <label htmlFor="endDate">Select Goal End Date</label>
                <input type="date" name="endDate" onChange={changeHandler} value={goal.endDate} />
                <label htmlFor="activities">
                  Select Activities to accomplish your goal!
                </label>
                <input
                  type="enum"
                  placeholder="activities"
                  name="activities"
                  onChange={changeHandler}
                  value={goal.activities}
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
