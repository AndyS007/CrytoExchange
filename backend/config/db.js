const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME
        });
        console.log(`Mongodb connected to ${conn.connection.host} successfully!`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;