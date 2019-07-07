import axios from "axios";

export function postLogin(user) {
    return axios.post("http://eatbana-dev.us-east-2.elasticbeanstalk.com/api/users/login", user);
}

export function postRegister(newUser) {
    return axios.post("http://eatbana-dev.us-east-2.elasticbeanstalk.com/api/guests", {
        name: newUser.fullName,
        email: newUser.email,
        password: newUser.password,
        gender: newUser.gender
    });
}