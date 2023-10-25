import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

//Pulling port from .env file
const port = process.env.PORT || 5001;

connectDB(); //Connecting to MongoDB

const app = express();

//Home route
app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

//Listening to port
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});