import { Request, Response } from "express";
import Message from "../models/Message";
import ChatList from "../models/ChatList";
import Notification from "../models/Notifications";
import User from "../models/User";
import FriendRequest from "../models/FriendRequest";
import { users } from "../src";
import mongoose from "mongoose";
// Controller to create or retrieve messages between users
export const getMessages = async (req: Request, res: Response) => {
  const { from, to } = req.query;
  try {
    const messages = await Message.find({
      $or: [
        { from, to },
        { from: to, to: from },
      ],
    }).sort({ timestamp: 1 }); // Ensure messages are sorted by timestamp
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve messages" });
  }
};

// Save a message and send a notification
export const saveMessage = async (req: Request, res: Response) => {
  const { from, to, message, image } = req.body;

  // Ensure at least one of `message` or `image` is provided
  if (!from || !to || (!message && !image)) {
    return res.status(400).json({
      error:
        "Missing required fields: 'from', 'to', and at least 'message' or 'image'",
    });
  }

  try {
    // Fetch sender's information (name and photo)
    const sender = await User.findById(from).select("name photo");
    if (!sender) {
      return res.status(404).json({ error: "Sender not found" });
    }

    // Save the message to MongoDB
    const newMessage = new Message({
      from,
      to,
      message: message || "", // Default to an empty string if no message
      image: image || null, // Set image if provided
      timestamp: new Date(),
    });
    await newMessage.save();

    // Save a notification for the recipient
    const notification = new Notification({
      userId: to, // The recipient
      message: message ? `sent you a message: ${message}` : "sent you an image", // Customize notification for images
      senderName: sender.name, // Include sender's name
      senderPhoto: sender.photo, // Include sender's photo
    });
    await notification.save();

    // Retrieve the recipient's WebSocket connection
    const recipientSocket = users[to];

    if (recipientSocket) {
      // Send the message and notification together to the recipient
      recipientSocket.send(
        JSON.stringify({
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
        })
      );
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Could not save message" });
  }
};

export const getNotifications = async (req: Request, res: Response) => {
  const { userId } = req.query; // This is the current user's ID (the recipient of the notification)

  try {
    // Fetch notifications for the current user
    const notifications = await Notification.find({ userId }).sort({
      date: -1,
    }); // Sort notifications by date in descending order

    // Process notifications and include the sender's details
    const notificationsWithSenderInfo = notifications.map((notification) => {
      return {
        ...notification.toObject(),
        senderName: notification.senderName, // Sender's name
        senderPhoto: notification.senderPhoto, // Sender's photo
      };
    });

    res.json(notificationsWithSenderInfo); // Send the populated notifications with sender's info
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Could not retrieve notifications" });
  }
};

// Mark notifications as read
export const markNotificationsAsRead = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    await Notification.updateMany(
      { userId, isRead: false },
      { $set: { isRead: true } }
    );
    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({ error: "Could not mark notifications as read" });
  }
};

// Controller to add a new chat between users
export const addChat = async (req: Request, res: Response) => {
  const { userId1, userId2 } = req.body;

  try {
    // Create or find chat for user pair, ensuring it’s unique
    const chat = await ChatList.findOneAndUpdate(
      { userId: userId1, chatWith: userId2 },
      { userId: userId1, chatWith: userId2 },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Optional: Check reverse pairing if your UI might need it
    await ChatList.findOneAndUpdate(
      { userId: userId2, chatWith: userId1 },
      { userId: userId2, chatWith: userId1 },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: "Could not create or update chat entry" });
  }
};

export const getChatList = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const chatList = await FriendRequest.find({
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retrieve chat list" });
  }
};

//friends
export const sendFriendRequest = async (req: Request, res: Response) => {
  const { from, to } = req.body;

  if (!from || !to) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existingRequest = await FriendRequest.findOne({
      from,
      to,
      status: "pending",
    });
    if (existingRequest) {
      return res.status(400).json({ error: "Friend request already sent" });
    }

    const friendRequest = new FriendRequest({ from, to, status: "pending" });
    await friendRequest.save();

    const sender = await User.findById(from).select("name photo");
    if (!sender) {
      return res.status(404).json({ error: "Sender not found" });
    }
    const notification = new Notification({
      userId: to,
      message: `<b>@${sender.name}</b> has sent you a friend request`,
      senderName: sender.name,
      senderPhoto: sender.photo,
    });
    await notification.save();

    res.status(201).json({ message: "Friend request sent" });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res.status(500).json({ error: "Could not send friend request" });
  }
};

export const respondToFriendRequest = async (req: Request, res: Response) => {
  const { id, status } = req.body;

  // Validate input
  if (!id || !status) {
    return res
      .status(400)
      .json({ error: "Missing required fields: 'id', or 'status'" });
  }

  try {
    // Find the friend request by `from` and `to`
    const request = await FriendRequest.findById(id);

    if (!request) {
      return res.status(404).json({ error: "Friend request not found" });
    }

    if (status === "accepted") {
      // Update the status to "accepted"
      request.status = "accepted";
      await request.save();

      // Create a chat entry between the users
      // await addChatDirectly(from, to);

      const user1 = await User.findById(request.from).select("name photo");
      if (!user1) {
        return res.status(404).json({ error: "User not found" });
      }

      const user2 = await User.findById(request.to).select("name photo");
      if (!user2) {
        return res.status(404).json({ error: "User not found" });
      }

      const notification1 = new Notification({
        userId: request.to,
        message: `You and <b>@${user1.name}</b> are now friends`,
        senderName: user1.name,
        senderPhoto: user1.photo,
      });
      await notification1.save();
      const notification2 = new Notification({
        userId: request.from,
        message: `You and <b>@${user2.name}</b> are now friends`,
        senderName: user2.name,
        senderPhoto: user2.photo,
      });
      await notification2.save();

      res
        .status(200)
        .json({ message: "Friend request accepted, chat created" });
    } else if (status === "rejected") {
      // Update the status to "rejected"
      request.status = "rejected";
      await request.save();

      res.status(200).json({ message: "Friend request rejected" });
    } else {
      return res.status(400).json({ error: "Invalid status" });
    }
  } catch (error) {
    console.error("Error responding to friend request:", error);
    res.status(500).json({ error: "Could not respond to friend request" });
  }
};

// Helper function to directly add a chat
const addChatDirectly = async (userId1: string, userId2: string) => {
  try {
    // Ensure both directions are added
    await Promise.all([
      ChatList.findOneAndUpdate(
        { userId: userId1, chatWith: userId2 },
        { userId: userId1, chatWith: userId2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ),
      ChatList.findOneAndUpdate(
        { userId: userId2, chatWith: userId1 },
        { userId: userId2, chatWith: userId1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ),
    ]);
  } catch (error) {
    console.error("Error creating chat:", error);
    throw new Error("Could not create chat");
  }
};
