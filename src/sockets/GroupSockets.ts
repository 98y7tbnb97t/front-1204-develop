import { socket } from "./socket"
import { User } from "../models/User"
import { IGroupMessage } from "../models/MyGroups/IGroupMessage"
import { IMaterial } from "../models/Program/IMaterial"
import { ITeamsGame } from "../models/ITeam";

let groupRoomConnected = false;
export const GroupRoomSocket = (room: string) => {
    socket.emit("group:joinroom", room)
    groupRoomConnected = true;
    socket.io.on("reconnect", () => {
        if(groupRoomConnected) {
            setTimeout(() => {
                socket.emit("group:joinroom", room)
            }, 1000);
        }
    })
}
export const GroupRoomDisconnectSocket = (room: string) => {
    socket.emit("group:disconnectroom", room)  
    groupRoomConnected = false;  
}
export const GroupSendMessageSocket = (data: {room: string, msg: IGroupMessage} ) => {
    socket.emit("group:send_message", data); 
}
export const GroupChangeMaterialSocket = (data: {room: string, material: IMaterial} ) => {
    socket.emit("group:change_material", data); 
}

export const GroupChangeGameSocket = (data: {room: string, game: any, fen: string} ) => {
    socket.emit("group:change_game", data); 
}
export const GroupMakeMoveSocket = (data: {room: string, user_id: string, color: string, move: string, role: string} ) => {
    socket.emit("group:make_move", data); 
}
export const GroupMakeMoveBackSocket = (data: {room: string} ) => {
    socket.emit("group:move_back", data); 
}
export const GroupEntryModeSocket = (data: {room: string, bool: boolean} ) => {
    socket.emit("group:entry_mode", data); 
}
export const GroupGlobalModeSocket = (data: {room: string, user_id: string, bool: boolean} ) => {
    socket.emit("group:global_mode", data); 
}
export const GroupTeamsGameSocket = (data: {room: string, game: ITeamsGame | null}) => {
    socket.emit("group:teams_game", data);
}
export const GroupTeamsGameMoveSocket = (data: {room: string, move: number}) => {
    socket.emit("group:teams_game_move", data);
}
export const GroupFullCleanSocket = (data: {room: string} ) => {
    socket.emit("group:full_clean", data); 
}
export const GroupUserCleanSocket = (data: {room: string, user_id: string} ) => {
    socket.emit("group:user_clean", data); 
}
export const GroupUserEditSocket = (data: {room: string, user_id: string, name: string, sname: string} ) => {
    socket.emit("group:user_edit", data); 
}
export const GroupAddGameUserSocket = (data: {room: string, move: {user_id: string, name: string, sname: string, moves: []}} ) => {
    socket.emit("group:add_game_user", data); 
}
export const GroupChangeBoardOrientation = (data: {room: string, orientation: 'white' | 'black'} ) => {
    socket.emit("group:change_board_orientation", data); 
}

export const GroupUpdateSocket = (data: {room: string} ) => {
    socket.emit("group:update", data); 
}

export const GroupDrawArrowSocket = (data: {room: string, info: {fromx: string, fromy: string, tox: string, toy: string, color: string}} ) => {
    socket.emit("group:draw_arrow", data); 
}
export const GroupDrawCircleSocket = (data: {room: string, info: {x: string, y: string, color: string}} ) => {
    socket.emit("group:draw_circle", data); 
}
export const GroupClearCanvasSocket = (data: {room: string} ) => {
    socket.emit("group:clear_canvas", data);
}
export const GroupRemoveArrowSocket = (data: {room: string, info: {fromx: number, fromy: number, tox: number, toy: number}}) => {
    socket.emit("group:remove_arrow", data)
}
export const GroupStepBackSocket = (data: {room: string, user_id: string} ) => {
    socket.emit("group:back", data); 
}
export const GroupStepNextSocket = (data: {room: string, user_id: string, color: string, move: string} ) => {
    socket.emit("group:next", data); 
}

export const GroupEndLessonSocket = (data: {room: string} ) => {
    socket.emit("group:end_lesson", data); 
}
