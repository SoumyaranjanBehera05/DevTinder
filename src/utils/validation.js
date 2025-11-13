const validator = require('validator');

const validateSignupData = (req) => {
    const { firstName, email, password } = req.body;

    if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        'firstName',
        'lastName',
        'email',
        'age',
        'gender',
        'about',
        'skills',
        'photoUrl'
    ]

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

    return isEditAllowed;
}

module.exports = { validateSignupData, validateEditProfileData };
