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
exports.respondToFriendRequest = exports.sendFriendRequest = exports.getChatList = exports.addChat = exports.markNotificationsAsRead = exports.getNotifications = exports.saveMessage = exports.getMessages = void 0;
const Message_1 = __importDefault(require("../models/Message"));
const ChatList_1 = __importDefault(require("../models/ChatList"));
const Notifications_1 = __importDefault(require("../models/Notifications"));
const User_1 = __importDefault(require("../models/User"));
const FriendRequest_1 = __importDefault(require("../models/FriendRequest"));
const src_1 = require("../src");
// Controller to create or retrieve messages between users
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to } = req.query;
    try {
        const messages = yield Message_1.default.find({
            $or: [
                { from, to },
                { from: to, to: from },
            ],
        }).sort({ timestamp: 1 }); // Ensure messages are sorted by timestamp
        res.json(messages);
    }
    catch (error) {
        res.status(500).json({ error: "Could not retrieve messages" });
    }
});
exports.getMessages = getMessages;
// Save a message and send a notification
const saveMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to, message, image } = req.body;
    // Ensure at least one of `message` or `image` is provided
    if (!from || !to || (!message && !image)) {
        return res.status(400).json({
            error: "Missing required fields: 'from', 'to', and at least 'message' or 'image'",
        });
    }
    try {
        // Fetch sender's information (name and photo)
        const sender = yield User_1.default.findById(from).select("name photo");
        if (!sender) {
            return res.status(404).json({ error: "Sender not found" });
        }
        // Save the message to MongoDB
        const newMessage = new Message_1.default({
            from,
            to,
            message: message || "", // Default to an empty string if no message
            image: image || null, // Set image if provided
            timestamp: new Date(),
        });
        yield newMessage.save();
        // Save a notification for the recipient
        const notification = new Notifications_1.default({
            userId: to, // The recipient
            message: message ? `sent you a message: ${message}` : "sent you an image", // Customize notification for images
            senderName: sender.name, // Include sender's name
            senderPhoto: sender.photo, // Include sender's photo
        });
        yield notification.save();
        // Retrieve the recipient's WebSocket connection
        const recipientSocket = src_1.users[to];
        if (recipientSocket) {
            // Send the message and notification together to the recipient
            recipientSocket.send(JSON.stringify({
                type: "message",
                from,
                message,
                image,
                notification: {
                    type: "notification",
                    message: notification.message,
                    senderName: notification.senderName,
                    senderPhoto: notification.senderPhoto,
                },
                timestamp: new Date(),
            }));
        }
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({ error: "Could not save message" });
    }
});
exports.saveMessage = saveMessage;
const getNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query; // This is the current user's ID (the recipient of the notification)
    try {
        // Fetch notifications for the current user
        const notifications = yield Notifications_1.default.find({ userId }).sort({
            date: -1,
        }); // Sort notifications by date in descending order
        // Process notifications and include the sender's details
        const notificationsWithSenderInfo = notifications.map((notification) => {
            return Object.assign(Object.assign({}, notification.toObject()), { senderName: notification.senderName, senderPhoto: notification.senderPhoto });
        });
        res.json(notificationsWithSenderInfo); // Send the populated notifications with sender's info
    }
    catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ error: "Could not retrieve notifications" });
    }
});
exports.getNotifications = getNotifications;
// Mark notifications as read
const markNotificationsAsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        yield Notifications_1.default.updateMany({ userId, isRead: false }, { $set: { isRead: true } });
        res.status(200).json({ message: "Notifications marked as read" });
    }
    catch (error) {
        console.error("Error marking notifications as read:", error);
        res.status(500).json({ error: "Could not mark notifications as read" });
    }
});
exports.markNotificationsAsRead = markNotificationsAsRead;
// Controller to add a new chat between users
const addChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId1, userId2 } = req.body;
    try {
        // Create or find chat for user pair, ensuring it’s unique
        const chat = yield ChatList_1.default.findOneAndUpdate({ userId: userId1, chatWith: userId2 }, { userId: userId1, chatWith: userId2 }, { upsert: true, new: true, setDefaultsOnInsert: true });
        // Optional: Check reverse pairing if your UI might need it
        yield ChatList_1.default.findOneAndUpdate({ userId: userId2, chatWith: userId1 }, { userId: userId2, chatWith: userId1 }, { upsert: true, new: true, setDefaultsOnInsert: true });
        res.status(201).json(chat);
    }
    catch (error) {
        res.status(500).json({ error: "Could not create or update chat entry" });
    }
});
exports.addChat = addChat;
const getChatList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const chatList = yield FriendRequest_1.default.find({
            $or: [
                {
                    $or: [{ from: userId }, { to: userId }],
                    status: "accepted",
                },
                {
                    to: userId,
                    status: "pending",
                },
            ],
        })
            .populate("from", "name photo")
            .populate("to", "name photo");
        if (!chatList || chatList.length === 0) {
            return res
                .status(404)
                .json({ error: "No chat list found for this user." });
        }
        res.json(chatList);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not retrieve chat list" });
    }
});
exports.getChatList = getChatList;
//friends
const sendFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to } = req.body;
    if (!from || !to) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const existingRequest = yield FriendRequest_1.default.findOne({
            from,
            to,
            status: "pending",
        });
        if (existingRequest) {
            return res.status(400).json({ error: "Friend request already sent" });
        }
        const friendRequest = new FriendRequest_1.default({ from, to, status: "pending" });
        yield friendRequest.save();
        const sender = yield User_1.default.findById(from).select("name photo");
        if (!sender) {
            return res.status(404).json({ error: "Sender not found" });
        }
        const notification = new Notifications_1.default({
            userId: to,
            message: `<b>@${sender.name}</b> has sent you a friend request`,
            senderName: sender.name,
            senderPhoto: sender.photo,
        });
        yield notification.save();
        res.status(201).json({ message: "Friend request sent" });
    }
    catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ error: "Could not send friend request" });
    }
});
exports.sendFriendRequest = sendFriendRequest;
const respondToFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, status } = req.body;
    // Validate input
    if (!id || !status) {
        return res
            .status(400)
            .json({ error: "Missing required fields: 'id', or 'status'" });
    }
    try {
        // Find the friend request by `from` and `to`
        const request = yield FriendRequest_1.default.findById(id);
        if (!request) {
            return res.status(404).json({ error: "Friend request not found" });
        }
        if (status === "accepted") {
            // Update the status to "accepted"
            request.status = "accepted";
            yield request.save();
            // Create a chat entry between the users
            // await addChatDirectly(from, to);
            const user1 = yield User_1.default.findById(request.from).select("name photo");
            if (!user1) {
                return res.status(404).json({ error: "User not found" });
            }
            const user2 = yield User_1.default.findById(request.to).select("name photo");
            if (!user2) {
                return res.status(404).json({ error: "User not found" });
            }
            const notification1 = new Notifications_1.default({
                userId: request.to,
                message: `You and <b>@${user1.name}</b> are now friends`,
                senderName: user1.name,
                senderPhoto: user1.photo,
            });
            yield notification1.save();
            const notification2 = new Notifications_1.default({
                userId: request.from,
                message: `You and <b>@${user2.name}</b> are now friends`,
                senderName: user2.name,
                senderPhoto: user2.photo,
            });
            yield notification2.save();
            res
                .status(200)
                .json({ message: "Friend request accepted, chat created" });
        }
        else if (status === "rejected") {
            // Update the status to "rejected"
            request.status = "rejected";
            yield request.save();
            res.status(200).json({ message: "Friend request rejected" });
        }
        else {
            return res.status(400).json({ error: "Invalid status" });
        }
    }
    catch (error) {
        console.error("Error responding to friend request:", error);
        res.status(500).json({ error: "Could not respond to friend request" });
    }
});
exports.respondToFriendRequest = respondToFriendRequest;
// Helper function to directly add a chat
const addChatDirectly = (userId1, userId2) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ensure both directions are added
        yield Promise.all([
            ChatList_1.default.findOneAndUpdate({ userId: userId1, chatWith: userId2 }, { userId: userId1, chatWith: userId2 }, { upsert: true, new: true, setDefaultsOnInsert: true }),
            ChatList_1.default.findOneAndUpdate({ userId: userId2, chatWith: userId1 }, { userId: userId2, chatWith: userId1 }, { upsert: true, new: true, setDefaultsOnInsert: true }),
        ]);
    }
    catch (error) {
        console.error("Error creating chat:", error);
        throw new Error("Could not create chat");
    }
});
