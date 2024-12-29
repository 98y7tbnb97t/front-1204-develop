import {FC, useEffect, useRef, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import MainButton from '../UI/MainButton';
import Modal from '../UI/Modal';
import {editUser, setRequizits} from '../../store/reducers/UserSlice';
import copy from 'copy-to-clipboard';
import {Disclosure} from '@headlessui/react'
import {IoIosArrowDown} from '@react-icons/all-files/io/IoIosArrowDown'
import {IoIosArrowUp} from '@react-icons/all-files/io/IoIosArrowUp'
import rusDesk1AbonementImg from "../../assets/abonements/rus COMP1.png"
import rusDesk2AbonementImg from "../../assets/abonements/rus COMP2.png"
import rusDesk3AbonementImg from "../../assets/abonements/rus COMP3.png"
import rusMOB1AbonementImg from "../../assets/abonements/rus MOB1.png"
import rusMOB2AbonementImg from "../../assets/abonements/rus MOB2.png"
import rusMOB4AbonementImg from "../../assets/abonements/rus MOB3-5.png"
import rusMOB3AbonementImg from "../../assets/abonements/rus MOB4.png"

import engDesk1AbonementImg from "../../assets/abonements/eng COMP1.png"
import engDesk2AbonementImg from "../../assets/abonements/eng COMP2.png"
import engMOB1AbonementImg from "../../assets/abonements/eng MOB1.png"
import engMOB2AbonementImg from "../../assets/abonements/eng MOB2.png"

import armDesk1AbonementImg from "../../assets/abonements/arm COMP1.png"
import armDesk2AbonementImg from "../../assets/abonements/arm COMP2.png"
import armMOB1AbonementImg from "../../assets/abonements/arm MOB1.png"
import armMOB2AbonementImg from "../../assets/abonements/arm MOB2.png"
import {addUserToChat} from '../../store/reducers/MessengerSlice';
import {translations} from "../../utils/translations.tsx";
import HomeRecomendModal from "../Modals/HomeRecomendModal.tsx";
import {Elanguages} from "../../store/reducers/TranslateSlice.ts";
import {isUserDirector, UserRoles} from "../../utils/userRoles.ts";
import BalanceControl from "./BalanceControl/BalanceControl.tsx";
import {getRequisites} from "../../store/reducers/BalansSlice.ts";
import Button from "../UI/Button.tsx";
import BalanceRequestResults from "./BalanceRequestResults.tsx";
import DialogService from '../../services/DialogService.ts';

interface ImageUrls {
    Desk1AbonementImg: string;
    Desk2AbonementImg: string;
    Desk3AbonementImg?: string;
    MOB1AbonementImg: string;
    MOB2AbonementImg: string;
    MOB3AbonementImg?: string;
    MOB4AbonementImg?: string;
}

type LanguageImages = {
    [key in Elanguages]: ImageUrls;
}

enum ECardTypes {
    IDBANK = "ID Bank Armenia",
    TINKOFF = "Тинькофф",
    SBER = "Сбер",
}

const {
    checkYourAccountText,
    copyBtnText,
    paymentDiscountsText,
    paymentDiscount1Text,
    paymentDiscount2Text,
    paymentDiscount3Text,
    writeToAdminIfText,
    weNeedText,
    youSendRequestFor,
    yourRequestSentText,
    ifDontAppearText,
    confirmText,
    cancelText,
    armenianRequisitesText,
    tinkoffRequestsText,
    sberRequestsText,
    basicSubscribtionsText,
    allSubscribtionsText,
    requisitesText,
    copyText,
    copiedText,
    cardNumberText,
    validThruText,
    accountNumberText,
    bicText,
    transferByLinkText,
    sendRequestText,
} = translations.requisites

const images: LanguageImages = {
    am: {
        Desk1AbonementImg: armDesk1AbonementImg,
        Desk2AbonementImg: armDesk2AbonementImg,
        MOB1AbonementImg: armMOB1AbonementImg,
        MOB2AbonementImg: armMOB2AbonementImg,
    },
    ru: {
        Desk1AbonementImg: rusDesk1AbonementImg,
        Desk2AbonementImg: rusDesk2AbonementImg,
        Desk3AbonementImg: rusDesk3AbonementImg,
        MOB1AbonementImg: rusMOB1AbonementImg,
        MOB2AbonementImg: rusMOB2AbonementImg,
        MOB4AbonementImg: rusMOB4AbonementImg,
        MOB3AbonementImg: rusMOB3AbonementImg,
    },
    en: {
        Desk1AbonementImg: engDesk1AbonementImg,
        Desk2AbonementImg: engDesk2AbonementImg,
        MOB1AbonementImg: engMOB1AbonementImg,
        MOB2AbonementImg: engMOB2AbonementImg,
    }
}

const CopyBtn: FC<{ text: string | undefined }> = ({text}) => {
    const [copied, setCopied] = useState(false)
    const language = useAppSelector(state => state.TranslateSlice.language)

    const onCopy = () => {
        if (text) copy(text);
        setCopied(true)
    }

    return (
        <span
            className='font-bold italic cursor-pointer'
            onClick={onCopy}
        >
            &#32;({copied ? copiedText[language] : (copyText[language])})
        </span>
    )
}

const cardTypesTexts = {
    [ECardTypes.IDBANK]: armenianRequisitesText,
    [ECardTypes.TINKOFF]: tinkoffRequestsText,
    [ECardTypes.SBER]: sberRequestsText,
}

const Balance: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const language = useAppSelector(state => state.TranslateSlice.language)
    const {user} = useAppSelector(state => state.UserSlice);
    const requisits = useAppSelector(state => state.BalanceSlice.requisites)
    const chatForChecks = useAppSelector(state => state.BalanceSlice.chatForChecks)
    const [isRecomendModalOpened, setIsRecomendModalOpened] = useState(false)
    const [activeRequestType, setActiveRequestType] = useState<ECardTypes | "">("")
    const [changeRequisiteSuccessModalOpened, setChangeRequisiteSuccessModalOpened] = useState<boolean>(false)
    const info = requisits.find(item => item.requisiteID === user.requizits)

    const [modal, setModal] = useState<boolean>(false);

    const cardTypesContainerRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
        if (!requisits.length) dispatch(getRequisites())
    }, []);

    const setRequizitsHandler = async (type: string) => {
        await dispatch(setRequizits(type));
        setModal(false);
    }


    const handleChatAdmin = async () => {
        if (!chatForChecks) return;
        await dispatch(addUserToChat({email: user.email, dialog_id: chatForChecks._id})).then((res) => {
            if (res.payload === undefined || res !== undefined) {
                navigate(`/messenger/chat/${chatForChecks._id}`);
            }
        });
    }

    const onSendRequest = async (cardType: ECardTypes) => {
        const curRequisite = requisits.filter(item => item.cardType === cardType).sort((a,b) => a.users - b.users)[0]

        if(curRequisite) {
            try {
                await dispatch(editUser({requizits: curRequisite.requisiteID}))
                setActiveRequestType("")
                setChangeRequisiteSuccessModalOpened(true)
            } catch (e) {
                console.error(e)
            }
        }
    }

    const onOpenRecomendModal = () => setIsRecomendModalOpened(true)

    const addStudentsToReceiptsChat = () => {
        void DialogService.addStudentsToReceiptsChat();
    }

    return (
        <div className='w-full flex flex-col items-center px-3 py-3  bg-[#f0f0f0] rounded-xl'>
            <BalanceRequestResults cardTypesContainerRef={cardTypesContainerRef.current}/>
            <a className='bg-gradient-button rounded-lg text-center md:rounded-full px-3 md:px-10 py-1 md:py-3 mb-5 font-semibold text-xl md:text-2xl shadow-lg hover:bg-gradient-appricot'
               target='_blank'
               href="https://shakhmatnayashkolaararat.s20.online/customer/1/profile/index">{checkYourAccountText[language]}</a>
            {
                isUserDirector(user.role, true) &&
                <BalanceControl/>
            }
            <div className="flex flex-col md:flex-row mb-5 max-2xl:mb-1">
                <ul className='text-center flex flex-col justify-center bg-white max-w-[520px] w-full mr-5'>
                    <li className='border-b px-2 sm:px-10 py-1 sm:py-2 font-bold text-red-400 text-2xl max-2xl:text-xl'>{paymentDiscountsText[language]}</li>
                    <li className='border-b px-2 sm:px-10 py-1 sm:py-2'>{paymentDiscount1Text[language]}</li>
                    <li className='border-b px-2 sm:px-10 py-1 sm:py-2'>{paymentDiscount2Text[language]}</li>
                    <li className='border-b px-2 sm:px-10 py-1 sm:py-2'>{paymentDiscount3Text[language]}</li>
                    <div className='mx-auto'>
                        <button
                            onClick={onOpenRecomendModal}
                            className="w-fit bg-gradient-button rounded-full mt-2 px-1 sm:px-5 py-2  items-center font-semibold shadow-lg hover:text-black hover:bg-gradient-appricot text-blue-500 text-[12px] sm:text-[14px] xl:text-[18px] leading-normal"
                        >
                            <p>{copyBtnText[language]}</p>
                        </button>
                    </div>
                </ul>
                <div className="bg-white flex flex-col p-5 text-center max-w-[520px] w-full">
                    <h1 className='text-center mb-3 uppercase font-bold text-[#8a6e3e] text-3xl max-2xl:text-xl max-2xl:mb-1'>{requisitesText[language]}</h1>
                    <h2 className='text-yellow-400 text-2xl font-semibold mb-3'>
                        {
                            info?.linkTitle &&
                                info.linkTitle[language]
                        }
                    </h2>
                    <div className="flex flex-col border">
                        {info?.link &&
                            <div className="flex flex-col border-b text-center px-10 py-2">
                                <p className='font-bold'>{transferByLinkText[language]}</p>
                                <a className='text-yellow-400 font-bold break-words'
                                   href={info.link}>{info.link}</a>
                            </div>
                        }
                        <p className='border-b px-2 md:px-10 py-1 md:py-2'>{cardNumberText[language]} <span
                            className='text-red-500 font-bold'>{info?.card}</span>
                            <CopyBtn text={info?.card}/>
                        </p>
                        {
                            info?.expireDate &&
                            <p className='border-b px-2 md:px-10 py-1 md:py-2'>{validThruText[language]} <span
                                className='text-red-500 font-bold'>{info?.expireDate}</span>
                                <CopyBtn text={info?.card}/>
                            </p>
                        } 
                        <p className='border-b px-2 md:px-10 py-1 md:py-2'>{info?.ownerEn}
                            <CopyBtn text={info?.ownerEn}/>
                        </p>
                        { user.role !== UserRoles.STUDENT && info?.ownerRu && (
                            <p className='border-b px-2 md:px-10 py-1 md:py-2'>{info?.ownerRu}
                                <CopyBtn text={info?.ownerRu}/>
                            </p>
                        )}    
                        {
                            info?.accountNumber &&
                            <p className='px-2 md:px-10 py-1 md:py-2'>{accountNumberText[language]}
                                <span
                                    className='text-red-500 font-bold'>{info?.accountNumber}</span>
                                <CopyBtn text={info?.accountNumber}/>
                            </p>
                        }
                        {
                            info?.bic &&
                            <p className='px-2 md:px-10 py-1 md:py-2'>{bicText[language]}
                                <span
                                    className='text-red-500 font-bold'>{info?.bic}</span>
                                <CopyBtn text={info?.bic}/>
                            </p>
                        }
                        {info?.transferByCardText && info.transferByCardText[language] && (
                            <p className='border-t px-10 py-2 max-w-[600px]'>{info.transferByCardText[language]}</p>
                        )}
                        {info?.disclosuresData &&
                            info.disclosuresData.map(data => (
                                <Disclosure key={data.id} as='div' className='mb-2 w-full max-w-[600px] px-3'>
                                    {({open}) => (
                                        <>
                                            <Disclosure.Button
                                                className="flex w-full justify-between rounded-lg bg-gray-300 px-4 py-3 text-left text-base font-medium text-gray-900 hover:bg-gray-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                                <span className='font-bold'>{data.title[language]}</span>
                                                {open ? <IoIosArrowUp className='h-5 w-5 text-gray-900'/> :
                                                    <IoIosArrowDown className='h-5 w-5 text-gray-900'/>}
                                            </Disclosure.Button>
                                            <Disclosure.Panel
                                                className="border border-gray-300 px-4 pt-4 pb-2 text-base text-gray-900 whitespace-pre-wrap">
                                                {data.body[language]}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            ))
                        }
                    </div>
                </div>
            </div>


            <div
                className="lg:max-w-[calc(100%-300px)] 2xl:max-w-[calc(100%-100px)] flex flex-col justify-center items-center justify-items-center">
                <p className="leading-[1.7] text-center text-red-500 text-2xl font-bold">{basicSubscribtionsText[language][0]}
                    <span
                        onClick={handleChatAdmin}
                        className="bg-gradient-button rounded-full px-5 py-2 mx-2 items-center font-semibold text-2xl shadow-lg hover:bg-gradient-appricot hover:text-black text-blue-500 cursor-pointer">{basicSubscribtionsText[language][1]}</span>{basicSubscribtionsText[language][2]}
                </p>
                <br/><br/>
                {
                    images[language].Desk1AbonementImg &&
                    <img className='hidden lg:block' src={images[language].Desk1AbonementImg} alt="abonements"/>}
                {images[language].MOB1AbonementImg &&
                    <img className='block w-full lg:hidden' src={images[language].MOB1AbonementImg}
                         alt="abonements"/>}

                {
                    images[language].Desk2AbonementImg &&
                    <img className='hidden lg:block' src={images[language].Desk2AbonementImg} alt="abonements"/>
                }
                {
                    images[language].MOB2AbonementImg &&
                    <img className='block w-full lg:hidden' src={images[language].MOB2AbonementImg}
                         alt="abonements"/>
                }
            </div>

            <a className='bg-gradient-button rounded-lg text-red-500 text-center md:rounded-full px-3 md:px-10 py-1 md:py-3 font-semibold text-xl md:text-2xl shadow-lg mt-10 max-2xl:mt-5 mb-5 max-2xl:mb-5 hover:bg-gradient-appricot hover:text-black'
               href="https://araratchess.ru/prices/" target='_blank'>{allSubscribtionsText[language]}</a>
            <div
                className="w-full lg:max-w-[calc(100%-300px)] 2xl:max-w-[calc(100%-100px)] flex flex-col items-center">
                {images[language].Desk3AbonementImg
                    && <img className='hidden lg:block' src={images[language].Desk3AbonementImg} alt="abonements"/>}
                {images[language].MOB3AbonementImg &&
                    <img className='block w-full lg:hidden' src={images[language].MOB3AbonementImg}
                         alt="abonements"/>}
                {images[language].MOB3AbonementImg &&
                    <img className='block w-full lg:hidden' src={images[language].MOB4AbonementImg}
                         alt="abonements"/>}
            </div>
            <p className="font-bold text-xl mt-5 mb-3 leading-[2]">{writeToAdminIfText[language]}</p>
            <ul className='mb-5 max-2xl:mb-0' ref={cardTypesContainerRef}>
                {
                    Object.keys(cardTypesTexts).filter(item => item !== info?.cardType).map((item, index) => (
                        <li key={index}
                            className='mb-2'>{index + 1}. {weNeedText[language]} {cardTypesTexts[item as ECardTypes][language]} <span
                            onClick={() => setActiveRequestType(item as ECardTypes)}
                            className='font-bold italic text-blue-500 cursor-pointer'
                        >({sendRequestText[language]})</span></li>
                    ))
                }
            </ul>
            {user.role === UserRoles.DIRECTOR && (
                // временно
                <Button onClick={addStudentsToReceiptsChat}>Добавить всех студентов в чат с чеками</Button>
            )}
            <Modal noclosable={true} active={modal} className='!max-w-[700px]' setActive={setModal}>
                <div className="flex flex-col items-center">
                    <h1 className='text-center text-xl'>Для оплаты обучения вам нужны:<br/> 1. Армянские реквизиты в
                        валюте евро.<br/>2. Русские реквизиты в валюте рубли.</h1>
                    <div className="flex items-center mt-3">
                        <MainButton className='mr-5'
                                    onClick={() => void setRequizitsHandler('arm')}>Армянские</MainButton>
                        <MainButton onClick={() => void setRequizitsHandler('russian')}>Русские</MainButton>
                    </div>

                </div>
            </Modal>
            <Modal
                active={!!(activeRequestType)}
                setActive={(_: boolean) => setActiveRequestType("")}
                className={'!max-w-[700px]'}
            >
                <h1 className='text-center text-xl dark:text-white mb-3 mt-[30px]'>{youSendRequestFor[language]} {cardTypesTexts[activeRequestType as ECardTypes]?.[language] || ""}</h1>
                <div className={'flex gap-[8px] justify-center'}>
                    <Button
                        className='bg-green-600'
                        onClick={() => void onSendRequest(activeRequestType as ECardTypes)}
                    >{confirmText[language]}</Button>
                    <Button
                        className='bg-red-600'
                        onClick={() => void setActiveRequestType('')}
                    >{cancelText[language]}</Button>
                </div>

            </Modal>

            <Modal
                active={changeRequisiteSuccessModalOpened}
                setActive={setChangeRequisiteSuccessModalOpened}
                className={'!max-w-[700px]'}
            >
                <h1 className='text-center text-xl dark:text-white mb-4 mt-[30px]'>{yourRequestSentText[language]}</h1>
                <h3 className='text-center text-[16px] dark:text-white mb-3'>
                    {ifDontAppearText[language][0]} <a href="https://wa.me/+37499553191" className='bg-green-500 rounded-full px-1 py-1 text-white'>{ifDontAppearText[language][1]}</a>{ifDontAppearText[language][2]}
                </h3>
                <div className={'flex gap-[8px] justify-center'}>
                    <Button
                        onClick={() => void setChangeRequisiteSuccessModalOpened(false)}
                    >Ok</Button>

                </div>

            </Modal>
            <HomeRecomendModal
                active={isRecomendModalOpened}
                onClose={setIsRecomendModalOpened}
            />
        </div>
    )
}

export default Balance;