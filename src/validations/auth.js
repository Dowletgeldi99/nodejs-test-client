export const emailValidation = (input) => {
    const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return mailFormat.test(input) ? true : 'You have entered an invalid email address!'
}

export const passwordValidation = (input) => {
    return input && input.trim().length >= 4 ? true : 'Please enter at least 4 letters'
}