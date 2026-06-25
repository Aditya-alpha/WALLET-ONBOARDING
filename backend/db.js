const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_URI.replace("<db_name>", "DUSHANT")
        );

        console.log("MongoDB connected");
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;