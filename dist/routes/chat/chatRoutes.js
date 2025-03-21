"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../../controller/chatController");
const router = express_1.default.Router();
router.post("/friend-request", chatController_1.sendFriendRequest);
router.post("/friend-respond", chatController_1.respondToFriendRequest);
router.get('/messages', chatController_1.getMessages);
router.post('/message/save', chatController_1.saveMessage);
router.get('/chatlist/:userId', chatController_1.getChatList);
exports.default = router;
