const express = require('express');
const connectDB = require('./config/database');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const requestRouter = require('./routes/request');
const profileRouter = require('./routes/profile');

app.use('/', authRouter);
app.use('/', requestRouter);
app.use('/', profileRouter);

connectDB().then(() => {
    console.log('Database connected');
    app.listen(2306, () => {
        console.log('Server is running on port 2306');
    });
}).catch((err) => {
    console.error('Error in connecting database', err);
});


