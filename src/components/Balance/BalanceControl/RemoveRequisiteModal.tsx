import { FC, useState } from 'react'

import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {translations} from "../../../utils/translations.tsx";
import Modal from "../../UI/Modal.tsx";
import Button from "../../UI/Button.tsx";
import SuccessModal from "../../Modals/SuccessModal.tsx";
import {deleteRequisite} from "../../../store/reducers/BalansSlice.ts";

interface RemoveRequisiteModalProps {
    setModal: (bool: boolean) => void,
    _id: string,
}

const RemoveRequisiteModal: FC<RemoveRequisiteModalProps> = ({setModal, _id }) => {
    const dispatch = useAppDispatch()
    const [sModal, setSModal] = useState<boolean>(false);
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        yesText,
        noText,
    } = translations.access

    const {
        sureDeleteGroupText,
        requisiteDeletedSuccessfullyText
    } = translations.requisites

    const Submit = async () => {
        try {
            await dispatch(deleteRequisite({id: _id}))
            setSModal(true)
        } catch (e) {
            console.error(e)
        }
    }

    const onCloseSuccessModal = (val: boolean) => {
        setSModal(val)
        setModal(val)
    }

    return (
        <>
            <Modal active={!!(_id)} setActive={setModal} className='items-center'>
                <p className='mb-5 text-center dark:text-white'>{sureDeleteGroupText[language]}</p>
                <div className="flex items-center">
                    <Button className='mr-5' onClick={()=> void Submit()}>{yesText[language]}</Button>
                    <Button onClick={()=>setModal(false)}>{noText[language]}</Button>
                </div>
            </Modal>
            <SuccessModal modal={sModal} setModal={onCloseSuccessModal} message={requisiteDeletedSuccessfullyText[language]}/>
        </>
    )
}

export default RemoveRequisiteModal;