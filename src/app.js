const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');
app.use(express.json());

app.post('/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
    res.send("User created successfully");
    } catch (error) {
        res.status(500).send("Error saving the user :"+error.message);
    }
    
});

app.get('/user', async (req, res) => {
    const userEmail = req.body.email;
    try {
        const users = await User.find({email:userEmail});
        if (users.length === 0) {
            res.status(404).send("User not found");            
        } else {
            res.send(users);
        }
    } catch (error) {
        res.status(400).send("Something went wrong :"+error.message);
    }
});

//Feed API - GET/feed - Get all the users from the database
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(400).send("Something went wrong :"+error.message);
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


