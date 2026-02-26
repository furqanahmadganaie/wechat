import Conversation from "../models/conversation.modell.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId,io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        //sender id which us 
        const senderId = req.user._id  //for this we will be using middleware inside message route

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (!conversation) {
            const response = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [senderId, receiverId],
            });
            console.log(response);
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,

        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);

        }

        //these two line will not run parallel so we use promise 
        // await Conversation.save(); this takes 1 s 
        // await newMessage.save();  this needs to wait 1s
        //this will run in parallel

        await Promise.all([conversation.save(), newMessage.save()]);


        // socket io funcionality later to make it real time
        const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}


        res.status(201).json(newMessage);

    } catch (error) {
        console.log("error in sendmessage controller:", error.message)
        res.status(500).json({ error: "internal server errorr in sendmessage contoller" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id  //for this we willbe usinf middleware iside meesage route

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages")  //  not referance but actual messages insted of returing the id arry it return array of objects which contain messages

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("error in grtmessage  controller:", error.message)
        res.status(500).json({ error: "internal server errorin get message controlller" });
    }
}



