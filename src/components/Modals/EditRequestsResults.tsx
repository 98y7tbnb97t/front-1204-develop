import {FC, useEffect, useState} from 'react';
import {getValueAndFieldText} from "../../utils/getValueAndFieldText.tsx";
import Button from "../UI/Button.tsx";
import Modal from "../UI/Modal.tsx";
import AuthService from "../../services/AuthService.ts";
import {useAppSelector} from "../../hooks/redux.ts";
import {useNavigate} from "react-router-dom";
import {translations} from "../../utils/translations.tsx";
import {getUserRejectedRequests} from "../../utils/getUserRejectedRequests.ts";

const {
    editRequestResultsTitleText,
    updateText,
    profileBtnText,
    rejectedText,
    acceptedText,
} = translations.editRequestResults

const EditRequestsResults: FC = () => {
    const navigate = useNavigate()
    const language = useAppSelector((state) => state.TranslateSlice.language);
    const user = useAppSelector((state) => state.UserSlice.user);

    const [editRequestsModalOpened, setEditRequestsModalOpened] = useState<boolean>(false)
    const [modalShowed, setModalShowed] = useState(false)

    const onCloseEditRequestsModal = async (navigateToProfile?: boolean) => {
        await AuthService.deleteAcceptedRequests(user._id)
        setEditRequestsModalOpened(false)
        if (navigateToProfile) navigate('/profile')
    }

    useEffect(() => {
        if (
            !modalShowed &&
            user &&
            user.editRequest &&
            user.editRequest.find(item => (
                item.field !== 'requizits' && (item.acceptedAt || getUserRejectedRequests(user,item))
            ))
        ) {
            setEditRequestsModalOpened(true)
            setModalShowed(true)
        }
    }, [user]);

    return (
        <Modal active={editRequestsModalOpened} setActive={onCloseEditRequestsModal} className={'!max-w-[1000px]'}>
            <h2 className={'dark:text-white text-[30px] text-center font-bold mb-[24px]'}>{editRequestResultsTitleText[language]}</h2>
            {
                user.editRequest &&
                user.editRequest.filter(item => item.acceptedAt && item.field !== 'requizits').map((item, idx) => {
                    const {name, value} = getValueAndFieldText(item, language)
                    const acceptedAt = item?.acceptedAt
                        ? new Date(item?.acceptedAt).toLocaleDateString()
                        : ""
                    if (item.field === 'shedule') {
                        return (
                            <div key={idx}>
                                <p className={'dark:text-white w-full'}>{name} - </p>
                                    {value}
                                <p>
                                    <span className={'text-green-600 font-medium'}>({acceptedText[language]} - {acceptedAt})</span>
                                </p>
                            </div>
                        )
                    }
                    return (
                        <p key={idx} className={'dark:text-white w-full'}>{name} - <strong
                            className={'text-blue-500'}>{value}</strong> <span
                            className={'text-green-600 font-medium'}>({acceptedText[language]} - {acceptedAt})</span>
                        </p>
                    )
                })
            }
            <br/>
            {
                user.editRequest &&
                user.editRequest.filter(item => getUserRejectedRequests(user,item)).map(item => {
                    const {name, value} = getValueAndFieldText(item, language)
                    const rejectedAt = item?.rejectedAt
                        ? new Date(item?.rejectedAt).toLocaleDateString()
                        : ""
                    return (
                        <p className={'dark:text-white w-full'}>{name} - <strong
                            className={'text-blue-500'}>{value}</strong> <span
                            className={'text-red-600 font-medium'}>({rejectedText[language]} - {rejectedAt})</span></p>
                    )
                })
            }

            <h4 className={'text-[20px] font-medium text-center dark:text-white my-[15px]'}>{updateText[language]}</h4>
            <Button onClick={() => onCloseEditRequestsModal(true)}>{profileBtnText[language]}</Button>
        </Modal>
    );
}

export default EditRequestsResults;