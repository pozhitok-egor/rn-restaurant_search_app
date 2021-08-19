import axios from "axios";
import CONFIG from "../core/config";

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: 'Bearer ' + CONFIG.YELP.KEY
  }
})
