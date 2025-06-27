const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();
require("./config/passport"); // Google OAuth config

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Routes
const blog = require("./routes/blog");
const userRoutes = require("./routes/user");
app.use("/api/v1", blog);
app.use("/api/users", userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`App is started at Port no ${PORT}`);
});

app.get("/", (req, res) => {
    res.send(`<h1>This is my homePage baby</h1>`);
});