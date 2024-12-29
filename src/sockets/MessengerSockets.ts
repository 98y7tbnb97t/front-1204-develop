import { socket } from "./socket"
import { User } from "../models/User"
import { IMessage } from "../models/IMessage"

export const ChatRoomSocket = (room: string, userid?: string) => {
    socket.emit("chat:joinroom", {room, userid})    
}

export const ChatRoomNotificationSocket = (room: string) => {
    socket.emit("chat:joinnotificationroom", room)    
}

export const ChatRoomDisconnectSocket = (room: string) => {
    
    socket.emit("chat:disconnectroom", room)    
    console.log("ChatRoomDisconnectSocket");
}

export const sendMessageSocket = (msg_id : string) => {
    socket.emit("message:send", {id: msg_id})    
}

export const deleteMessageSocket = (msg_id : string, dialog_id: string) => {
    socket.emit("message:delete", {id: msg_id, dialog_id})    
}

export const CallChatSocket = (user: User, room: string, notification_id: string) => {
    socket.emit("chat:call", {user, room, notification_id})
}

export const sendMessageReadedSocket = (room: string, msg: IMessage, userid: string) => {
    socket.emit('chat:server|message_readed', { room, msg, userid });
}