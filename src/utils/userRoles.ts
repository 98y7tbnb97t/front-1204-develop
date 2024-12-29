import {translations} from "./translations.tsx";

const {
    trainerText,
    adminText,
    studentText
} = translations.access

export const enum UserRoles {
    DIRECTOR = 'DIRECTOR',
    ZDIRECTOR = 'ZDIRECTOR',
    ADMIN = 'ADMIN',
    NEWUSER = 'NEWUSER',
    TRANER = 'TRANER',
    STUDENT = 'STUDENT',
    TRANERMETODIST = 'TRANERMETODIST',
    PROGRAMMER = 'PROGRAMMER'
}


const dirRoles: UserRoles[] = [
    UserRoles.DIRECTOR,
    UserRoles.ZDIRECTOR,
    UserRoles.ADMIN
]

const mainDirRoles: UserRoles[] = [
    UserRoles.DIRECTOR,
    UserRoles.ZDIRECTOR,
]


export const isUserDirector = (role: UserRoles | undefined,excludeAdmin = false) => {
    const arr = excludeAdmin ? mainDirRoles : dirRoles
    return (!!(role && arr.includes(role)))
}

export const roleColors  = {
    [UserRoles.TRANER]: {text: trainerText,color:'blue-500'},
    [UserRoles.ADMIN]: {text: adminText,color:'green-500'},
    [UserRoles.STUDENT]: {text: studentText,color:'black'}
}

export const setRoleColor = (role: UserRoles) => {
   const color = (role in roleColors) ? roleColors[role as (UserRoles.TRANER | UserRoles.ADMIN | UserRoles.STUDENT)].color : 'black'
    return `text-${color}`
}