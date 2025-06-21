import "express-async-errors";
import "dotenv/config";
import fileUpload from "express-fileupload";
import express from "express";
import connectDB from "../db/connect.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/routes/index.js";
import userRoutes from "./modules/users/routes/index.js";
import productRoutes from "./modules/products/routes/index.js";
import reviewRoutes from "./modules/reviews/routes/index.js";
import orderRoutes from "./modules/orders/routes/index.js";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import xss from "xss-clean";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";

const port = process.env.PORT || 5000;

const app = express();

app.set("trust proxy", 1);
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 60,
}));
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("E-Commerce API");
});

app.get("/api/v1", (req, res) => {
  console.log(req.signedCookies);
  res.send("E-Commerce API");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/orders", orderRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
