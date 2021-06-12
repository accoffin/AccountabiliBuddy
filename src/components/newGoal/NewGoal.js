import React, { useState } from "react";
import service from "../../utils/service";

export default function NewGoal({ user, handleReturnToDashboard }) {
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    activities: [],
    achievements: [],
    user: user._id,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    service.createGoal(form)
    handleReturnToDashboard()
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <h1>{`You go ${user.username}!`}</h1>
      <h2>{`Complete the form below to create a new goal!`}</h2>

      {/* create a UI/wizard or logic to help users create a goal */}
      <div>
        <form onSubmit={submitHandler}>
          <label htmlFor="name">Name your goal!</label>
          <input
            type="text"
            placeholder="Name of goal"
            name="name"
            onChange={changeHandler}
          />
          <label htmlFor="startDate">Select Goal Start Date</label>
          <input type="date" name="startDate" onChange={changeHandler} />
          <label htmlFor="endDate">Select Goal End Date</label>
          <input type="date" name="endDate" onChange={changeHandler} />
          <label htmlFor="activities">
            Select Activities to accomplish your goal!
          </label>
          <input
            type="enum"
            placeholder="activities"
            name="activities"
            onChange={changeHandler}
          />
          <button>Create Goal!</button>
        </form>
      </div>
    </>
  );
}
