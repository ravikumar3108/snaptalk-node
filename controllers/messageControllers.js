import Conversation from "../models/conversationModel.js"
import Message from "../models/messageModel.js"
import { getReceiverSocketId, io } from "../socket/socket.js"

export const sendMessage = async (req, res) => {

    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const { _id: senderId } = req.user

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if (newMessage) {
            conversation.message.push(newMessage._id)
        }
        // await conversation.save()
        // await newMessage.save()
        
        //  this will run both the parallel
        await Promise.all([conversation.save(), newMessage.save()])
        
        // SOCKET IO functionally
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            // io.to(<socket_id>).emit() is used to send events to a specific clients
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage)
        
    } catch (error) {
        console.log("Error in send message controller", error)
        res.status(400).json(error)
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const { _id: senderId } = req.user


        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("message")

        if (!conversation) { return res.status(200).json([]) }
        const messages = conversation.message
        res.status(201).json(messages)
        // console.log(conversation.message)

    } catch (error) {
        console.log("Error in get message controller", error)
        res.status(400).json(error)
    }
}

