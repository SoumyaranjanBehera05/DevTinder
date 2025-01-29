const express = require('express');
const app = express();

//multiple routes
app.use(
    "/user",
    (req, res, next) => {
        console.log("Handlin the route 1");
        // res.send("response")
        next();
    }, (req, res, next) => {
        console.log("Handlin the route 2");
        // res.send("response2")
        next();
    }, (req, res, next) => {
        console.log("Handlin the route 3");
        res.send("response3")
        next();
    }, (req, res, next) => {
        console.log("Handlin the route 4");
        // res.send("response4")
        next();
    }
);

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
