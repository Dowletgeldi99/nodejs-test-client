import inquirer from "inquirer";
import {loginAPI, registerAPI} from "../api/auth.js";
import {mainMenu, setUserData} from "../index.js";
import boxen from "boxen";
import {boxenOptions} from "../constants/boxen.js";
import {cases} from "../constants/cases.js";
import {emailValidation, passwordValidation} from "../validations/auth.js";


export const authInputs = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'email',
                message: 'Email',
                validate: async (input) => emailValidation(input)
            },{
                type: 'input',
                name: 'password',
                message: 'Password',
                validate: async (input) => passwordValidation(input)
            }
        ])
        .then(answers => answers)
}

export const authMenuUI = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'auth',
                message: '\n' + boxen('Auth Menu', boxenOptions) + '\n',
                choices: Object.values(cases.auth),
            },
        ])
        .then(async (answers) => {
            switch (answers.auth) {
                case cases.auth.register:
                    const registerData = await authInputs()
                    let userDataRegister = await registerAPI(registerData)
                    setUserData(userDataRegister.user, userDataRegister.token)

                    mainMenu()
                    break;
                case cases.auth.login:
                    const loginData = await authInputs()
                    let userData = await loginAPI(loginData)
                    setUserData(userData.user, userData.token)
                    mainMenu()
                    break;
            }
        });
}