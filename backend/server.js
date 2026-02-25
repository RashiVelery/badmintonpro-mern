require('dotenv').config();
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const tournamentRoutes = require('./src/routes/tournamentRoutes');
const matchRoutes = require('./src/routes/matchRoutes');
const updateRoutes = require('./src/routes/updateRoutes');
const registrationRoutes = require('./src/routes/registrationRoutes')
const statRoutes = require('./src/routes/statRoutes')
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


app.use('/api/auth', authRoutes);
app.use('/api/tournament', tournamentRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/match', updateRoutes);
app.use('/api/registration', registrationRoutes)
app.use('/api/stats' , statRoutes)


// Port from .env ---
const PORT = process.env.PORT;

// Start server ---
app.listen(PORT, () => {
    console.log(`the server is running on http://localhost:${PORT}`)
})