import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

// middleware
app.use(express.json()); //this middleware will parse JSON body; req.body
app.use(rateLimiter);
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// simple custom middleware
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req url is ${req.url}`)
//     next();
// })

app.use("/api/notes", noteRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT: ", PORT);
  });
});
