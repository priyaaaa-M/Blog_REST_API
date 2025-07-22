import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './route/userRoutes.js';
import blogRouter from './route/blogsRoutes.js';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// =====================
// CORS Configuration
// =====================
const corsOptions = {
  origin: ['http://localhost:5173', 'https://your-production-frontend-url.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

// =====================
// Security Middlewares
// =====================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // limit each IP to 500 requestsper windowMs
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

// =====================
// Standard Middlewares
// =====================
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static('uploads'));

// =====================
// Routes
// =====================
app.use('/api/users', userRouter);
app.use('/api/blogs', blogRouter);

// =====================
// Health Check
// =====================
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Blog API is running',
    timestamp: new Date()
  });
});

// =====================
// Error Handling
// =====================
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

// =====================
// Server Initialization
// =====================
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

export default app;
