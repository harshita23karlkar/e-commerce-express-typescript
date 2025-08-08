import express from "express"
import { signInUser, signUp } from "../controllers/auth.controller";
import { upload } from "../../middleware/multer";
import errorHandler from "../../handler/error.handler";

const router = express.Router();
console.log("inside route")
router.post("/signup", upload.single("profileImage"), signUp, errorHandler);
router.post("/login", signInUser, errorHandler)

export default router;