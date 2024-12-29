import {IRequisite} from "../models/IRequisite.ts";
import {IChat} from "../models/IChat.ts";
import {IMessage} from "../models/IMessage.ts";


export const getRequisiteFullName = (requisite: IRequisite) => (
    `${requisite.cardType} ${requisite.ownerRu} ${requisite.card.slice(requisite.card.length - 4)}`
)

export const getCurMsgRequisite = (messages: IMessage[],msg: IMessage) => {
    const curMsgIndex = messages.findIndex(item => item._id === msg._id)

    const oldMessages = messages.slice(0, curMsgIndex)

    const curRequisite = oldMessages.reverse().find(item => item.type === "system" && item.msg.startsWith(`@${msg.from?.email || ""}`))

    return curRequisite
        ? curRequisite.msg.slice(curRequisite.msg.indexOf('('))
        : ""
}