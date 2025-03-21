"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const ws_1 = require("ws");
// Import your routers
const auth_1 = __importDefault(require("../routes/auth/auth"));
const manage_1 = __importDefault(require("../routes/user/manage"));
const openai_1 = __importDefault(require("../routes/openai/openai"));
const userRoutes_1 = __importDefault(require("../routes/user/userRoutes"));
const chatRoutes_1 = __importDefault(require("../routes/chat/chatRoutes"));
const notificationRoutes_1 = __importDefault(require("../routes/notifications/notificationRoutes"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
// Initialize environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
// Middleware setup
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "10mb" })); // Adjust limit as needed
app.use(express_1.default.urlencoded({ limit: "10mb", extended: true }));
// Define API routes
app.use("/api", openai_1.default);
app.use("/auth", auth_1.default);
app.use("/manage", manage_1.default);
app.use("/users", auth_middleware_1.auth, userRoutes_1.default);
app.use("/chat", auth_middleware_1.auth, chatRoutes_1.default);
app.use("/notifications", auth_middleware_1.auth, notificationRoutes_1.default); // Fixed: Uses `chatRouter` instead of `userRouter`
// Connect to MongoDB
mongoose_1.default
    .connect(process.env.MONGO_URI || "")
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => {
    console.error(`MongoDB Connection Error! :=> ${err}`);
    process.exit();
});
// Middleware setup to serve uploads folder
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// Serve static files in production
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "../client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../client/build/index.html"));
    });
    app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
}
// Create HTTP server and integrate WebSocket server
const server = (0, http_1.createServer)(app);
const wss = new ws_1.WebSocketServer({ server });
// Store WebSocket connections for each user
// Store WebSocket connections for each user
exports.users = {};
wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        const data = JSON.parse(message);
        if (data.type === "init") {
            const userId = data.userId;
            // Associate userId with this WebSocket connection
            exports.users[userId] = ws;
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
        for (const userId in exports.users) {
            if (exports.users[userId] === ws) {
                delete exports.users[userId];
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
exports.default = app;
