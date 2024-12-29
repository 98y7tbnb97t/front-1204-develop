import {FC} from 'react';
import Modal from "../UI/Modal.tsx";

import {translations} from "../../utils/translations.tsx";
import {useAppSelector} from "../../hooks/redux.ts";

import blacksMoveImg from "../../assets/blacksMove.png"
import whiteMoveImg from "../../assets/whiteMove.png"

interface UseGoogleModalProps {
    active: boolean,
    onClose: () => void
}

const classNames = {
    title: "text-[#fdc800] font-normal text-center text-[24px] mb-[15px] px-[10px]",
    container: "max-w-[700px] mx-auto px-[15px] pb-[15px]",
    contentTxt: "text-[16px] block text-white whitespace-pre-wrap leading-[1.6]"

}


const UseGoogleModal: FC<UseGoogleModalProps> = ({active, onClose}) => {
    const language = useAppSelector(state => state.TranslateSlice.language)


    const {
        whoseMoveText,
        aboutBlackMoveText,
        aboutWhiteMoveText,
    } = translations.homework


    return (
        <Modal
            active={active}
            setActive={onClose}
            closeBtnStyle={'!text-black'}
            className={`${classNames.container} !p-[0px] !bg-white rounded-[20px]`}
        >

            <div>
                <div className={`${classNames.container}`}>
                    <h2 className={classNames.title}>{whoseMoveText[language]}</h2>
                    <p className='text-[14px] block text-center text-black whitespace-pre-wrap leading-[1.6] py-[10px]'>{aboutBlackMoveText[language]}</p>
                    <img src={blacksMoveImg} alt="black's move" className='mx-auto max-w-[500px] w-full'/>
                    <br/>
                    <p className='text-[14px] block text-center text-black whitespace-pre-wrap leading-[1.6] py-[10px]'>{aboutWhiteMoveText[language]}</p>
                    <img src={whiteMoveImg} alt="white's move" className='mx-auto max-w-[500px] w-full'/>
                </div>
            </div>
        </Modal>
    );
}

export default UseGoogleModal;