import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // The recipient of the notification
    message: String,  // The notification message
    date: { type: Date, default: Date.now },
    senderName: String,  // The sender's name
    senderPhoto: String,  // The sender's photo
    isRead: { type: Boolean, default: false }
  });

  

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
