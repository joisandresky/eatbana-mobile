import axios from "axios";

export function getGuest(id) {
    return axios.get("http://eatbana-dev.us-east-2.elasticbeanstalk.com/api/guests/user/" + id);
}