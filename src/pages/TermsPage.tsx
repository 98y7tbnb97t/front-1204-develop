import {FC} from 'react';
import {useAppSelector} from "../hooks/redux.ts";
import {ITranslateItemString, translations} from "../utils/translations.tsx";
import LanguageBtns from "../components/Layouts/LanguageBtns/LanguageBtns.tsx";

const TermsPage: FC = () => {
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        titleText,
        welcomeText,
        copyrightText,
        usersText,
        userContentText,
        confidentalityText,
        liabliltyText,
        termsText,
        disclaimerText,
        paidServicesText,
        cancelUsingText,
        thankYouText,
    }: {
        titleText: ITranslateItemString,
        welcomeText: ITranslateItemString,
        copyrightText: ITranslateItemString,
        usersText: ITranslateItemString,
        userContentText: ITranslateItemString,
        confidentalityText: ITranslateItemString,
        liabliltyText: ITranslateItemString,
        termsText: ITranslateItemString,
        disclaimerText: ITranslateItemString,
        paidServicesText: ITranslateItemString,
        cancelUsingText: ITranslateItemString,
        thankYouText: ITranslateItemString,
    } = translations.terms

    return (
        <>
            <div className='p-3'><LanguageBtns/></div>
            <div className='max-w-[700px] mx-auto w-full px-[10px]'>
                <h1 className='font-medium text-[30px] text-center mb-[15px]'>{titleText[language]}</h1>
                <p className='text-[16px] mb-[15px]'>{welcomeText[language]}</p>
                <p className='text-[16px] mb-[15px]'>{copyrightText[language]}</p>
                <p className='text-[16px] mb-[15px]'>{usersText[language]}</p>
                <p className='text-[16px] mb-[15px]'>{userContentText[language]}</p>
                <p className='text-[16px] mb-[15px]'>{confidentalityText[language]}</p>
                <p className='text-[16px] mb-[15px]'>{liabliltyText[language]}</p>
                <p className='text-[16px] mb-[15px]'>{termsText[language]}</p>
                <p className='text-[16px] mb-[15px]'>{disclaimerText[language]}</p>
                <p className='text-[16px] mb-[15px]'>{paidServicesText[language]}</p>
                <p className='text-[16px] mb-[15px]'>{cancelUsingText[language]}</p>
                <p className='text-[16px] mb-[15px]'>{thankYouText[language]}</p>
            </div>
        </>
    );
}

export default TermsPage;