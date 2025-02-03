const express = require('express');
const app = express();

const { adminAuth,userAuth } = require('./middlewares/auth');
// Handle Authorization middleware for all get, post requests

app.use('/admin', adminAuth);

app.get('/user',userAuth, (req, res) => {
    res.send('User data sent');
});

// Route to get all data
app.get('/admin/getAlldata', (req, res) => {
    res.send('All data sent');
});

// Route to delete all data
app.get('/admin/deleteUser', (req, res) => {
    res.send('All data deleted');
});

app.listen(2306, () => {
    console.log('Server is running on port 2306');
});
