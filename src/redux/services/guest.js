import axios from "axios";

export function getGuest(id) {
    return axios.get("http://eatbana.herokuapp.com/api/guests/user/" + id);
}