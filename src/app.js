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

app.listen(3000, () => {    
    console.log('Server is running on http://localhost:3000');
});
 