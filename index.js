import express from 'express'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js"
import messageRoute from './routes/messageRoutes.js'
import userRoute from "./routes/usersRoutes.js"
import { connectToMongodb } from './db/dbConnection.js';
// cookie parser is install to get token to cookies 
import { app, server } from './socket/socket.js';


const PORT = process.env.PORT || 8000;
// const app = express()

const corsOptions = {
  origin: "https://snaptalk-delta.vercel.app", // Allow only your frontend
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // If using cookies or authentication
}

app.use(cors(corsOptions))
dotenv.config()

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.json({ message: "GET", status: true })
})

server.listen(PORT, () => {
  connectToMongodb()
  console.log(`Server is running on ${PORT}`)
})