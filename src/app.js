const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

app.post('/signup', async (req, res) => {
    const user = new User({
        firstName: "Piyush",
        lastName: "sharma",
        age: 29,
        email: "beherasoumya650@gmail.com",
        password: "piyush@134"
    });
    try {
        await user.save();
    res.send("User created successfully");
    } catch (error) {
        res.status(500).send("Error saving the user :"+error.message);
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


