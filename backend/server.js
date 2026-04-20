const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Required Environment Variables Check
const requiredEnvs = ['MONGODB_URI', 'EMAIL_SERVER_USER', 'EMAIL_SERVER_PASSWORD', 'EMAIL_SERVER_HOST', 'EMAIL_SERVER_PORT'];
const missingEnvs = requiredEnvs.filter(env => !process.env[env]);

if (missingEnvs.length > 0) {
    console.error(`CRITICAL: Missing environment variables: ${missingEnvs.join(', ')}`);
}

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Enhanced CORS Configuration
const allowedOrigins = [
    'http://localhost:3000',
    'https://knowledge-sharing-platform-chi.vercel.app',
    /^https:\/\/knowledge-sharing-platform-.*-projects\.vercel\.app$/ // Matches Vercel previews
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.some(o => typeof o === 'string' ? o === origin : o.test(origin))) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Relax Helmet for API use
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(morgan('dev'));

// Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

app.get('/', (req, res) => {
    res.send('SolveHub API is running (v1.0.1)...');
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');
const problemRoutes = require('./routes/problemRoutes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/problems', problemRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
