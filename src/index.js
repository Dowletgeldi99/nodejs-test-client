import {authMenuUI} from "./ui/auth.js";
import {carsMenuUI} from "./ui/cars.js";

export let userToken = ''
export let userData

export const setUserData = (user, token) => {
    userData = user
    userToken = token
}

export const mainMenu = () => {
    if (!userToken) {
        authMenuUI()
    } else {
        carsMenuUI()
    }
}

mainMenu()