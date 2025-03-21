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
exports.getUserProfile = exports.updateProfile = exports.searchUsers = void 0;
const User_1 = __importDefault(require("../models/User")); // Assuming a User model is set up
// Controller function to handle search
const searchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    console.log(req.user);
    try {
        // Build the query object to search by full name, case-insensitive
        const searchQuery = query
            ? { name: { $regex: query, $options: "i" }, _id: { $ne: req.user.id } } // Case-insensitive search by full name
            : { _id: { $ne: req.user.id } }; // If no query, return all users
        // Fetch users based on the search query or all users sorted alphabetically
        const users = yield User_1.default.find(searchQuery)
            .sort({ name: 1 }) // Sort by full name in ascending order
            .limit(10); // Limit results for performance (adjust this as needed)
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});
exports.searchUsers = searchUsers;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bio, userId } = req.body; // Make sure userId is passed from the frontend
        const photo = req.file ? `/uploads/${req.file.filename}` : null;
        if (!userId) {
            return res.status(401).json({ message: "User ID not provided" }); // Unauthorized if no userId
        }
        // Find the user and update bio and photo
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (bio)
            user.bio = bio;
        if (photo)
            user.photo = photo;
        yield user.save();
        res.status(200).json({
            message: "Profile updated successfully",
            bio: user.bio,
            photo: user.photo,
        });
    }
    catch (error) {
        console.error("Error updating profile:", error);
        res
            .status(500)
            .json({ message: "Error updating profile", error: error.message });
    }
});
exports.updateProfile = updateProfile;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res
                .status(401)
                .json({ message: "Unauthorized: User ID not provided" });
        }
        // Fetch the user profile from the database
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Return profile data with a fallback for photo
        res.status(200).json({
            bio: user.bio,
            photo: user.photo,
        });
    }
    catch (error) {
        console.error("Error fetching profile:", error);
        res
            .status(500)
            .json({ message: "Error fetching profile", error: error.message });
    }
});
exports.getUserProfile = getUserProfile;
