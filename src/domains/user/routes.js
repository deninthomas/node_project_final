const express = require("express");
const router = express.Router();
const { createNewUser , authenticateUser} = require("./controller");
const auth = require("./../../middleware/auth");
const {sendVerificationOTPEmail} =require("./../email_verification/controller");



// // protected route
// router.get("/private_data",auth,(req,res) =>{
//   res.status(200).send(`You are in the private user account of ${req.currentUser.email}`);
// })

//login
router.post("/", async (req,res) => {

  try{

  
     let {email , password} = req.body;
     email = email.trim();
     password = password.trim() ;

     if(!(email && password)){
      throw Error ("Empty Credentials supplied");
     }

     const authenticatedUser = await authenticateUser({email,password});
      

     res.status(200).json(authenticatedUser);
  }catch(error){
  
       res.status(400).send(error.message);

  }
});






// Signup
router.post("/signup", async (req, res) => {
  try {
    let { name, email, password } = req.
      body;
    name = name;
    email = email.trim();
    password = password.trim();

    if (!(name && email && password)) {
      throw Error("Empty Input Filed");
     } else if (!/^[A-Za-z]/.test(name)){
      throw Error("Invalid Name Entered");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw Error("Please enter a valid Email Address");
    } else if (password.length < 8) {
      throw Error("Password should be at least 8 characters long");
    } else {
      console.log("All Data Entered is Valid");
      const newUser = await createNewUser({
        name,
        email,
        password,
      });
      await sendVerificationOTPEmail(email);
      res.status(200).json(newUser);
      // res.redirect("/signup/otpverification");
    }
  } catch (error) {
    res.status(400).send(error. message);
  }
});
module.exports = router;


