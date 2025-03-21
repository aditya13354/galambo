"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const notificationSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }, // The recipient of the notification
    message: String, // The notification message
    date: { type: Date, default: Date.now },
    senderName: String, // The sender's name
    senderPhoto: String, // The sender's photo
    isRead: { type: Boolean, default: false }
});
const Notification = mongoose_1.default.model("Notification", notificationSchema);
exports.default = Notification;
