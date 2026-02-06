require('dotenv').config();
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes')
// require express ---
const express = require('express')
const app = express()

// Database ---
const connectDB = require('./src/config/db');
const cookieParser = require('cookie-parser');


// Connect database ---
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors())


app.use('/api/auth',authRoutes)

// Port from .env ---
const PORT = process.env.PORT;

// Start server ---
app.listen(PORT,()=>{
    console.log(`the server is running on http://localhost:${PORT}`)
})