import express, { Express } from "express";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";

// Import your routers
import authRouter from "../routes/auth/auth";
import manageRouter from "../routes/user/manage";
import searchRouter from "../routes/openai/openai";
import userRouter from "../routes/user/userRoutes";
import chatRouter from "../routes/chat/chatRoutes";
import notificationRouter from "../routes/notifications/notificationRoutes";
import { auth } from "../middlewares/auth.middleware";

// Initialize environment variables
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Adjust limit as needed
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Define API routes
app.use("/api", searchRouter);
app.use("/auth", authRouter);
app.use("/manage", manageRouter);
app.use("/users", auth, userRouter);
app.use("/chat", auth, chatRouter);
app.use("/notifications", auth, notificationRouter); // Fixed: Uses `chatRouter` instead of `userRouter`

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("MongoDB Connected!"))
  .catch((err: any) => {
    console.error(`MongoDB Connection Error! :=> ${err}`);
    process.exit();
  });
// Middleware setup to serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
  app.use(express.static(path.join(__dirname, "public")));
}

// Create HTTP server and integrate WebSocket server
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Store WebSocket connections for each user

// Store WebSocket connections for each user
export const users: { [userId: string]: WebSocket } = {};

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (message: string) => {
    const data = JSON.parse(message);

    if (data.type === "init") {
      const userId = data.userId;
      // Associate userId with this WebSocket connection
      users[userId] = ws;
    }

    // Other WebSocket message handling logic...
  });
  // ws.on("message", (message: string) => {
  //   try {
  //     const data = JSON.parse(message);

  //     // Register user connections
  //     if (data.type === "init" && data.userId) {
  //       // Ensure only one connection per user
  //       if (users[data.userId]) {
  //         users[data.userId].close();  // Close the old connection
  //       }
  //       users[data.userId] = ws;
  //       console.log(`User ${data.userId} connected`);
  //     }

  //     // Handle messages from one user to another
  //     if (data.from && data.to && data.message) {
  //       const recipientSocket = users[data.to];
  //       if (recipientSocket) {
  //         // Combine message and notification into one WebSocket message
  //         recipientSocket.send(JSON.stringify({
  //           type: "chat",
  //           from: data.from,
  //           message: data.message,
  //           notification: {
  //             type: "notification",
  //             message: `${data.from} sent you a message: ${data.message}`,
  //             senderName: data.senderName,  // Add sender's name
  //             senderPhoto: data.senderPhoto, // Add sender's photo
  //           },
  //           timestamp: new Date(),
  //         }));
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error processing message:", error);
  //   }
  // });

  ws.on("close", () => {
    for (const userId in users) {
      if (users[userId] === ws) {
        delete users[userId];
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

// Start the server with WebSocket support
server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
