import React, { useState } from "react";
import service from "../../utils/service";

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
      <div>This is activity details.</div>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name your activity:</label>
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={changeHandler}
          value={form.name}
        />
        <label htmlFor="state">Describe your activity.</label>
        <input
          type="text"
          placeholder="description"
          name="description"
          onChange={changeHandler}
          value={form.description}
        />
        <button>Create Activity!</button>
      </form>
    </>
  );
}
