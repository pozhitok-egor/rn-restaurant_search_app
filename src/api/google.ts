import axios from "axios";
import CONFIG from "../core/config";

export default axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place',
  params: {
    radius: 3000,
    key: CONFIG.GOOGLE.API_KEY
  }
})

export const getPhoto = (photoReference: string) => {
  return `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photoReference}&maxwidth=800&key=${CONFIG.GOOGLE.API_KEY}`;
}
