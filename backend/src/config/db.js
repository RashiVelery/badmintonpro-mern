const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        // Mongo_uri from .env ---
        const connect = await mongoose.connect(process.env.MONGO_URI);
        // console Database connection ---
        console.log(`MongoDb connected: ${connect.connection.host}`);
    } catch (error) {
        // Error ---
        console.error('MongoDb connection failed', error.message);
        process.exit(1);
    }
}


module.exports = connectDB;