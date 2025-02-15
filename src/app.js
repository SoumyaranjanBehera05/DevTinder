const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');
const { validateSignupData } = require('./utils/validation');
const bcrypt = require("bcrypt");
app.use(express.json());


app.post('/signup', async (req, res) => {
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

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Email id not found");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.send("login successful");
        }else{
            throw new Error("Password is incorrect");
        }
    } catch (error) {
        res.status(400).send("Error :" + error.message);
    }
});

app.get('/user', async (req, res) => {
    const userEmail = req.body.email;
    try {
        const users = await User.find({ email: userEmail });
        if (users.length === 0) {
            res.status(404).send("User not found");
        } else {
            res.send(users);
        }
    } catch (error) {
        res.status(400).send("Something went wrong :" + error.message);
    }
});

//Feed API - GET/feed - Get all the users from the database
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(400).send("Something went wrong :" + error.message);
    }
});


app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        const users = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (error) {
        res.status(400).send("Something went wrong :" + error.message);
    }
});

//update data of the user
app.patch('/user/:userId', async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try {

        const ALLOWED_UPDATES = [
            "about",
            "age",
            "gender",
            "skills",
        ];
        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }
        if (data?.skills.length > 10) {
            throw new Error("Skills limit exceeded");
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "after",
            runValidators: true,
        });
        console.log(user);
        res.send("User updated successfully");

    }
    catch (error) {
        res.status(400).send("Something went wrong :" + error.message);
    }
});

connectDB().then(() => {
    console.log('Database connected');
    app.listen(2306, () => {
        console.log('Server is running on port 2306');
    });
}).catch((err) => {
    console.error('Error in connecting database', err);
});


