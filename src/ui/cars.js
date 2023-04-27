import inquirer from "inquirer";
import {addCarAPI, deleteCarAPI, getCarsAPI, updateCarAPI} from "../api/cars.js";
import {mainMenu} from "../index.js";
import clui from "clui";
import {yearValidation} from "../validations/year.js";
import {priceValidation} from "../validations/price.js";
import boxen from "boxen";
import {boxenOptions} from "../constants/boxen.js";
import {cases} from "../constants/cases.js";


const showCarsList = (cars) => {
    let headers = new clui.Line()
        .padding(2)
        .column('No', 10)
        .column('Name', 30,)
        .column('Brand', 20)
        .column('Production year', 20)
        .column('Price', 20)
        .fill()
        .output();

    cars.forEach((item, i) => {
        let line = new clui.Line()
            .padding(2)
            .column((++i).toString(), 10)
            .column(item.title, 30)
            .column(item.brand, 20)
            .column(item.productionYear.toString(), 20)
            .column(item.price.toString(), 20)
            .fill()
            .output();
    })
}
export const addCarInputs = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Title',
            },
            {
                type: 'input',
                name: 'brand',
                message: 'Brand',
            },
            {
                type: 'input',
                name: 'productionYear',
                message: 'Production year',
                validate: async (input) => {
                    return yearValidation(input)
                }
            },
            {
                type: 'input',
                name: 'price',
                message: 'Price',
                validate: async (input) => {
                    return priceValidation(input)
                }
            },
        ])
        .then(answers => ({
            ...answers,
            productionYear: +answers.productionYear,
            price: +answers.price
        }))
}
export const updateCarInputs = (carData) => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Title',
                default: carData.title
            },
            {
                type: 'input',
                name: 'brand',
                message: 'Brand',
                default: carData.brand
            },
            {
                type: 'input',
                name: 'productionYear',
                message: 'Production year',
                default: carData.productionYear,
                validate: async (input) => {
                    return yearValidation(input)
                }
            },
            {
                type: 'input',
                name: 'price',
                message: 'Price',
                default: carData.price,
                validate: async (input) => {
                    return priceValidation(input)
                }
            },
        ])
        .then(answers => ({
            ...answers,
            productionYear: +answers.productionYear,
            price: +answers.price
        }))
}

const selectCarUI = cars => {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'cars',
                message: 'Cars list',
                choices: [
                    'go back',
                    ...cars.map(car => JSON.stringify({
                        id: car._id,
                        title: car.title,
                        brand: car.brand,
                        productionYear: car.productionYear,
                        price: car.price,
                    }))
                ],
            },
        ]).then(async answer => {
            if (answer.cars === 'go back') {
                return
            }
            return JSON.parse(answer.cars)
        })
}

export const carsMenuUI = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'cars',
                message: '\n' + boxen('Cars Menu', boxenOptions) + '\n',
                choices: Object.values(cases.cars)
            },
        ])
        .then(async (answers) => {
            switch (answers.cars) {
                case cases.cars.getCars:
                    const cars = await getCarsAPI()
                    showCarsList(cars)
                    mainMenu()
                    break;
                case cases.cars.addCar:
                    const carData = await addCarInputs()
                    await addCarAPI(carData)
                    console.log(boxen(
                        'Car is successfully added...' + '\n\n' + 'Check cars list',
                        { ...boxenOptions, borderColor: 'greenBright' }
                    ))
                    mainMenu()
                    break;
                case cases.cars.updateCar:
                    const carsList = await getCarsAPI()
                    const updateCarData = await selectCarUI(carsList)
                    if (updateCarData) {
                        const updateCarValues = await updateCarInputs(updateCarData)
                        await updateCarAPI(updateCarData.id, updateCarValues)
                        console.log(boxen(
                            'Car is successfully updated...' + '\n' + 'Check cars list',
                            { ...boxenOptions, borderColor: 'greenBright' }
                        ));
                    }
                    mainMenu()
                    break;
                case cases.cars.deleteCar:
                    const carsLists = await getCarsAPI()
                    const deleteCarData = await selectCarUI(carsLists)
                    if (deleteCarData) {
                        await deleteCarAPI(deleteCarData.id)
                        console.log(boxen(
                            'Car is successfully deleted...' + '\n' + 'Check cars list',
                            { ...boxenOptions, borderColor: 'greenBright' }
                        ));
                    }
                    mainMenu()
                    break;
            }
        });
}