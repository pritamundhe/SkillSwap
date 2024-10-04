import express from 'express';
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
require('dotenv').config();

const app = express();

connectDB(); 

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/resource', resourceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
