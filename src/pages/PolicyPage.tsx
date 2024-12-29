import {FC} from 'react';
import LanguageBtns from "../components/Layouts/LanguageBtns/LanguageBtns.tsx";
import {useAppSelector} from "../hooks/redux.ts";
import {ITranslateItemString, translations} from "../utils/translations.tsx";

const PolicyPage: FC = () => {
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        titleText,
        infoCollectTitleText,
        infoCollectText,
        infoUseTitleText,
        infoUseText,
        infoDisclosureTitleText,
        infoDisclosureText,
        infoSecurityTitleText,
        infoSecurityText,
        policyUpdatesTitleText,
        policyUpdatesText,
        yourRightsTitleText,
        yourRightsText,
        contactUsTitleText,
        contactUsText,
        agreementTitleText,
        agreementText,
    }: {
        titleText: ITranslateItemString,
        infoCollectTitleText: ITranslateItemString,
        infoCollectText: ITranslateItemString,
        infoUseTitleText: ITranslateItemString,
        infoUseText: ITranslateItemString,
        infoDisclosureTitleText: ITranslateItemString,
        infoDisclosureText: ITranslateItemString,
        infoSecurityTitleText: ITranslateItemString,
        infoSecurityText: ITranslateItemString,
        policyUpdatesTitleText: ITranslateItemString,
        policyUpdatesText: ITranslateItemString,
        yourRightsTitleText: ITranslateItemString,
        yourRightsText: ITranslateItemString,
        contactUsTitleText: ITranslateItemString,
        contactUsText: ITranslateItemString,
        agreementTitleText: ITranslateItemString,
        agreementText: ITranslateItemString,
    } = translations.policy

    return (
        <>
            <div className='p-3'><LanguageBtns/></div>
            <div className='max-w-[700px] mx-auto w-full px-[10px]'>

                <h1 className='font-medium text-[30px] text-center mb-[15px]'>{titleText[language]}</h1>
                <h4 className='font-medium text-[20px] text-center mb-[8px]'>{infoCollectTitleText[language]}</h4>
                <p className='text-[16px] mb-[15px]'>{infoCollectText[language]}</p>
                <h4 className='font-medium text-[20px] text-center mb-[8px]'>{infoUseTitleText[language]}</h4>
                <p className='text-[16px] mb-[15px]'>{infoUseText[language]}</p>
                <h4 className='font-medium text-[20px] text-center mb-[8px]'>{infoDisclosureTitleText[language]}</h4>
                <p className='text-[16px] mb-[15px]'>{infoDisclosureText[language]}</p>
                <h4 className='font-medium text-[20px] text-center mb-[8px]'>{infoSecurityTitleText[language]}</h4>
                <p className='text-[16px] mb-[15px]'>{infoSecurityText[language]}</p>
                <h4 className='font-medium text-[20px] text-center mb-[8px]'>{policyUpdatesTitleText[language]}</h4>
                <p className='text-[16px] mb-[15px]'>{policyUpdatesText[language]}</p>
                <h4 className='font-medium text-[20px] text-center mb-[8px]'>{yourRightsTitleText[language]}</h4>
                <p className='text-[16px] mb-[15px]'>{yourRightsText[language]}</p>
                <h4 className='font-medium text-[20px] text-center mb-[8px]'>{contactUsTitleText[language]}</h4>
                <p className='text-[16px] mb-[15px]'>{contactUsText[language]}</p>
                <h4 className='font-medium text-[20px] text-center mb-[8px]'>{agreementTitleText[language]}</h4>
                <p className='text-[16px] mb-[15px]'>{agreementText[language]}</p>
            </div>
        </>
    );
}

export default PolicyPage;