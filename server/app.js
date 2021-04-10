import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import postsRoutes from "./routes/postsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Greetings
app.get("/", (req, res) => {
  res.send("Hello to Gather API");
});

// Routes
app.use("/api/v1/posts", postsRoutes);
app.use("/api/v1/users", userRoutes);

export default app;
