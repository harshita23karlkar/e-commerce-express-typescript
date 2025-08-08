import express from 'express';
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'
import { BASE_URL } from './helper/ip.helper';
import productRouter from "./routes/products.routes"
import cartRouter from './routes/cart.routes'
import orderRouter from "./routes/orders.routes"
import cors from 'cors';

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "http://192.168.100.176:5173"
];
app.use(cors());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("inside index")
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter)
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.listen(3000, () => {
    console.log(`Server is running on ${BASE_URL}`);
});


export default app;

// npm run dev
// npm start
// npm run start
// npm run build
//  "dev": "tsc -w & nodemon dist/index.js",