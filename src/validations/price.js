export const priceValidation = price => {
    let testNum = /^[0-9]+$/;
    if (price !== 0 && price !== '0') {
        if ((price !== "") && (!testNum.test(price))) {
            return 'Please Enter Numeric Values Only';
        }
    } else {
        return 'Price cannot be 0'
    }

    return true
}