import React, { useState, useEffect } from "react";
import "./Activities.css";
import service from "../../utils/service";
import Chart from "react-google-charts";

export default function Activities() {
  const [apiResults, setApiResults] = useState([]);
  const [savedActivities, setSavedActivities] = useState([]);
  const [dataForChart, setDataForChart] = useState([
    ["Category", "Count From Results"],
  ]);
  const [form, setForm] = useState({
    city: "",
    state: "",
    query: "",
  });

  useEffect(() => {
    service.getSavedActivitiesFromAPI().then((response) => {
      setSavedActivities(response.data.activities);
    });
  }, []);

  const handleSelectActivity = (activity) => {
    service.saveSelectedActivityFromApi(activity).then((response) => {
      const activitiesFromDB = response.data.activities;
      setSavedActivities([...activitiesFromDB]);
      setApiResults(
        apiResults.filter(
          (activityFromApi) => activityFromApi.assetGuid !== activity.assetGuid
        )
      );
    });
  };

  const handleRemoveActivity = async (activity) => {
    await service.removeActivityFromUserActivities(activity);
    setSavedActivities(
      savedActivities.filter(
        (savedActivity) => savedActivity.assetGuid !== activity.assetGuid
      )
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await service.getActivitiesAPI(form).then((response) => {
      const activities = response.data.activities.results;
      // create array of Guids to filter api results against
      let activitiesAlreadySaved = savedActivities.map(
        (activity) => activity.assetGuid
      );
      // don't show activities that we already have saved
      const filteredActivities = activities.filter((activity) => {
        return !activitiesAlreadySaved.includes(activity.assetGuid);
      });
      setApiResults(filteredActivities);

      // create hashtable to analyze categories from api results
      const hashedCategory = {};
      for (const element in filteredActivities) {
        const arrayOfAssetCategories =
          filteredActivities[element].assetCategories;
        for (const categoryObj in arrayOfAssetCategories) {
          const categoryName =
            arrayOfAssetCategories[categoryObj].category.categoryName;

          hashedCategory[categoryName] = hashedCategory[categoryName]
            ? (hashedCategory[categoryName] += 1)
            : 1;
        }
      }
      const hashKeys = Object.keys(hashedCategory);
      const dataArray = [];
      hashKeys.forEach((key) => {
        dataArray.push([key, hashedCategory[key]]);
      });
      setDataForChart([...dataForChart, ...dataArray]);
    });
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <br></br>
      <h3>My saved activities</h3>
      <div id={"saved-activity-main"}>
        {savedActivities ? (
          <>
            {savedActivities.map((activity) => {
              return (
                <div
                  id={"activity-card"}
                  key={activity.assetGuid}
                  onClick={() => handleRemoveActivity(activity)}
                >
                  <p>{activity.assetName}</p>
                  <p>{activity.homePageUrlAdr}</p>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <h3>You have not saved activites</h3>
          </>
        )}
      </div>
      <div>
        <h3>My created activities</h3>
      </div>
      <br></br>
      <div>
        {apiResults.length > 0 ? (
          <Chart
            width={"700px"}
            height={"400px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={dataForChart}
            options={{
              title: "My Goal Categories",
            }}
            rootProps={{ "data-testid": "1" }}
          />
        ) : (
          <p>Chart Area</p>
        )}
      </div>
      <br></br>
      <h3>Search for activities to help you accomplish you goals!</h3>
      <br></br>
      <div>
        <div>
          <div id="query-activities-main">
            <form onSubmit={submitHandler}>
              <label htmlFor="name">City</label>
              <input
                type="text"
                placeholder="city"
                name="city"
                onChange={changeHandler}
                value={form.city}
              />
              <label htmlFor="state">State</label>
              <input
                type="text"
                placeholder="state"
                name="state"
                onChange={changeHandler}
                value={form.state}
              />
              <label htmlFor="query">Keywords</label>
              <input
                type="text"
                placeholder="query"
                name="query"
                onChange={changeHandler}
                value={form.query}
              />
              <button>Search Activities!</button>
            </form>
          </div>
        </div>
        <br></br>
        <div id={"activity-main"}>
          {apiResults &&
            apiResults.map((activity, index) => {
              return (
                <div
                  id={"activity-card"}
                  onClick={() => handleSelectActivity(activity)}
                  key={activity.assetGuid}
                >
                  <p>{activity.assetName}</p>
                  <p>{activity.homePageUrlAdr}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
