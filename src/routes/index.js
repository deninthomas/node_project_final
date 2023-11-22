const express = require("express");
const router = express.Router();

const userRoutes = require("./../domains/user");
const controller = require('../controller/controller');
const OTPRoutes = require("./../domains/otp");
const EmailVerificationRoutes = require("./../domains/email_verification");
const ForgotPasswordRoutes = require("./../domains/forgot_password");
const services = require("../services/render");
// const {isAuthenticated} = require('../services/authentication');


// get render home page
// router.get('/', isAuthenticated, services.homeRoutes);
router.get('/', services.homeRoutes);

// get view employee page
router.get('/view/',services.viewRoutes);

// get render login page
router.get('/login',services.loginRoutes);


// get render signup page
router.get('/signup',services.signupRoutes);

// get render otp verification page
router.get('/signup/otpverification',services.otpVerificationRoutes);

// get render forgot password page
router.get('/resetpassword',services.resetpasswordRoutes);




// API
router.post('/api/employees',controller.create);
router.get('/api/employees',controller.find);
router.put('/api/employees/:id',controller.update);
router.delete('/api/employees/:id',controller.delete);
router.get('/api/employees/search', controller.search);

router.use("/user", userRoutes);
router.use("/otp",OTPRoutes);
router.use("/email_verification",EmailVerificationRoutes);
router.use("/forgot_password", ForgotPasswordRoutes);

module.exports = router;
