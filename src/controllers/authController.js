const { OtpModel } = require('../models/otp_model');
const jwt = require('jsonwebtoken');
const nf = require('node-fetch'); // Assuming you’re using this for HTTP


module.exports.sendOTP = async (req, res) => {
  const number = req.body.phone_number;
  let otp = Math.floor(1000 + Math.random() * 9000);

  try {
    const resp = await nf(`https://2factor.in/API/V1/e8c91852-bf45-11ea-9fa5-0200cd936042/SMS/${number}/${otp}`);

    if (resp.status === 200) {
      await OtpModel.updateOne(
        { phone_number: number },
        { $set: { otp, createdAt: new Date() } },
        { upsert: true }
      );

      res.status(200).json({ status: "success", message: "OTP sent successfully" });
    } else {
      res.status(500).json({ status: "failure", message: "Failed to send OTP" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};
module.exports.verifyOTP = async (req, res) => {
  try {
    const { phone_number: number, otp } = req.body;

    if (!number || !otp) {
      return res.status(400).json({ message: "phone_number and otp are required" });
    }

    const theotp = await OtpModel.findOne({ phone_number: number });

    if (theotp && theotp.otp === otp) {
      const secretKey = process.env.SECRET_JWT;
      if (!secretKey) {
        return res.status(500).json({ message: "JWT secret not found" });
      }

      const mytoken = jwt.sign({ phone_number: number }, secretKey, { expiresIn: '30d' });

      await OtpModel.deleteOne({ phone_number: number });

      return res.status(200).json({
        status: "success",
        message: "verified successfully",
        token: mytoken,
        id: theotp._id,
      });
    } else {
      return res.status(401).json({
        status: "failure",
        message: "wrong OTP",
      });
    }
  } catch (error) {
    console.error("verifyOTP error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
