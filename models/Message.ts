import mongoose, { Schema, Document } from "mongoose";

interface IMessage extends Document {
  from: mongoose.Schema.Types.ObjectId;
  to:  mongoose.Schema.Types.ObjectId;
  message?: string;
  image?: string; // Optional field for images
  timestamp?: Date; // Optional field for timestamps
}

const MessageSchema = new Schema<IMessage>({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, default: "" },
  image: { type: String, default: null },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model<IMessage>("Message", MessageSchema);
export default Message;
