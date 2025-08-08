import express from "express"
import { deleteProduct, getAllProductCategory, getAllProducts, getProductsByCategory, getProductDetails, saveProductInBulk } from "../controllers/product.controller";
import { authenticateUser } from "../../middleware/auth.middleware";
import errorHandler from "../../handler/error.handler";
import { addCommentAndRating, deleteReviewAndRating, getAllProdectReviews, updateReviewAndRating } from "../controllers/reviews.controller";

const router = express.Router();

router.post("/save-in-bulk", authenticateUser, saveProductInBulk, errorHandler);
router.get("/list", authenticateUser, getAllProducts, errorHandler);
router.delete("/:id", authenticateUser, deleteProduct);
router.get("/:id", authenticateUser, getProductDetails);
router.get("/categories/list", authenticateUser, getAllProductCategory, errorHandler);
router.get("/:category/product", authenticateUser, getProductsByCategory, errorHandler);
// REVIEWS AND RATINGS
router.post("/comment&review/:productId", authenticateUser, addCommentAndRating, errorHandler);
router.get("/all-review/:id", authenticateUser, getAllProdectReviews, errorHandler);
router.delete("/delete-review/:id", authenticateUser, deleteReviewAndRating, errorHandler);
router.put("/review/:id", authenticateUser, updateReviewAndRating, errorHandler);
export default router;