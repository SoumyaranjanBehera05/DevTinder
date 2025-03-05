const express = require('express');

const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');



requestRouter.post("/sendConnectionReq",userAuth,async(req,res)=>{
    const user = req.user;
    //Sending a connection request
    console.log("Sending a connection request");
    res.send(user.firstName + "Sent the connection request")
});

module.exports = requestRouter;