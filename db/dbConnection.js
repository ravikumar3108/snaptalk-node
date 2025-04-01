import mongoose from "mongoose";
mongoose.set('strictQuery', true);

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://raviluhaniwal318:ZElVoJDwr5XJvdMz@cluster0.us8usk1.mongodb.net/chatapp', {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 60000,    // 60s to select server
            socketTimeoutMS: 120000,            // 120s before closing sockets
            connectTimeoutMS: 120000,           // 120s to establish connection
            bufferCommands: true,  
            autoIndex: true,
        }); 
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        throw error; 
    }
}

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
});

connectDB().then(async () => {
}).catch(err => console.error("Initial DB connection failed:", err));

export default connectDB;