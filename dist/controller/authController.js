"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendUser = exports.verifyUser = exports.sendVerificationEmail = exports.userVerify = exports.googleRegisterController = exports.googleAuthController = exports.loginController = exports.signupController = void 0;
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../libs/auth");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const crypto_1 = __importDefault(require("crypto"));
/**
 * @method POST
 * @param req
 * @param res
 * @returns
 */
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Check if email already exists
        let user = yield User_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // Create new user
        user = new User_1.default({ name, email, password });
        // Generate verification token
        user.verificationToken = crypto_1.default.randomBytes(20).toString("hex");
        yield user.save();
        yield (0, exports.sendVerificationEmail)(user.email, user.verificationToken, name);
        res
            .status(201)
            .json({ message: "User registered, verification email sent" });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.signupController = signupController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ user: "User not found!" });
        }
        if (!user.isVerified) {
            return res.status(404).json({ user: "Please verify your account" });
        }
        // Here we assert that user is of IUser type.
        const isPasswordMatch = yield user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json({ password: "Invalid password" });
        }
        const token = yield (0, auth_1.generateJwtToken)(user);
        yield User_1.default.findByIdAndUpdate(user._id, Object.assign(Object.assign({}, user), { lastLoginTime: new Date() }), {
            new: true,
        });
        return res.json({
            user: {
                name: user.name,
                email: user.email,
                id: user._id,
            },
            token,
        });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.loginController = loginController;
const googleAuthController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = req.body;
    if (!email) {
        return res.status(400).json({ error: "email is requried!" });
    }
    try {
        let user = yield User_1.default.findOne({
            email,
        });
        if (!user) {
            return res.status(404).json({ user: "User not found!" });
        }
        if (!user.isVerified) {
            return res.status(404).json({ user: "Please verify your account" });
        }
        const token = yield (0, auth_1.generateJwtToken)(user);
        yield User_1.default.findByIdAndUpdate(user._id, Object.assign({}, user), {
            new: true,
        });
        return res.json({
            user: {
                name: user.name,
                email: user.email,
                id: user._id,
            },
            token,
        });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.googleAuthController = googleAuthController;
const googleRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = req.body;
    if (!email) {
        return res.status(400).json({ error: "email is requried!" });
    }
    try {
        let user = yield User_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // Create new user
        user = new User_1.default({
            name,
            email,
            auth_provider: "google",
        });
        // Generate verification token
        user.verificationToken = crypto_1.default.randomBytes(20).toString("hex");
        yield user.save();
        yield (0, exports.sendVerificationEmail)(user.email, user.verificationToken, name);
        res
            .status(201)
            .json({ message: "User registered, verification email sent" });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.googleRegisterController = googleRegisterController;
const userVerify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user.id);
        if (!user)
            return res
                .status(404)
                .json({ success: false, message: "The user is not exists" });
        const newToken = yield (0, auth_1.generateJwtToken)(user);
        yield user.updateOne({ lastLoginTime: new Date() });
        return res.json({
            user: {
                name: user.name,
                email: user.email,
                id: user._id,
            },
            token: newToken,
        });
    }
    catch (err) {
        console.error("--- user verification error ---", err);
        return res.status(500).json({
            success: false,
            message: "The token is unavailable",
        });
    }
});
exports.userVerify = userVerify;
const sendVerificationEmail = (email, token, name) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    mail_1.default.setApiKey((_a = process.env.SENDGRID_API) !== null && _a !== void 0 ? _a : "");
    const verificationUrl = `http://galambo.com/verify/${token}`;
    const msg = {
        to: email,
        from: "no-reply@galambo.com",
        subject: "Email Verification",
        text: `Please verify your email by clicking the following link: ${verificationUrl}`,
        html: `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
    @media screen and (max-width: 425px) {
      .responsive-button {
        width: 95% !important;
      }
      .container {
        padding: 15px !important;
      }
    }
  </style>
</head>

<body style="margin: 0; padding: 0; font-family: 'Montserrat', sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; padding: 20px;">
    <tr>
      <td style="padding: 20px; border-radius: 8px; background-color: #ffffff;">
        <p style="font-size: 13px;">Hi ${name},</p>
        <p style="font-size: 13px; margin-top: 20px;">Welcome to Galambo!</p>
        <p style="font-size: 13px; margin-top: 20px;">Thank you for joining our community. To get started and unlock all the amazing features we offer, please activate your account by clicking the button below:</p>
        
        <!-- Align button to the left -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 20px;">
          <tr>
            <td style="text-align: left;">
              <a href="${verificationUrl}" target="_blank" style="display: inline-block; text-decoration: none;">
                <img src="https://galambo.com/Activate.png" alt="btn" width="101" height="35">
              </a>
            </td>
          </tr>
        </table>

        <p style="font-size: 13px; margin-top: 20px;">If the button above doesn't work, copy and paste the following link into your browser:</p>
        <p style="font-size: 13px; margin-top: 10px;"><a href="${verificationUrl}" target="_blank" style="color: black; text-decoration: none;">${verificationUrl}</a></p>
        
        <p style="font-size: 13px; margin-top: 20px;">Best regards,</p>
        <p style="font-size: 13px;">The Galambo Team</p>
        
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 40px;">
          <tr>
            <td width="114">
              <img src="https://galambo.com/email_logo.png" width="114" height="114" alt="Galambo Logo">
            </td>
            <td style="padding-left: 30px;">
              <img src="https://galambo.com/frame.png" width="117" height="20" alt="Frame">
              <div style="margin-top: 10px;display:-webkit-flex; align-items:center;">
                <img src="https://galambo.com/title.png" width="70" height="11" alt="Title">
                <div style="margin-left: 10px;">
                  <p style="font-size: 6px; margin: 0;">See the</p>
                  <p style="font-size: 6px; margin: 0;">World Differently</p>
                </div>
              </div>
              <hr style="border: none; height: 1px; background-color: #24A7DB; width: 127px; margin-top: 10px; margin-left: 0;">
              <div style="margin-top: 10px; display:-webkit-flex; align-items:center;">
                <img src="https://galambo.com/msg.png" width="17" height="17" alt="Message Icon">
                <p style="font-size: 9px; margin: 0; padding-left: 10px; display: inline-block;">info@galambo.com</p>
              </div>
              <div style="margin-top: 4px; display:-webkit-flex; align-items:center;">
                <img src="https://galambo.com/lock.png" width="17" height="17" alt="Lock Icon">
				
				<a href="https://galambo.com/privacy" target="_blank" style="display: inline-block; text-decoration: none;">
                	<p style="font-size: 9px; margin: 0; padding-left: 10px; display: inline-block;">Privacy Policy Link</p>
				</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</body>

</html>`,
    };
    yield mail_1.default.send(msg);
});
exports.sendVerificationEmail = sendVerificationEmail;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({
            verificationToken: req.params.token,
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid token" });
        }
        user.isVerified = true;
        user.verificationToken = null;
        yield user.save();
        res.status(200).json({ message: "User verified successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.verifyUser = verifyUser;
const resendUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.isVerified) {
            return res.status(400).json({ message: "User is already verified" });
        }
        // Generate a new verification token
        user.verificationToken = crypto_1.default.randomBytes(20).toString("hex");
        yield user.save();
        yield (0, exports.sendVerificationEmail)(user.email, user.verificationToken, user.name);
        res.status(200).json({ message: "Verification email resent" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.resendUser = resendUser;
