import axios from "axios"
// export const baseURL="http://localhost:5000";
export const baseURL="https://home-assignment-c3hr.onrender.com"

const instance=axios.create({
  baseURL:baseURL,
  headers:{
    'Content-Type':"Application/json",

  }
})
export default instance;