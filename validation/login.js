const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};
    // convert empty field to empty string

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password1 = !isEmpty(data.password1) ? data.password1 : "";
    
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required.';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid.'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required.';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}