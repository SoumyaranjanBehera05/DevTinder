const express = require('express');
const app = express();


app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Something broke!");
    }
});

app.get('/getUserData', (req, res) => {
    try {
        throw new Error("This is error");
        res.send("User data Sent");
    } catch (err) {
        res.status(500).send("one error contact support team");
    }
});

app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Something broke!");
    }
});

app.listen(2306, () => {
    console.log('Server is running on port 2306');
});
