import { seansPlayingData } from "../models/seans/Seans";
import { /* seansSocket, */ socket } from "./socket";

let groupRoomConnected = false;
export const createSeansSocket = (data : string) => {   
    socket.emit("seans:create", data)    
}
export const joinSeansSocketRoom = (data : string) => {   
    socket.emit("seans:joinroom", data) 
    groupRoomConnected = true;
    socket.io.on("reconnect", () => {
        if(groupRoomConnected) {
            setTimeout(() => {
                socket.emit("seans:joinroom", data) 
            }, 1000);
        }
    })
}
export const disconnectSeansSocketRoom = (data : string) => {   
    socket.emit("seans:disconnectroom", data)
    groupRoomConnected = false;    
}
export const joinSeansSocket = (data: {seansId: string|undefined; data: any;}) => {   
    socket.emit("seans:joingame", JSON.stringify(data))    
}
export const leaveSeansSocket = (data: {seansId: string|undefined; data: any;}) => {
    socket.emit("seans:leave", JSON.stringify(data))    
}
export const acceptToSeansSocket = (data: {seansId: string|undefined; data: any;}) => {
    socket.emit("seans:acceptplayer", JSON.stringify(data))    
}
export const kickFromSeansSocket = (data: {seansId: string|undefined; data: any;}) => {
    socket.emit("seans:kick", JSON.stringify(data))    
}
export const startSeansSocket = (data:{seansId: string|undefined; data: any;}) => {
    socket.emit("seans:start", JSON.stringify(data))    
}

export const seansPlaying = (data: seansPlayingData) => {   
    socket.emit("seans:game", JSON.stringify(data))
}
export const updateSeansGameSocket = (data: any) => {   
    socket.emit("seans:update_seans_game", JSON.stringify(data))
}
