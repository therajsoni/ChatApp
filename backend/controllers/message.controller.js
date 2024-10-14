import { Message } from "../models/messageModel.js";
import { Conversation } from "../models/conversationModel.js";

export const sendMessage = async(req,res) => {
    try {
        const senderId = req.id; //doubt
        const receiverId = req.params.id; //url 
        const {message} = req.body;
        // make converation
        let getConversation = await Conversation.findOne({
        participants : {$all : [senderId,receiverId]},        
        })
        if(!getConversation){
            getConversation = await Conversation.create({
                participants : [senderId,receiverId]  
            })
        };
        const newMessage = await Message.create({
            message,senderId,receiverId 
        })
        if(newMessage){
            getConversation.messages.push(newMessage._id);
        } 
        await getConversation.save();

        //SOCKET IO


        


        res.status(201).json({
            message : message,
            success : true
        })

    } catch (error) {
        console.log(error);        
    }
}


export const getMessage = async(req,res) => {
    try {
        
        const senderId = req.id;
        const receiverId  = req.params.id;
        const conversation = await Conversation.findOne({
        participants : {$all : [senderId,receiverId]}    
        }).populate("messages")
        console.log(conversation.messages);
        

        res.status(201).json({
            message : conversation,
            success : true
        })

    } catch (error) {
        console.log(error);        
    }
}
