import axios from "axios";

export function getNearbyService(page, limit, lat, lng, search) {
  return axios.get(`http://eatbana-dev.us-east-2.elasticbeanstalk.com/api/restaurants/nearby?page=${page}&limit=${limit}&lng=${lng}&lat=${lat}&search=${search}`);
}

export function getCriteriaService(lat, lng, body) {
  console.log('body service', body)
  return axios.post(`http://eatbana-dev.us-east-2.elasticbeanstalk.com/api/restaurants/findCriteria?lng=${lng}&lat=${lat}`, body);
}

export function getRestaurantService(id) {
  return axios.get(`http://eatbana-dev.us-east-2.elasticbeanstalk.com/api/restaurants/${id}`);
}