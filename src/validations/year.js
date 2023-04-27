export const yearValidation = year => {
    let testNum = /^[0-9]+$/;
    if (year !== 0) {
        if ((year !== "") && (!testNum.test(year))) {
            return "Please Enter Numeric Values Only";
        }

        if (year.length !== 4) {
            return "Year is not proper. Please check";
        }

        let current_year = new Date().getFullYear();
        if ((year < 1920) || (year > current_year)) {
            return "Year should be in range 1920 to current year";
        }
        return true;
    }
}