const express = require("express");
const router = express.Router();
const {sendVerificationOTPEmail,verifyUserEmial} = require("./controller");

 router.post("/otpverification", async(req,res)=>{


    try{
       let{email , otp} =req.body;

       if(!(email && otp)) throw Error("Empty otp details are not allowed");


       await verifyUserEmial({email,otp});
       res.status(200).json({email,verified:true});


    } catch(error){

       res.status(400).send(error.message);

    }
 });

//request new veriication otp
router.post("/" , async (req,res) =>{
    
     try{

       const{email} = req.body;
       if(!email) throw Error("An email is required");


       const createdEmailVerificationOTP = await 
       sendVerificationOTPEmail(email);
       res.status(200).json(createdEmailVerificationOTP);

     } catch(error){

        res.status(400).send(error.message);

     }
});

module.exports =router;