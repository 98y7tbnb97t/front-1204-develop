import {FC} from 'react';
import Modal from "../UI/Modal.tsx";

import {translations} from "../../utils/translations.tsx";
import {useAppSelector} from "../../hooks/redux.ts";

interface UseGoogleModalProps {
    active: boolean,
    onClose: () => void
}

const classNames = {
    title: "text-[#fdc800] font-normal text-center text-[24px] mb-[15px] px-[10px]",
    container: "max-w-[700px] mx-auto px-[15px]",
    contentTxt: "text-[16px] block text-white whitespace-pre-wrap leading-[1.6]"

}


const UseGoogleModal: FC<UseGoogleModalProps> = ({active, onClose}) => {
    const language = useAppSelector(state => state.TranslateSlice.language)


    const {
        useGoogleBtnText,
        main1Text,
        main2Text,
        thankYouText,
    } = translations.useGoogleModal


    return (
        <Modal
            active={active}
            setActive={onClose}
            closeBtnStyle={'!text-black'}
            className={`${classNames.container} !p-[0px] !bg-white rounded-[20px]`}
        >

            <div>
                <div className={`${classNames.container}`}>
                    <h2 className={classNames.title}>{useGoogleBtnText[language]}</h2>
                    <p className='text-[14px] block text-black whitespace-pre-wrap leading-[1.6] py-[10px]'>{main1Text[language]}</p>
                    <p className='text-[14px] block text-black whitespace-pre-wrap leading-[1.6] py-[10px]'>{main2Text[language]}</p>
                    <p className='text-[14px] block text-black whitespace-pre-wrap leading-[1.6] py-[10px]'>{thankYouText[language]}</p>
                </div>
            </div>
        </Modal>
    );
}

export default UseGoogleModal;