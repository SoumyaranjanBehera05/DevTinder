const express = require('express');
const app = express();

app.use('/home', (req, res) => {
    res.send('Hello World!');
});

app.use('/hero', (req, res) => {
    res.send('This is hero section!');
});

app.use('/app', (req, res) => {
    res.send('This is app section!');
});

//This will only handle the GET calls to /user
app.get('/user', (req, res) => {
    res.send({ firstName: 'Soumya', lastName: 'ranjan' });
});

app.post('/user', (req, res) => {
    res.send('data is saved successfully from data base');
});

app.delete('/user', (req, res) => {
    res.send('data is deleted successfully from data base');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
