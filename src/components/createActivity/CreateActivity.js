import React, { useState } from "react";
import service from "../../utils/service";
import "./CreateActivity.css";

export default function ActivityDetails({
  setCreatedActivities,
  setCreateActivity,
  user,
}) {
  const [form, setForm] = useState({
    title: "",
    start: "",
    end: "",
    description: "",
    user: user._id,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await service.saveCreatedActivity(form).then((response) => {
      const allActivities = response.data.createdActivities;
      console.log("return value from saving created activity", allActivities)
      setCreatedActivities(allActivities);
      setCreateActivity(false);
    });
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

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
          style={{ width: "300px", textAlign: "right" }}
        />
        <br />
        <label htmlFor="start" id={"formInput"} className={"bold-small"}>START DATE:</label>
        <input
          type="date"
          name="start"
          onChange={changeHandler}
          value={form.start}
          style={{ width: "300px", textAlign: "right" }}
        />
        <br />
        <label htmlFor="end" id={"formInput"} className={"bold-small"}>END DATE:</label>
        <input
          type="date"
          name="end"
          onChange={changeHandler}
          value={form.end}
          style={{ width: "300px", textAlign: "right" }}
        />
        <br />
        <label htmlFor="state" id={"formInput"} className={"bold-small"}>DESCRIPTION:{" "}</label>
        <input
          type="text"
          name="description"
          onChange={changeHandler}
          value={form.description}
          style={{ width: "300px", textAlign: "right" }}
        />
        <br />
        <button>Create Activity</button>
      </form>
    </>
  );
}
