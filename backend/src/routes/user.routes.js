import express from "express";
import { deleteUser, updateAvatar, updateUser, userProfile } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";


const router = express.Router();

router.use(protect);

router.get("/profile", userProfile);
router.patch("/profile", updateUser);
router.patch("/avatar", updateAvatar);
router.delete("/account", deleteUser);

export default router;