const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const matchRoutes = require('./routes/matchRoutes');
const chatRoutes = require('./routes/chatRoutes');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger'); // Make sure path is correct





// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/matches', matchRoutes);
// app.use('/api/chat', chatRoutes);
// After all middlewares and before routes


app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Health check
app.get('/', (req, res) => {
  res.status(200).send('🌈 LGBTQ+ Matrimony API is running!');
});

// Global error handler
//app.use(errorHandler);

module.exports = app;