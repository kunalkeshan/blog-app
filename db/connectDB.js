const mongoose = require("mongoose");
const connectionURL = process.env.DB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(connectionURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error);
    }
}

connectDB();