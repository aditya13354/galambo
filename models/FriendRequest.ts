import mongoose from "mongoose";

const FriendRequestSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  timestamp: { type: Date, default: Date.now },
});

const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);
export default FriendRequest;
