import axios from "axios";

// create a new instance of axios for which all the routes are pointing to the baseURL
// withCredentials allows us to convey cookie information from and to the server
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const service = {
  cloudinaryImageUpload: async (celebData) =>
    await axiosInstance.post("/celeb-with-img", celebData),
  createNewCelebrity: async (celebData) =>
    await axiosInstance.post("/celebrity", celebData),
  signup: async (userCredentials) =>
    await axiosInstance.post("/auth/signup", userCredentials),
  login: async (userCredentials) =>
    await axiosInstance.post("/auth/login", userCredentials),
  // home: async () => await axiosInstance.get("/"),
  logout: async () => await axiosInstance.get("/auth/logout"),
  isAuthenticated: async () => await axiosInstance.get("/auth/isAuthenticated"),
  // get info for all the celebrities,
  getAllCelebrities: async () => await axiosInstance.get("/celebrities"),
  // get info about specific celebrity based on id
  getCelebrityInfo: async (id) => await axiosInstance.get(`/celebrities/${id}`),
  createCelebrity: async (celebrityData) =>
    await axiosInstance.post("/celebrities/create", celebrityData),
  updateCelebrity: (id, celebrityData) =>
    axiosInstance
      .post(`/celebrities/${id}/edit`, celebrityData)
      .then((responseFromAPI) => responseFromAPI),
};

export default service;
