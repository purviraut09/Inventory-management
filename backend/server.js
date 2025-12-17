const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); // ← THIS LINE IS CRITICAL
const authRoutes = require("./routes/authRoutes");


dotenv.config();

// 👇 THIS LINE MUST BE PRESENT
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("UniBeauty Backend Server is Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
