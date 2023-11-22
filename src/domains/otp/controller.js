const OTP = require("./model");
const generateOTP = require("./../util/generateOTP");
const sendEmail = require("./../util/sendEmail");
const { hashData, verifyHashedData } = require("./../util/hashData");
const { AUTH_EMAIL } = process.env;

const verifyOTP = async ({ email, otp }) => {
  try {
    if (!(email && otp)) {
      throw Error("Enter Email And OTP");
    }
    // ensure otp record exists
    const matchedOTPRecord = await OTP.findOne({ email });

    if (!matchedOTPRecord) {
      throw new Error("No Record Found");
    }

    const { expiresAT } = matchedOTPRecord;

    //checking for expired code
    if (expiresAT < Date.now()) {
      await OTP.deleteOne({ email });
      throw Error("Code has expired . Request for a new one");
    }

    // Not expired yet , verify value

    const hashedOTP = matchedOTPRecord.otp;
    const validOTP = await verifyHashedData(otp, hashedOTP);
    return validOTP;
  } catch (error) {
    throw error;
  }
};

const sendOTP = async ({ email, subject, message, duration = 1 }) => {
  try {
    if (!(email && subject && message)) {
      throw Error("Provide Data For Email , Subject, Message");
    }

    // clear any old record
    await OTP.deleteOne({ email });

    // genertate pin
    const generatedOTP = await generateOTP();

    // send email

    const mailOptions = {
      from: AUTH_EMAIL,
      to: email,
      subject,
      html: `<p>Hello <b>${ email }</b></p>
      <p>${message}</p><p style ="color :red; font-size : 25px; letter-spacing:2px;"><b>${generatedOTP}</b></p>
            <p> This code <b> expires in 1 minutes</b>.</p>`,
    };
    await sendEmail(mailOptions);

    // save otp record
    const oneMinute = 60 * 1000;
    const hashedOTP = await hashData(generatedOTP);
    const newOTP = await new OTP({
      email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expireIn:Date.now() + oneMinute,
    });

    const createdOTPRecord = await newOTP.save();
    return createdOTPRecord;
  } catch (error) {
    throw error;
  }
};

const deleteOTP = async (email) => {
  try {
    await OTP.deleteOne({ email });
  } catch (error) {
    throw error;
  }
};

module.exports = { sendOTP, verifyOTP, deleteOTP };
