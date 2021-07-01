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
<<<<<<< HEAD:src/components/activityDetails/ActivityDetails.js
      <form onSubmit={submitHandler}
      className={"bold-small"} id={"formInput"}>
        <label htmlFor="name"
        id={"formInput"}>ACTIVITY NAME: </label>
=======
      <form onSubmit={submitHandler} className={"reg"}>
        <label htmlFor="title" id={"formInput"}>
          Activity Title:{" "}
        </label>
>>>>>>> origin/master:src/components/createActivity/CreateActivity.js
        <input
          type="text"
          placeholder=""
          name="title"
          onChange={changeHandler}
<<<<<<< HEAD:src/components/activityDetails/ActivityDetails.js
          value={form.name}
          style={{width: "300px"}}
          
        />
        <br />
        <label htmlFor="state"
        id={"formInput"}>DESCRIPTION: </label>
=======
          value={form.title}
          style={{ width: "300px", float: "right" }}
        />
        <br />
        <label htmlFor="startDate">Select Activity Start Date</label>
        <input
          type="date"
          name="start"
          onChange={changeHandler}
          value={form.start}
        />
        <label htmlFor="end">Select Activity End Date</label>
        <input
          type="date"
          name="end"
          onChange={changeHandler}
          value={form.end}
        />
        <label htmlFor="state" id={"formInput"}>
          Activity Description:{" "}
        </label>
>>>>>>> origin/master:src/components/createActivity/CreateActivity.js
        <input
          type="text"
          placeholder=""
          name="description"
          onChange={changeHandler}
          value={form.description}
<<<<<<< HEAD:src/components/activityDetails/ActivityDetails.js
          style={{width: "300px"}}
=======
          style={{ width: "300px", float: "right" }}
>>>>>>> origin/master:src/components/createActivity/CreateActivity.js
        />
        <br />
        <button>Create Activity!</button>
      </form>
    </>
  );
}
