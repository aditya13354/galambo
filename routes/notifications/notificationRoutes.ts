import express from 'express';
import { getNotifications,markNotificationsAsRead } from '../../controller/chatController';

const router = express.Router();

// Route to fetch notifications for a user
router.get("/", getNotifications);

// Route to mark notifications as read
router.post("/read", markNotificationsAsRead);

export default router;
