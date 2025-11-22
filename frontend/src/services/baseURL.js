import axios from "axios"
export const baseURL="http://localhost:5000";

const instance=axios.create({
  baseURL:baseURL,
  headers:{
    'Content-Type':"Application/json",

  }
})
export default instance;