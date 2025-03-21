import { Request } from "express";
import { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  auth_provider: "jwt" | "google";
  comparePassword(_passcode: string): Promise<boolean>;
  isVerified: boolean;
  verificationToken: string;
  photo?: string; // Add this field to store the image URL or path
  bio?: string;   // Add this field to store the bio
}

export interface IUserRequest extends Request {
  user?: any;
}

const UserSchema = new Schema({
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
  bio: { type: String, default: "" },   // New field for the bio
});

export default UserSchema;
