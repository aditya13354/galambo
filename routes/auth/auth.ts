import { Router } from "express";
import {
  googleAuthController,
  googleRegisterController,
  loginController,
  resendUser,
  signupController,
  userVerify,
  verifyUser,
} from "../../controller/authController";
import { auth } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/google", googleAuthController);
router.post("/google/register", googleRegisterController);
router.post("/login", loginController);
router.post("/signup", signupController);
router.get("/", auth, userVerify);
router.get("/verify/:token", verifyUser);
router.post("/resend-verification", resendUser);
export default router;
