import {createSlice, Dispatch} from "@reduxjs/toolkit"



export const enum Elanguages {
    RU = 'ru',
    AM = 'am',
    EN = 'en',
}

export interface ITranslateSlice {
    language: Elanguages;
}


const initialState: ITranslateSlice = {
    language: Elanguages.RU
}







export const TranslateSlice = createSlice({
    name: 'TranslateSlice',
    initialState,
    reducers: {
        setLanguage(state, {payload}) {
            state.language = payload as Elanguages;
        },
    },
})


export const TranslateActions = TranslateSlice.actions

export const initLanguage = () =>  (dispatch: Dispatch): void => {
    const locStoreLang = localStorage.getItem('language')

    dispatch(TranslateActions.setLanguage(locStoreLang || Elanguages.RU))
}

export const changeLanguage = (lang: Elanguages) => (dispatch: Dispatch) => {
    localStorage.setItem('language', lang)

    dispatch(TranslateActions.setLanguage(lang))
}

export default TranslateSlice.reducer;