import React, { useState } from "react";
import service from "../../utils/service";
import "./CreateActivity.css";

export default function ActivityDetails({
  setCreatedActivities,
  setCreateActivity,
  user,
  goal,
  setAddActivities,
}) {
  const [form, setForm] = useState({
    title: "",
    start: "",
    end: "",
    description: "",
    goalId: goal._id,
    user: user._id,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await service.saveCreatedActivity(form).then((response) => {
      const allActivities = response.data.createdActivities;
      setCreatedActivities(allActivities);
    });
    setAddActivities(false);
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const inputStyle = {
    width: "300px", 
    textAlign: "right" 
  }

  return (
    <>
      <div className={"reg"}>Enter the details of your activity!</div>
      <br />
      <form onSubmit={submitHandler} id={"formInput"}>
        <label htmlFor="title" id={"formInput"} className={"bold-small"}>
          ACTIVITY TITLE:{" "}
        </label>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          value={form.title}
          style={inputStyle}
        />
        <br />
        <label htmlFor="start" id={"formInput"} className={"bold-small"}>START DATE:</label>
        <input
          type="date"
          name="start"
          onChange={changeHandler}
          value={form.start}
          style={inputStyle}
        />
        <br />
        <label htmlFor="end" id={"formInput"} className={"bold-small"}>END DATE:</label>
        <input
          type="date"
          name="end"
          onChange={changeHandler}
          value={form.end}
          style={inputStyle}
        />
        <br />
        <label htmlFor="state" id={"formInput"} className={"bold-small"}>DESCRIPTION:{" "}</label>
        <input
          type="text"
          name="description"
          onChange={changeHandler}
          value={form.description}
          style={inputStyle}
        />
        <br />
        <button>Create Activity</button>
      </form>
    </>
  );
}
