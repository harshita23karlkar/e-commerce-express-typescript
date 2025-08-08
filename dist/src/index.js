"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const ip_helper_1 = require("./helper/ip.helper");
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const orders_routes_1 = __importDefault(require("./routes/orders.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
console.log("inside index");
app.use("/api/auth", auth_routes_1.default);
app.use("/api/user", user_routes_1.default);
app.use("/api/products", products_routes_1.default);
app.use("/api/cart", cart_routes_1.default);
app.use("/api/order", orders_routes_1.default);
app.listen(3000, () => {
    console.log(`Server is running on ${ip_helper_1.BASE_URL}`);
});
exports.default = app;
// npm run dev
// npm start
// npm run start
// npm run build
//  "dev": "tsc -w & nodemon dist/index.js",
