import React, { useState } from "react";
import service from "../../utils/service";

export default function NewGoal({ user, handleReturnToDashboard, setGoals }) {
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    activities: [],
    achievements: [],
    user: user._id,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await service.createGoal(form).then((response) => {
      setGoals(response.data.goals);
      handleReturnToDashboard();
    });
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
    <div className={"reg"} style={{marginLeft: "100px", marginTop: "100px"}}>
      <h1>{`You go, ${user.username}!`}</h1>
      <hr />
      <h2 className={"reg"}>{`ADD A GOAL`}</h2>

      {/* create a UI/wizard or logic to help users create a goal */}
      <div style={{width: "500px"}}>
        <form onSubmit={submitHandler} className={"bold-small"}>
          <label htmlFor="name">NAME YOUR GOAL: </label>
          <input
            type="text"
            name="name"
            onChange={changeHandler}
          />
          <br />
          <label htmlFor="startDate">START DATE: </label>
          <input type="date" name="startDate" onChange={changeHandler} />
          <br />
          <label htmlFor="endDate">END DATE: </label>
          <input type="date" name="endDate" onChange={changeHandler} />
          <br />
          <label htmlFor="activities">ADD ACTIVITIES: </label>
          <input
            type="enum"
            name="activities"
            onChange={changeHandler}
          />
          <br />
          <button>Create Goal!</button>
        </form>
      </div>
      </div>
    </>
  );
}
