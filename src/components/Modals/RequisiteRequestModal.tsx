import  {FC} from "react";
import Modal from "../UI/Modal.tsx";
import Button from "../UI/Button.tsx";
import {IRequisite} from "../../models/IRequisite.ts";
import {translations} from "../../utils/translations.tsx";
import {useAppSelector} from "../../hooks/redux.ts";

interface RequisiteRequestModalProps {
    requisiteRequestsOpenedId: string
    closeRequisitesRequests: () => void
    curRequisiteRequest: IRequisite | undefined
    onAcceptUserEdits: (id: string, data: { [key in string]: boolean }) => void,
}

const {
    parentAsksNewRequisitesText,
    acceptText,
    rejectText,
} = translations.access

const RequisiteRequestModal:FC<RequisiteRequestModalProps> = ({
                                                                  requisiteRequestsOpenedId,
                                                                  closeRequisitesRequests,
                                                                  curRequisiteRequest,
                                                                  onAcceptUserEdits
                                                              }) => {
    const language = useAppSelector(state => state.TranslateSlice.language)


    const onSubmit = (accepted: boolean) => {
        onAcceptUserEdits(requisiteRequestsOpenedId,{requizits: accepted})
        closeRequisitesRequests()
    }

    return (
        <Modal
            active={!!(requisiteRequestsOpenedId)}
            setActive={(_: boolean) => closeRequisitesRequests()}
            className={'max-w-[800px]'}
        >
            <h1 className='text-2xl mb-5 font-semibold tracking-wider text-gray-800 capitalize text-center dark:text-white'>
                {parentAsksNewRequisitesText[language]} <br/>
                <span
                    className={'text-blue-500'}>{curRequisiteRequest ? `${curRequisiteRequest.cardType} (${curRequisiteRequest.ownerEn})` : ""}</span>
            </h1>
            <div className={'flex gap-2 justify-center'}>
                <Button
                    className={'bg-green-500'}
                    onClick={() => onSubmit(true)}
                >{acceptText[language]}</Button>
                <Button
                    className={'bg-red-500'}
                    onClick={() => onSubmit(false)}
                >{rejectText[language]}</Button>
            </div>
        </Modal>
    );
}

export default RequisiteRequestModal;