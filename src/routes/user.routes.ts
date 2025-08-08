import express from "express"
import { deleteUSer, updateUserProfile } from "../controllers/user.controller";
import errorHandler from "../../handler/error.handler";
import { upload } from "../../middleware/multer";
import { authenticateUser } from "../../middleware/auth.middleware";

const router = express.Router();
router.put("/update/:id", authenticateUser, upload.single("profileImage"), updateUserProfile, errorHandler);
router.delete("/delete/:id", authenticateUser, deleteUSer, errorHandler);
export default router;