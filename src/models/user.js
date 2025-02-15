const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength:8,
        maxLength:40
    },
    lastName: {
        type: String
    },
    age: {
        type: Number,
        min: 18,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password");
            }
        }
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is ot valid");
            }
        },
    },
    about: {
        type: String,
        default: "Hey there! I am using devTinder"
    },
    skills:{
        type:[String],
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);