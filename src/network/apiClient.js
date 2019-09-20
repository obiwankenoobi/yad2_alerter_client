import axios from "axios";
import endpoints from "../constants/endpoints";
const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 60000
});

const setAuthTokenInHeader = token =>
  (instance.defaults.headers.common.Authorization = `Bearer ${token}`);

const addAlertstoDb = (alerts, email) =>
  instance.post(endpoints.addAlertstoDb, { alerts, email })

export default {
  addAlertstoDb,
  setAuthTokenInHeader
};
