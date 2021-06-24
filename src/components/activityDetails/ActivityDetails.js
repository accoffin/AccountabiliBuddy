import React, { useState } from "react";
import service from "../../utils/service";
import './ActivityDetails.css';

export default function ActivityDetails({
  setCreatedActivities,
  setCreateActivity,
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await service.saveCreatedActivity(form).then((response) => {
      const allActivities = response.data.created_activities;
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
      <form onSubmit={submitHandler}
      className={"reg"}>
        <label htmlFor="name"
        id={"formInput"}>Activity Name: </label>
        <input
          type="text"
          placeholder=""
          name="name"
          onChange={changeHandler}
          value={form.name}
          style={{width: "300px", float: "right"}}
          
        />
        <br />
        <label htmlFor="state"
        id={"formInput"}>Activity Description: </label>
        <input
          type="text"
          placeholder=""
          name="description"
          onChange={changeHandler}
          value={form.description}
          style={{width: "300px", float: "right"}}
        />
        <br />
        <button>Create Activity!</button>
      </form>
    </>
  );
}
