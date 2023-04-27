import axios from "axios";
import {BaseURL} from "../constants/api.js";
import {userToken} from "../index.js";

export const getCarsAPI = () => {
    const url = `${BaseURL}/cars`
    return axios.get(url)
        .then((response) => response.data)
        .catch((err) => {
            console.log(err);
        })
}

export const addCarAPI = (carData) => {
    const url = `${BaseURL}/cars`
    return axios.post(url, carData)
        .then((response) => response.data)
        .catch((err) => {
            console.log(err);
        })
}

export const updateCarAPI = (id, carData) => {
    if (!userToken) {
        return 'Please login...'
    }
    const url = `${BaseURL}/cars/${id}`
    return axios.patch(url, carData, {
        headers: {
            'Authorization': userToken
        }
    })
        .then((response) => response.data)
        .catch((err) => {
            console.log(err);
        })
}

export const deleteCarAPI = (id) => {
    if (!userToken) {
        return 'Please login...'
    }
    const url = `${BaseURL}/cars/${id}`
    return axios.delete(url, {
        headers: {
            'Authorization': userToken
        }
    })
        .then((response) => response.data)
        .catch((err) => {
            console.log(err);
        })
}