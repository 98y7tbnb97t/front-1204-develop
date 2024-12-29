import {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {translations} from "../../utils/translations.tsx";
import {AiFillLike} from "@react-icons/all-files/ai/AiFillLike";
import Button from "../UI/Button.tsx";
import {AiFillDislike} from "@react-icons/all-files/ai/AiFillDislike";
import {deleteAcceptedRequests} from "../../store/reducers/UserSlice.ts";
import copy from "copy-to-clipboard";


const {
    requestUpdateRejectText,
    requisitesNotUpdatedText,
    requisitesUpdatedText,
    copyText,
    copiedText
} = translations.requisites

const BalanceRequestResults: FC<{ cardTypesContainerRef: HTMLUListElement | null }> = ({cardTypesContainerRef}) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.UserSlice.user)
    const language = useAppSelector(state => state.TranslateSlice.language)
    const [opened, setOpened] = useState<boolean>(false)
    const [copied, setCopied] = useState<boolean>(false)
    const requisiteRequest = user.editRequest && user.editRequest.find(item => item.field === 'requizits' && (item.acceptedAt || item.rejectedAt))

    useEffect(() => {
        if (requisiteRequest) {
            setOpened(true)
        }
    }, [requisiteRequest]);


    const onCopy = () => {
        setCopied(true)
        copy(requestUpdateRejectText[language])
        setTimeout(() => setCopied(false), 1000)
    }

    const onAccept = async (scrollTo?: boolean) => {
        try {
            await dispatch(deleteAcceptedRequests({id: user._id, isRequisite: true}))
            setOpened(false)
            if (scrollTo && cardTypesContainerRef) cardTypesContainerRef.scrollIntoView({behavior: 'smooth'})
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            {
                !!(requisiteRequest && opened) &&
                <div className={'bg-blue-200 w-full p-2 mb-2 rounded-[10px]'}>
                    <>
                        <h1 className={'text-[30px] text-center mb-3'}>
                            {(requisiteRequest?.acceptedAt ? requisitesUpdatedText : requisitesNotUpdatedText)[language]}
                            {requisiteRequest?.acceptedAt && new Date(requisiteRequest.acceptedAt).toLocaleDateString()}
                        </h1>
                        {
                            !!(requisiteRequest?.rejectedAt) &&
                            <p className={'text-[16px] dark:text-white mb-4'}>
                                {requestUpdateRejectText[language]}
                                <i className={'font-bold cursor-pointer text-blue-500'} onClick={onCopy}>
                                    ({(copied ? copiedText : copyText)[language]})
                                </i>
                            </p>
                        }
                        {
                            requisiteRequest?.acceptedAt
                                ? <div className={'flex justify-center gap-2 max-w-[300px] mx-auto'}>
                                    <Button onClick={() => onAccept(false)}
                                            className={'bg-green-500 text-white !text-[20px]'}>
                                        <AiFillLike/>
                                    </Button>
                                    <Button onClick={() => onAccept(true)} className={'bg-red-500 text-white !text-[20px]'}>
                                        <AiFillDislike/>
                                    </Button>
                                </div>
                                : <Button onClick={() => onAccept(false)}>
                                    OK
                                </Button>


                        }
                    </>
                </div>
            }
        </>
    );
}

export default BalanceRequestResults;