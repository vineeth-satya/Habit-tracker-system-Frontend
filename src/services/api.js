import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getHabits = () => API.get("/habits");
export const getAnalytics = () => API.get("/analytics");
export const completeHabit = (id) =>
  API.post(`/habits/${id}/complete`);
export const deleteHabit = (id) =>
  API.delete(`/habits/${id}`);

export default API;
