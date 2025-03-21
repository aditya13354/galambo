"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../controller/userController");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
// Configure multer for file uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
// Route to search for users
router.get("/searches", userController_1.searchUsers);
// Route to update user profile (handles both bio and photo update)
router.put("/profile", upload.single("photo"), userController_1.updateProfile);
// Route to fetch user profile (get bio and photo)
router.get("/profile", userController_1.getUserProfile);
exports.default = router;
