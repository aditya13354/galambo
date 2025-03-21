"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    auth_provider: {
        type: String,
        enum: ["jwt", "google"],
        default: "jwt",
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    photo: { type: String, default: "" }, // New field for the profile image
    bio: { type: String, default: "" }, // New field for the bio
});
exports.default = UserSchema;
