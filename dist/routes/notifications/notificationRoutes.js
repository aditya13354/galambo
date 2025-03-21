"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../../controller/chatController");
const router = express_1.default.Router();
// Route to fetch notifications for a user
router.get("/", chatController_1.getNotifications);
// Route to mark notifications as read
router.post("/read", chatController_1.markNotificationsAsRead);
exports.default = router;
