import express from "express"
import { addToCart, decreaseProductQuantity, getUserCart, increaseProductQuantity } from "../controllers/cart.controller";
import errorHandler from "../../handler/error.handler";
import { authenticateUser } from "../../middleware/auth.middleware";

const router = express.Router();
router.get("/:userId", getUserCart, errorHandler);
router.post("/add-to-cart", authenticateUser, addToCart, errorHandler);
router.post("/product/increase", authenticateUser, increaseProductQuantity, errorHandler);
router.post("/product/decrease", authenticateUser, decreaseProductQuantity, errorHandler);
export default router;