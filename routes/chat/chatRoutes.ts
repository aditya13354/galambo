import express from 'express';
import { getMessages, saveMessage,addChat, getChatList,sendFriendRequest,respondToFriendRequest} from '../../controller/chatController';

const router = express.Router();

router.post("/friend-request", sendFriendRequest);
router.post("/friend-respond", respondToFriendRequest);
router.get('/messages', getMessages);
router.post('/message/save', saveMessage);
router.get('/chatlist/:userId', getChatList);

export default router;
