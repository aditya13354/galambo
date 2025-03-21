import { Router } from "express";
import {
  searchUsers,
  updateProfile,
  getUserProfile,
} from "../../controller/userController";
import multer from "multer";

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "uploads");
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Route to search for users
router.get("/searches", searchUsers);

// Route to update user profile (handles both bio and photo update)
router.put("/profile", upload.single("photo"), updateProfile);
// Route to fetch user profile (get bio and photo)
router.get("/profile", getUserProfile);

export default router;
