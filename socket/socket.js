import { Server } from "socket.io";
import express from "express";
const app = express()
import http from 'http'

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ['https://snaptalk-delta.vercel.app', 'http://localhost:3000'],
        methods: ["GET", "POST"],
        credentials: true,
    }
})

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap = {}  //{userId : socketId}


io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    const userId = socket.handshake.query.userId;
    if (userId != 'undefined') {
        userSocketMap[userId] = socket.id
    }
    // io.emit() is used to send events to all the connnected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    // socket.on is used to listen to the events can be used both client and server side 
    socket.on("disconnect", (socket) => {
        console.log('user disconnected', socket.id);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })

})



export { app, io, server }
