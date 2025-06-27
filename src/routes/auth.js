const express = require('express');
const authRouter = express.Router();

const { validateSignupData } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require("bcrypt");


authRouter.post('/signup', async (req, res) => {
    try {
        //validation of data
        validateSignupData(req);
        const { firstName, lastName, email, password } = req.body;

        //Encrypt the password
        const passwordHash = await bcrypt.hash(password, 8);
        console.log(passwordHash);

        //create a new instance of the user model
        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });
        await user.save();
        res.send("User created successfully");
    } catch (error) {
        res.status(400).send("Error :" + error.message);
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Email id not found");
        }
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {

            //create a JWT token
            const token = await user.getJWT();

            //Add the token to the cookie and send the response back to the user
            res.cookie("token", token ,{
                expires: new Date(Date.now()+ 8*3600000), // 8 hours
            });
            res.send(user);
        } else {
            throw new Error("Password is incorrect");
        }
    } catch (error) {
        res.status(400).send("Error :" + error.message);
    }
});

authRouter.post('/logout', async (req, res) => {

    //logout method 1
    // res.clearCookie("token");
    // res.send("Logged out successfully");

    //logout method 2
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    })
    res.send("Logged out successfully");
});

module.exports = authRouter;