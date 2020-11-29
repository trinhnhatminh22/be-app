exports.validateSignupData = (data) => {
    let errors = {};
    console.log(data);
    if (isEmpty(data.email)) {
        errors.email = "Email must not be empty";
    } else if (!isEmail(data.email)) {
        errors.email = "Email's format is wrong";
    }

    if (isEmpty(data.location)) {
        errors.location = "Location must not be empty";
    }

    if (isEmpty(data.phoneNumber)) {
        errors.phoneNumber = "Phone number must not be empty";
    }

    if (isEmpty(data.fullName)) {
        errors.fullName = "Full name must not be empty";
    }
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false,
    };
};

// check the email's format is email
const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) {
        return true;
    } else {
        return false;
    }
};

// validate the input string is not empty
const isEmpty = (string) => {
    if (string === "") {
        return true;
    } else {
        return false;
    }
};