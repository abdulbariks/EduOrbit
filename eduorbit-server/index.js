const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
// const connectDB = require('./config/db');
// const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

dotenv.config();
// connectDB();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

// Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/classes', require('./routes/classRoutes'));
// app.use('/api/transactions', require('./routes/transactionRoutes'));
// app.use('/api/planner', require('./routes/plannerRoutes'));
// app.use('/api/questions', require('./routes/questionRoutes'));

// health
app.get("/", (req, res) => res.json({ ok: true, time: new Date() }));

// Error handlers
// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
