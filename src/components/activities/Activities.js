import React, { useState, useEffect, useContext } from "react";
import "./Activities.css";
import service from "../../utils/service";
import Chart from "react-google-charts";
import CreateActivity from "../createActivity/CreateActivity";
import { ActivityContext } from "../../TheContext";

export default function Activities({ user }) {
  const [apiResults, setApiResults] = useState([]);
  const [savedActivities, setSavedActivities] = useState([]);
  const [createdActivities, setCreatedActivities] = useState([]);
  const [createActivity, setCreateActivity] = useState(false);
  const [dataForChart, setDataForChart] = useState([
    ["Category", "Count From Results"],
  ]);
  const [form, setForm] = useState({
    city: "",
    state: "",
    query: "",
  });
  const { setActivity } = useContext(ActivityContext);

  useEffect(() => {
    service.getCreatedActivitiesFromDB().then((response) => {
      setCreatedActivities(response.data.createdActivities);
    });
    service.getSavedActivitiesFromAPI().then((response) => {
      setSavedActivities(response.data.activities);
    });
    // service.getActivitiesAPI(form).then((response) => {
    //   const activities = response.data.activities.results;
    //   // create array of Guids to filter api results against
    //   let activitiesAlreadySaved = savedActivities.map(
    //     (activity) => activity.assetGuid
    //   );
    //   // don't show activities that we already have saved
    //   const filteredActivities = activities.filter((activity) => {
    //     return !activitiesAlreadySaved.includes(activity.assetGuid);
    //   });
    //   setApiResults(filteredActivities);

    //   // create hashtable to analyze categories from api results
    //   const hashedCategory = {};
    //   for (const element in filteredActivities) {
    //     const arrayOfAssetCategories =
    //       filteredActivities[element].assetCategories;
    //     for (const categoryObj in arrayOfAssetCategories) {
    //       const categoryName =
    //         arrayOfAssetCategories[categoryObj].category.categoryName;

    //       hashedCategory[categoryName] = hashedCategory[categoryName]
    //         ? (hashedCategory[categoryName] += 1)
    //         : 1;
    //     }
    //   }
    //   const hashKeys = Object.keys(hashedCategory);
    //   const dataArray = [];
    //   hashKeys.forEach((key) => {
    //     dataArray.push([key, hashedCategory[key]]);
    //   });
    //   setDataForChart([...dataForChart, ...dataArray]);
    // });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setActivity(savedActivities);
    // eslint-disable-next-line
  }, [setActivity, savedActivities]);

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

  const handleCreateActivity = () => {
    setCreateActivity(true);
  };

  const handleRemoveCreatedActivity = async (activityId) => {
    console.log("activity id from remove created activity", activityId)
    await service.removeCreatedActivity(activityId).then((response)=>{
      setCreatedActivities(response.data.createdActivities);
      console.log("created activities from removing service call", createdActivities)
    })
  };

  return (
    <>
      <br></br>
      <h3 id={"h3title"} className={"bold"}>MY SAVED ACTIVITIES</h3>
      <div id={"saved-activity-main"} className={"reg"}>
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
            <h3 className={"reg"}>You have no saved activites</h3>
          </>
        )}
      </div>
      <hr />
      <div>
        <h3 id={"h3title"} className={"bold"}>
          YOUR ACTIVITY LOG
        </h3>
        <hr />
        <br></br>
        {createActivity ? (
          <CreateActivity
            setCreatedActivities={setCreatedActivities}
            setCreateActivity={setCreateActivity}
            user={user}
          />
        ) : (
          <div>
            <h3 className={"bold"}>Add an activity!</h3>
            <button onClick={handleCreateActivity} className={"reg"}>
              Create Activity
            </button>
          </div>
        )}
        <div>
          {createdActivities ? (
            <>
              <div id={"saved-activity-main"}>
                {createdActivities.map((activity) => {
                  return (
                    <div
                      id={"activity-card"}
                      key={activity._id}
                      onClick={() =>
                        handleRemoveCreatedActivity(activity._id)
                      }
                    >
                      <p>{activity.title}</p>
                      <p>{activity.description}</p>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <p>No created activities.</p>
            </>
          )}
        </div>
        <br></br>
      </div>
      <br />
      <div  id={"saved-activity-main"} style={{width: "400px"}}>
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
      <br />
      <h3 className={"bold"}>
        Looking to try something new? Search our database for new activities!
      </h3>
      <hr />
      <br />
      <div className={"reg"}>
        <div>
          <div id="query-activities-main">
            <form onSubmit={submitHandler} className={"bold-small"} id={"formInput"}>
              <label htmlFor="name" id={"formInput"}>CITY: </label>
              <input
                type="text"
                placeholder=""
                name="city"
                onChange={changeHandler}
                value={form.city}
                style={{ width: "300px", textAlign: "right" }}
              />
              <br />
              <label htmlFor="state" id={"formInput"}>STATE: </label>
              <input
                type="text"
                placeholder=""
                name="state"
                onChange={changeHandler}
                value={form.state}
                style={{ width: "300px", textAlign: "right" }}
              />
              <br />
              <label htmlFor="query" id={"formInput"}>KEYWORDS: </label>
              <input
                type="text"
                placeholder=""
                name="query"
                onChange={changeHandler}
                value={form.query}
                style={{ width: "300px", textAlign: "right" }}
              />
              <br />
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
