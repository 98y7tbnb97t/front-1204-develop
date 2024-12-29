import {IChat} from "../models/IChat.ts";
import {isUserDirector, UserRoles} from "./userRoles.ts";

import moneyImg from "../assets/money.webp"

export const closedText = '!closed'


export const setRequisiteChats = (chat: IChat,userRole: UserRoles) => {
    let name = ""
    let avatar = ""

    if(chat.requisite) {
        avatar = moneyImg
        const {cardType,card,ownerRu} = chat.requisite
        if(isUserDirector(userRole)) {
            name = `${cardType} ${ownerRu.split(' ')[0]} ${card.slice(card.length - 4)}`
        } else {
            name = "ЧАТ ДЛЯ ЧЕКОВ"
        }
    }

    return {name,avatar}
}