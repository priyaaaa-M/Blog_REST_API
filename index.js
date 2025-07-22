const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const xss = require("xss-clean");
require("dotenv").config();
require("./config/passport"); // Google OAuth config

const app = express();
const PORT = process.env.PORT || 3000;


// Security Middlewares


// 1. CORS Configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || [
    'http://localhost:3000', // React dev server
    'http://localhost:5173'  // Vite dev server
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

// 2. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // limit each IP to 500 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// 3. Other Security Middlewares
app.use(helmet()); 
app.use(mongoSanitize()); 
app.use(hpp()); 
app.use(xss()); 


// Standard Middlewares

app.use(express.json({ limit: '10kb' })); // Body limit
app.use(passport.initialize());


// Database Connection 

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
    res.send(`<h1>This is my homePage </h1>`);
});
