import axios from "axios";
import {BaseURL} from "../constants/api.js";
export const loginAPI = body => {
    let url = `${BaseURL}/auth/login`
    return axios.post(url, body)
        .then((response) => {
            let token = response.headers.get('authorization')
            return {user: response.data, token}
        })
        .catch((err) => {
            console.log(err);
        })
}

export const registerAPI = body => {
    const url = `${BaseURL}/auth/register`
    try {
        return axios.post(url, body)
            .then((response) => {
                let token = response.headers.get('authorization')
                return {user: response.data, token}
            })
    } catch (e) {
        console.log(e);
    }

}