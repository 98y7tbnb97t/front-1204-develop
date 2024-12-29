import {FC} from 'react';
import {useAppSelector} from "../hooks/redux.ts";
import {ITranslateItemString, translations} from "../utils/translations.tsx";

const TermsPage: FC = () => {
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        accessDenied,
    }: {
        accessDenied: ITranslateItemString,
    } = translations.permission

    return (
        <>
            <div className='max-w-[700px] mx-auto w-full px-[10px]'>
                <h1 className='font-medium text-[30px] text-center mb-[15px]'>{accessDenied[language]}</h1>
            </div>
        </>
    );
}

export default TermsPage;