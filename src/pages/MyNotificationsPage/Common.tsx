import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IAutoSMS } from "../../models/IAutoSMS";
import { toggleAutoSMS, deleteAutoSMS, getSchoolAutoSMS } from "../../store/reducers/AutoSMSSlice";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import Switch from "../../components/UI/Switch";
import Button from "../../components/UI/Button";
import Modal from "../../components/UI/Modal";
import AutoSMSEditModal from "../../components/Modals/AutoSMSEditModal";
import { getInfoText } from "../../store/reducers/InfoTextsSlice";
import { EInfoTextFields } from "../../models/IInfoTexts";
import AddAdditionalNotificationsModal from "../../components/Modals/AddAdditionalNotificationsModal";
import { translations } from "../../utils/translations";
import { UserRoles } from "../../utils/userRoles";
import NotificationModal from "../../components/Modals/NotificationModal";

const Common:FC = () => {
  const dispatch = useAppDispatch();
  const autoSMSList = useAppSelector(state => state.AutoSMSSlice.autoSMSList);
  const { language } = useAppSelector((state) => state.TranslateSlice);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [autoSMSToEdit, setAutoSMSToEdit] = useState<IAutoSMS | null>(null);
  const [additionalNotificationModal, setAdditionalNotificationModal] = useState<boolean>(false);
  const [notificationModal, setNotificationModal] = useState<boolean>(false);
  const [autoSMS, setAutoSMS] = useState<IAutoSMS | null>(null);
  const user = useAppSelector(state => state.UserSlice.user);

  const {
    schoolNotifications,
    addAdditionalNotifications,
    deleteNotification,
    cancelText,
    yesText
  } = translations.autoSMS;

  useEffect(() => {
    const fetchData = () => {
        if ([UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(user.role)) {
            void dispatch(getSchoolAutoSMS())
        }
    }
    if (user._id) {
      void fetchData();
    }
    void dispatch(getInfoText({ field: EInfoTextFields.myNotificationsText }));
	}, [user._id, dispatch, user.role])

  const handleToggle = async (autoSMSId: string, enabled: boolean) => {
    await dispatch(toggleAutoSMS({ autoSMSId, enabled }));
  };

  const handleEdit = (autoSMS: IAutoSMS) => {
    setAutoSMSToEdit(autoSMS);
    setEditModal(true);
  };

  const handleEditNotification = (autoSMS: IAutoSMS) => {
    setAutoSMSToEdit(autoSMS);
    setNotificationModal(true);
  };

  const handleDelete = async (autoSMSId: string | null) => {
    if (autoSMSId) {
      await dispatch(deleteAutoSMS(autoSMSId));
    }
    setConfirmDeleteModal(false);
  };

  const showConfirmDelete = (id: string) => {
    setConfirmDeleteModal(true);
    setDeleteId(id);
  }

  const additionalNotificationHandler = (autoSMS: IAutoSMS) => {
    setAdditionalNotificationModal(true);
    setAutoSMS(autoSMS);
  }

  const handleAddNotification = () => {
    setNotificationModal(true);
    setAutoSMSToEdit(null);
  }
  return (
    <div className="w-full p-5 flex flex-col gap-5">
        <h1 className="text-center text-xl font-medium">{schoolNotifications[language]}</h1>
        {
          [UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(user.role) 
          && <Button onClick={handleAddNotification} className="bg-sky-500 max-w-96 ml-auto">Добавить Уведомление/Напоминание</Button>
        }
        {autoSMSList.filter(autoSMS => !autoSMS?.isPersonal).map(autoSMS => (
          <div key={autoSMS._id} className="flex justify-between items-center mb-2 border-b border-gray-300  p-2">
            <span>{autoSMS.title}</span>
            {
              [UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(user.role) ?
              <div className="flex gap-2">
                  <Switch value={autoSMS.enabled} onChange={(enabled: boolean) => void handleToggle(autoSMS._id, enabled)} />
                  {autoSMS.type ? 
                    <Button className="bg-sky-500" onClick={() => handleEditNotification(autoSMS)}><FaEdit /></Button> :
                    <Button className="bg-sky-500" onClick={() => handleEdit(autoSMS)}><FaEdit /></Button>
                  }
                  <Button className="bg-red-500" onClick={() => showConfirmDelete(autoSMS._id)}><FaTrash /></Button>
              </div> :
              <Button className="bg-sky-500 max-w-96" onClick={() => additionalNotificationHandler(autoSMS)}>{addAdditionalNotifications[language]}</Button>
            }
            
          </div>
        ))}
        
			<Modal active={confirmDeleteModal} setActive={setConfirmDeleteModal} className="!bg-white p-3">
        <h2 className="text-lg text-center mb-4">{deleteNotification[language]}</h2>
        <div className="flex gap-2 justify-end">
          <Button onClick={() => setConfirmDeleteModal(false)}>{cancelText[language]}</Button>
          <Button onClick={() => handleDelete(deleteId)} className="bg-red-500">{yesText[language]}</Button>
        </div>
      </Modal>
      <AutoSMSEditModal active={editModal} setActive={setEditModal} autoSMS={autoSMSToEdit} />
      { autoSMS && <AddAdditionalNotificationsModal active={additionalNotificationModal} setActive={setAdditionalNotificationModal} autoSMS={autoSMS} />}
      {<NotificationModal autoSMS={autoSMSToEdit} active={notificationModal} setActive={setNotificationModal}/>}
    </div>
  );
}

export default Common;