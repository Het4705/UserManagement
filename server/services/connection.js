const mongoose = require('mongoose');

async function connectMongoDB(URL) {
    try {
    
        
        console.log("Waiting for MongoDB Connection");
        const connection = await mongoose.connect(URL);

        console.log("Connected to MongoDB");
        return connection;
    } catch (error) {
        console.error("Failed to connect to MongoDB:");
        throw error; 
    }
}

module.exports = {connectMongoDB};
