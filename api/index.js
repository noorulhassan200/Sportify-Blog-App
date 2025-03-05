import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit if cannot connect to database
  });
  
const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL in development
  credentials: true
}));

app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});

app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  console.log('Error occurred:', err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});