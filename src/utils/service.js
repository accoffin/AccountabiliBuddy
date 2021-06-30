import axios from "axios";

// create a new instance of axios for which all the routes are pointing to the baseURL
// withCredentials allows us to convey cookie information from and to the server
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API || "http://localhost:5000",
  withCredentials: true,
});

const service = {
  // auth CRUD operations
  signup: async (userCredentials) =>
    await axiosInstance.post("/auth/signup", userCredentials),
  login: async (userCredentials) =>
    await axiosInstance.post("/auth/login", userCredentials),
  logout: async () => await axiosInstance.get("/auth/logout"),
  isAuthenticated: async () => await axiosInstance.get("/auth/isAuthenticated"),
  // goals CRUD
  getGoals: async () => await axiosInstance.get("/goals"),
  getGoalDetails: async () => await axiosInstance.get("/goals/:goalId"),
  createGoal: async (form) => await axiosInstance.post("/goals/new", form),
  updateGoal: async ({ form, goalId }) =>
    await axiosInstance.post("/goals/update", { form: form, goalId: goalId }),
  removeGoal: async (goalId) =>
    await axiosInstance.post("/goals/remove", goalId),
  completeGoal: async (goalId) =>
    await axiosInstance.post("/goals/completed", goalId),
  // activity api CRUD
  getActivitiesAPI: async (form) =>
    await axiosInstance.get(
      `/activities/api?city=${form.city}&state=${form.state}&query=${form.query}`
    ),
  saveSelectedActivityFromApi: async (selectedActivity) =>
    await axiosInstance.post("/activities/save", selectedActivity),
  getSavedActivitiesFromAPI: async () => await axiosInstance.get("/activities"),
  removeActivityFromUserActivities: async (activity) =>
    await axiosInstance.post("/activities/remove", activity),
  // user created activities CRUD
  saveCreatedActivity: async (activity) =>
    await axiosInstance.post("/created-activities/create", activity),
  getCreatedActivitiesFromDB: async () =>
    await axiosInstance.get("/created-activities"),
  removeCreatedActivity: async (activityId) =>
    await axiosInstance.post("/created-activities/remove", { activityId }),
};

export default service;
