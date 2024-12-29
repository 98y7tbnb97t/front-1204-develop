import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "../../models/User";
import { IChat, MuteDurations } from "../../models/IChat";
import { IgetChat, IcreateChat, IgetMessages, RemoveFromUserFromChatDialog, IMuteChat } from "../../models/response/MessengerResponses";
import { IMessage, IMessageUpdate } from "../../models/IMessage";
import DialogService from "../../services/DialogService";
import { AxiosError } from "axios";
import { ServerError } from "../../models/response/ServerError";
import { sendMessageSocket, deleteMessageSocket, sendMessageReadedSocket } from "../../sockets/MessengerSockets";
import { IAttachment } from "../../models/IAttachment";
import { IAttachmentModal } from "../../models/IAttachmentModal";
import { RootState } from "../store";
import {IRequisite} from "../../models/IRequisite.ts";
import { socket } from "../../sockets/socket.ts";

export interface MessengerState {
    chats: IChat[];
    chatsContainer: IChat[];
    archived: IChat[];
    archiveContainer: IChat[];
    chat: {
        _id: string,
        user: User,
        messages: IMessage[]
        isGroup: boolean;
        anonim?: boolean;
        description: string;
        users?: Array<User>
        group_id?: string;
        tagId?: string;
        isTech?: boolean;
        isChanel: boolean;
        requisite?: IRequisite | null;
        since?: [{user_id: string; date: Date}]
        formerParticipants?: User[],
        unreadedCount?: number
        showNames?: boolean
    }
    attachmentModal: boolean;
    attachment: IAttachment;
    isChatsLoading: boolean;
    isChatLoading: boolean;
    isSendMessageLoading: boolean;
    blinkMessage: string;
    reply: string | null;
    editMsg: string | null;
    unreaded: number;
    chatsLimit: number;
    hasMoreChats: boolean;
    hasMoreMessages: boolean;
    messagesOffset: number;
    messagesLimit: number;
    isStartMessaging:boolean;
}

const initialChat = {
    user: {} as User,
    messages: [],
    isGroup: false,
    description: '',
    users: [],
    since: [{}] as [{ user_id: string; date: Date; }],
    tagId: "",
    _id: "",
    isChanel: false,
    formerParticipants: [],
    showNames: false
};

const initialState: MessengerState = {
    archiveContainer: [],
    chatsContainer: [],
    chats: [],
    archived: [],
    chat: initialChat,
    attachmentModal: false,
    attachment: {} as IAttachment,
    isChatsLoading: true,
    isChatLoading: true,
    isSendMessageLoading: true,
    reply: null,
    editMsg: null,
    blinkMessage: '',
    unreaded: 0,
    chatsLimit: 200,
    hasMoreChats: true,
    hasMoreMessages: true,
    messagesOffset: 0,
    messagesLimit: 30,
    isStartMessaging: false,
}


export const getUnreaded = createAsyncThunk<string>(
    'messengerSlice/getUnreaded',
    async (_, {rejectWithValue}) => {
        try {
            const response = await DialogService.getUnreaded();
            return response.data.unreaded;
        } catch ( error ) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const getDialogs = createAsyncThunk<IChat[], { id: string, page: number, searchQuery?: string }>(
    'messengerSlice/getDialogs',
    async ({ id, page, searchQuery}, {rejectWithValue, getState}) => {
        try {
            const limit = (getState() as RootState).MessengerSlice.chatsLimit
            const response = await DialogService.getDialogs(id, limit, page, searchQuery);
            return response.data.chats;
        } catch ( error ) {
            console.log(error)
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const getDialogsArchived = createAsyncThunk<IChat[]>(
    'messengerSlice/getDialogsArchived',
    async (_, {rejectWithValue}) => {
        try {
            const response = await DialogService.getDialogsArchived();
            return response.data.chats;
        } catch ( error ) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const getChat = createAsyncThunk<IgetChat, string>(
    'messengerSlice/getChat',
    async (id, {rejectWithValue, dispatch}) => {
        try {
            dispatch(messengerSlice.actions.setMessagesOffset(0));
            const response = await DialogService.getChat(id);
            return response.data;
        } catch ( error ) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const getMessages = createAsyncThunk<IgetMessages, { id: string, noLimit?: boolean}>(
    'messengerSlice/getMessages',
    async ({id, noLimit = false}, {rejectWithValue, getState}) => {
        try {
            const limit = noLimit ? undefined : (getState() as RootState).MessengerSlice.messagesLimit ;
             const offset = (getState() as RootState).MessengerSlice.messagesOffset
            const response = await DialogService.getMessages(id, offset, limit);
            return response.data;
        } catch ( error ) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const createChat = createAsyncThunk<IcreateChat, {name: string, description: string, anonim: boolean, emails?: string[], showNames: boolean}>(
    'messengerSlice/createChat',
    async (data, {rejectWithValue}) => {
        try {
            const {name, description, anonim, emails, showNames} = data;
            const response = await DialogService.createChat(name, description, anonim, showNames, emails);
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }

    }
)

export const editChat = createAsyncThunk<IcreateChat, {dialog_id: string, anonim?: boolean, archive?: boolean}>(
    'messengerSlice/editChat',
    async (data, {rejectWithValue}) => {
        try {
            const {dialog_id, archive, anonim} = data;
            const response = await DialogService.editChat(dialog_id, undefined, undefined, undefined, archive, anonim);
            return response.data;
        } catch ( error ) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const deleteChat = createAsyncThunk<IgetChat, {chatId: string}>(
    'messengerSlice/deleteChat',
    async (data, {rejectWithValue}) => {
        try {
            const {chatId} = data;
            const response = await DialogService.deleteChat(chatId);
            return response.data;
        } catch ( error ) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const muteChat = createAsyncThunk<IChat, {chatId: string, duration: MuteDurations}>(
    'messengerSlice/muteChat',
    async (data, {rejectWithValue}) => {
        try {
            const {chatId, duration} = data;
            const response = await DialogService.muteChat(chatId, duration);
            return response.data.dialog;
        } catch ( error ) {
            const err = error as AxiosError
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const unMuteChat = createAsyncThunk<IChat, {chatId: string}>(
    'messengerSlice/unMuteChat',
    async (data, {rejectWithValue}) => {
        try {
            const {chatId} = data;
            const response = await DialogService.unMuteChat(chatId);
            return response.data.dialog;
        } catch ( error ) {
            const err = error as AxiosError
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const sendMessage = createAsyncThunk<IMessage, {msg: string, userid: string, audio: Blob | undefined, fileList: File[], reply: string | null}>(
    'messengerSlice/sendMessage',
    async (data, {rejectWithValue}) => {
        try {
            const {msg, userid, audio, fileList, reply} = data;
            const response = await DialogService.sendMessage(msg, userid, audio, fileList, reply);
            return response.data.message;
        } catch ( error ) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const setReactionThunk = createAsyncThunk<IMessage, {msgId: string, reaction: { emoji: string, from: string }}>(
    'messengerSlice/setReactionThunk',
    async (data, {getState, rejectWithValue}) => {
        try {
            const {msgId, reaction} = data;
            const msg = (getState() as RootState).MessengerSlice.chat.messages.find(m => m._id === msgId);
            socket.emit('message:server|set_reaction', { msg, reaction: { emoji: reaction.emoji, from: reaction.from }});
            const response = await DialogService.setReaction(msgId, reaction);
            return response.data.message;
        } catch ( error ) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const removeReactionThunk = createAsyncThunk<IMessage, {msgId: string, reaction: { emoji: string, from: string }}>(
    'messengerSlice/removeReactionThunk',
    async (data, {rejectWithValue, getState}) => {
        try {
            const {msgId, reaction} = data;
            const msg = (getState() as RootState).MessengerSlice.chat.messages.find(m => m._id === msgId);
            socket.emit('message:server|remove_reaction', { msg, reaction: { emoji: reaction.emoji, from: reaction.from }});
            const response = await DialogService.removeReaction(msgId, reaction);
            return response.data.message;
        } catch ( error ) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const addUserToChat = createAsyncThunk<IChat, {email: string, dialog_id: string}>(
    'messengerSlice/addUserToChat',
    async (data, {rejectWithValue, dispatch}) => {
        try {
            const { email, dialog_id } = data;
            const response = await DialogService.addUserToChat(email, dialog_id);
            dispatch(messengerSlice.actions.removeUserFromFormer(email));
            return response.data.dialog;
        } catch ( error ) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const addUsersToChat = createAsyncThunk<IChat, {emails: string[], dialog_id: string}>(
    'messengerSlice/addUsersToChat',
    async (data, {rejectWithValue, dispatch}) => {
        try {
            const { emails, dialog_id } = data;
            const response = await DialogService.addUsersToChat(emails, dialog_id);
            dispatch(messengerSlice.actions.removeUsersFromFormer(emails));
            return response.data.dialog;
        } catch ( error ) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const removeUserFromChat = createAsyncThunk<RemoveFromUserFromChatDialog, { user: User, dialog_id: string}>(
    'messengerSlice/removeUserFromChat',
    async (data, {rejectWithValue, dispatch}) => {
        try {
            const { dialog_id, user } = data;
            const response = await DialogService.removeUserFromChat(user._id, dialog_id);
            dispatch(messengerSlice.actions.addUserToFormer(user));
            return response.data.dialog;
        } catch ( error ) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const editMessage = createAsyncThunk<IMessage, {msg_id: string, msg: string, fileList: File[]}>(
    'messengerSlice/editMessage',
    async (data, {rejectWithValue}) => {
        try {
            const {msg_id, msg, fileList} = data;
            const response = await DialogService.editMessage(msg_id, msg, fileList);
            return response.data.message;
        } catch ( error ) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const deleteMessage = createAsyncThunk<IMessage, {msg_id: string, dialog_id: string}>(
    'messengerSlice/deleteMessage',
    async (data, {rejectWithValue}) => {
        try {
            const {msg_id, dialog_id} = data;
            const response = await DialogService.deleteMessage(msg_id, dialog_id);
            return response.data.message;
        } catch ( error ) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)



// export const searchDialogs = createAsyncThunk<IChat[], string>(
//     'messengerSlice/searchDialogs',
//     async (value, {rejectWithValue}) => {
//         try {
//             const response = await DialogService.searchDialogs(value);
//             return response.data.dialogs;
//         } catch ( error ) {
//             const err = error as AxiosError;
//             const e = err.response?.data as ServerError
//             return rejectWithValue(e);
//         }
//     }
// )

export const messengerSlice = createSlice({
    name: 'messengerSlice',
    initialState,
    reducers: {
        setIsStartMessaging:(state, { payload })=> {
            state.isStartMessaging = payload as boolean;
        },
        searchDialogs(state, action) {
            const s = action.payload as string;
            const regex = new RegExp(`${s.toLowerCase()}.*`);
            state.chats = state.chatsContainer.filter(chat => chat.name.toLowerCase().match(regex));
            state.archived = state.archiveContainer.filter(chat => chat.name.toLowerCase().match(regex));
        },
        updateChat (state, action) {
            const msg = action.payload as IMessageUpdate;
            const dialog = state.chats.filter(chat=> chat._id === msg?.to?._id);

            dialog[0].lastmsg = msg as IMessage;
            dialog[0].unreaded ++;
        },
        incUnreaded (state) {
            state.unreaded ++;
        },
        pushMessage (state, action) {
            const { msg } = action.payload as { msg: IMessageUpdate };
            const messageExists = state.chat.messages.some(m => m._id === msg._id);
            if (!messageExists) {
                state.chat.messages.push(msg as IMessage);
                state.messagesOffset = state.messagesOffset + 1;
            }
            state.chats = state.chats.map(c => {
                if (c._id === msg?.to?._id) {
                    c.lastmsg = msg as IMessage;
                }
                return c;
            })
            const indx = state.chats.findIndex(item=> item._id === msg?.to?._id);
            if(indx !== -1) {
                state.chats[indx].unreaded = -1;
            }
        },
        delMessage (state, action) {
            const id = action.payload as string;
            state.chat.messages = state.chat.messages.filter(msg => msg._id !== id);
            state.chats = state.chats.map(c => {
                if (c.lastmsg?._id === id) {
                    c.lastmsg = state.chat.messages.at(-1) || {} as IMessage;
                }
                return c;
            });
            state.messagesOffset = state.messagesOffset - 1;
        },
        setAttachmentModal (state, action) {
            const data = action.payload as IAttachmentModal;
            if(data.attachment) {
                state.attachment = data.attachment;
            } else {
                state.attachment = {} as IAttachment;
            }
            state.attachmentModal = data.modal;
        },
        setBlinkMessage (state, { payload }) {
            state.blinkMessage = payload as string;
        },
        setReplyMessage (state, { payload }) {
            state.reply = payload as string | null;
            if(state.editMsg) {
                state.editMsg = null;
            }
        },
        setMessagesOffset (state, { payload }) {
            state.messagesOffset = payload as number;
            state.messagesLimit = initialState.messagesLimit;
        },
        setEditMessage (state, { payload }) {
            state.editMsg = payload as string | null;
            if(state.reply) {
                state.reply = null;
            }
        },
        clearDialogs(state) {
            state.chats = [];
        },
        clearChat(state) {
            state.chat = initialChat;
        },
        addUserToFormer(state, { payload: user }) {
            if (state.chat.formerParticipants) {
                state.chat.formerParticipants = [...state.chat.formerParticipants, user];
            } else {
                state.chat.formerParticipants = [user];
            }
        },
        removeUserFromFormer(state, { payload: email }) {
            if (state.chat.formerParticipants && state.chat.formerParticipants.some(f => f.email === email)) {
                state.chat.formerParticipants = state.chat.formerParticipants.filter(f => f.email !== email);
            }
        },
        removeUsersFromFormer(state, { payload }) {
            const emails = payload as string[];
            if (state.chat.formerParticipants && state.chat.formerParticipants.some(f => emails.includes(f.email))) {
                state.chat.formerParticipants = state.chat.formerParticipants.filter(f => !emails.includes(f.email));
            }
        },
        setUserOnlineStatus(state, { payload }) {
            const { id, isOnline } = payload as { id: string, isOnline: boolean };
            if (state.chat.users?.some(u => u._id === id)) {
                state.chat.messages = state.chat.messages.map(m => {
                    if (m.from && m.from._id === id) {
                        m.from.isOnline = isOnline;
                    }
                    return m;
                })
            } 
        },
        setMessageReaded(state, { payload: { msgId, userid} }: { payload: { msgId: string, userid: string}}) {
            state.chat.messages = state.chat.messages.map(m => {
                if (m._id === msgId) {
                    if (m.readed && !m.readed.includes(userid)) {
                        m.readed = [...m.readed, userid];
                    } else if(!m.readed) {
                        m.readed = [userid];
                    } else {
                        return m;
                    }
                    sendMessageReadedSocket(state.chat._id, m, userid);
                }
                
                return m;
            })
        },
        setReaction(state, { payload }: {payload: { from: string, msgId: string, reaction: string }}) {
            const { msgId, reaction, from } = payload;
            if (state.chat.messages.some(m => m._id === msgId)) {
                state.chat.messages = state.chat.messages.map(m => {
                    if (m._id === msgId) {
                        if (m.reactions) {
                            const sameReaction = m.reactions.find(r => r.emoji === reaction);
                            if (sameReaction) {
                                if (!sameReaction.from.includes(from)) {
                                    const reactions = m.reactions.map(r => {
                                        if (r.emoji === reaction) {
                                            return {...r, from: [...r.from, from]}
                                        }
                                        return r;
                                    })
                                    return {...m, reactions}
                                }
                                return m;
                            } else {
                                return {...m, reactions: [...m.reactions, { from: [from], emoji: reaction}]};
                            }
                        } else {
                            return {...m, reactions: [{ emoji: reaction, from: [from] }]}
                        }
                    }
                    return m;
                })
            }
        },
        removeReaction(state, {payload: {msgId, from, emoji}} : {payload: { msgId: string, from: string, emoji: string }}) {
            const messageIdx = state.chat.messages.findIndex(m => m._id === msgId);
            if (messageIdx !== -1) {
                const m = state.chat.messages[messageIdx];
                if (m.reactions) {
                    m.reactions = m.reactions.map(r => {
                        if (r.emoji === emoji) {
                            return {...r, from: r.from.filter(f => f !== from)};
                        }
                        return r;
                    }).filter(r => r.from.length);
                }
                state.chat.messages[messageIdx] = m;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUnreaded.fulfilled, (state, { payload }) => {
                state.unreaded = +payload;
            })
            .addCase(removeUserFromChat.fulfilled, (state, { payload }) => {
                state.chat = {
                    ...state.chat,
                    users: state.chat?.users && payload?.users
                        ? state.chat?.users.filter(item => (payload?.users || []).includes(item._id))
                        : []
                };
            })
            .addCase(getDialogs.pending, (state) => {
                state.isChatsLoading = true;
            })
            .addCase(getDialogs.fulfilled, (state, { payload }) => {
                state.isChatsLoading = false;
                state.chats = [...state.chats, ...payload];
                state.chatsContainer = [...state.chatsContainer, ...payload];
                state.hasMoreChats = payload.length >= state.chatsLimit;
            })
            .addCase(getDialogsArchived.fulfilled, (state, { payload }) => {
                state.archived = payload;
                state.archiveContainer = payload;
            })
            .addCase(getDialogs.rejected, (state) => {
                state.isChatLoading = false;
            })
            .addCase(getChat.pending, (state) => {
                state.isChatLoading = true;
            })
            .addCase(getChat.fulfilled, (state, { payload }) => {
                state.isChatLoading = false;
                state.chat = payload;
                state.hasMoreMessages = true;
                if (state.chat.unreadedCount && state.chat.unreadedCount > state.messagesLimit) {
                    state.messagesLimit = state.chat.unreadedCount;
                }
                const indx = state.chats.findIndex(item=> item._id === payload._id);
                if(indx !== -1) {
                    state.chats[indx].unreaded = 0;
                }
            })
            .addCase(getChat.rejected, (state) => {
                state.isChatLoading = false;
            })
            .addCase(getMessages.pending, (state) => {
                state.isChatLoading = true;
            })
            .addCase(getMessages.fulfilled, (state, { payload }) => {
                state.isChatLoading = false;
                if (payload.messages.length) {
                    state.chat.messages = [...payload.messages.reverse(), ...state.chat.messages];
                } else {
                    state.hasMoreMessages = false;
                }
            })
            .addCase(getMessages.rejected, (state) => {
                state.isChatLoading = false;
            })
            .addCase(createChat.pending, (state) => {
                state.isChatsLoading = true;
            })
            .addCase(createChat.fulfilled, (state, { payload }) => {
                state.isChatLoading = false;
                state.chats.push(payload.dialog)
                //state.chat = payload;
            })
            .addCase(editChat.fulfilled, (state, { payload }) => {
                if(payload.dialog.archive) {
                    const newChats = state.chats.filter(chat=> chat._id !== payload.dialog._id);
                    state.chats = newChats;
                    if (state.archived.every(c => c._id !== payload.dialog._id)) {
                        state.archived.push(payload.dialog);
                    }
                } else if (payload.dialog.archive === false){
                    const newChats = state.archived.filter(chat=> chat._id !== payload.dialog._id);
                    state.archived = newChats;
                    if (state.chats.every(c => c._id !== payload.dialog._id)) {
                        state.chats.push(payload.dialog);
                    }
                }
                state.chat.anonim = payload.dialog.anonim
                //
                //state.chat = payload;
            })
            .addCase(createChat.rejected, (state) => {
                state.isChatLoading = false;
            })

            .addCase(addUserToChat.fulfilled, (state, { payload }) => {
                state.chat.users = payload.users;
            })
            .addCase(addUsersToChat.fulfilled, (state, { payload }) => {
                state.chat.users = payload.users;
            })

            .addCase(sendMessage.pending, (state) => {
                state.isSendMessageLoading = true;
            })
            .addCase(sendMessage.fulfilled, (state, { payload }) => {
                state.isSendMessageLoading = false;
                state.chat.messages.push(payload);
                state.chats = state.chats.map(c => {
                    if (c._id === payload?.to) {
                        c.lastmsg = payload;
                    }
                    return c;
                })
                state.messagesOffset = state.messagesOffset + 1;
                const dialog = state.chats.findIndex(chat=> chat._id === payload.to);
                if(dialog !== -1) {
                    state.chats[dialog].lastmsg = payload;
                }
                if(state.chats[0]?._id === '64e260054ae1183395474c7b') {
                    state.chats.unshift(...state.chats.splice(dialog,1));
                    state.chats.unshift(...state.chats.splice(1,1));
                } else {
                    state.chats.unshift(...state.chats.splice(dialog,1));
                }
                sendMessageSocket(payload._id);
            })
            .addCase(sendMessage.rejected, (state) => {
                state.isSendMessageLoading = false;
            })
            .addCase(editMessage.pending, (state) => {
                state.isSendMessageLoading = true;
            })
            .addCase(editMessage.fulfilled, (state, { payload }) => {
                const msgIndex = state.chat.messages.findIndex((msg => msg._id == payload._id));
                state.chat.messages[msgIndex] = payload;
                state.isSendMessageLoading = false;
            })
            .addCase(editMessage.rejected, (state) => {
                state.isSendMessageLoading = false;
            })
            .addCase(deleteMessage.pending, (state) => {
                state.isSendMessageLoading = true;
            })
            .addCase(deleteMessage.fulfilled, (state, { payload }) => {
                //const msgIndex = state.chat.messages.findIndex((msg => msg._id == payload._id));
                //state.chat.messages[msgIndex] = payload;
                state.chat.messages = state.chat.messages.filter(msg => msg._id !== payload._id);
                state.chats = state.chats.map(c => {
                    if (c.lastmsg?._id === payload._id) {
                        c.lastmsg = state.chat.messages.at(-1) || {} as IMessage;
                    }
                    return c;
                });
                state.messagesOffset = state.messagesOffset - 1;
                state.isSendMessageLoading = false;
                if(payload.to) {
                    deleteMessageSocket(payload._id, payload.to)
                }
            })
            .addCase(deleteMessage.rejected, (state) => {
                state.isSendMessageLoading = false;
            })
            // .addCase(searchDialogs.pending, (state) => {
            //     state.isChatsLoading = true;
            // })
            // .addCase(searchDialogs.fulfilled, (state, { payload }) => {
            //     state.isChatsLoading = false;
            //     state.chats = payload;
            // })
            // .addCase(searchDialogs.rejected, (state) => {
            //     state.isChatLoading = false;
            // })
            .addCase(deleteChat.fulfilled, (state, { payload }) => {
                const newChats = state.chats.filter(chat=> chat._id !== payload._id);
                state.chats = newChats;

                const newArchives = state.archived.filter(chat=> chat._id !== payload._id);
                state.archived = newArchives;
            })
            .addCase(muteChat.fulfilled, (state, { payload }) => {
                state.chats = state.chats.map(chat => {
                    if (chat._id === payload._id) {
                        chat.mutedUsers = payload.mutedUsers;
                    }
                    return chat;
                })
            })
            .addCase(unMuteChat.fulfilled, (state, { payload }) => {
                state.chats = state.chats.map(chat => {
                    if (chat._id === payload._id) {
                        chat.mutedUsers = payload.mutedUsers;
                    }
                    return chat;
                })
            })
    }
})

export default messengerSlice.reducer;
export const { 
    setIsStartMessaging,
    incUnreaded,
    searchDialogs,
    pushMessage,
    delMessage,
    setAttachmentModal,
    setBlinkMessage,
    setReplyMessage,
    setEditMessage,
    updateChat,
    clearDialogs,
    setMessagesOffset,
    clearChat,
    setUserOnlineStatus,
    setMessageReaded,
    setReaction,
    removeReaction
} = messengerSlice.actions;
