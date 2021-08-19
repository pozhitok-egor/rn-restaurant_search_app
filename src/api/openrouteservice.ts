import axios from "axios";
import CONFIG from "../core/config";

export default axios.create({
  baseURL: 'https://api.openrouteservice.org/v2/directions',
  params: {
    api_key: CONFIG.OPENROUTESERVICE.API_KEY
  }
})
