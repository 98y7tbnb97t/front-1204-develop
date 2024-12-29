import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IAutoSMS } from "../../models/IAutoSMS";
import { toggleAutoSMS, deleteAutoSMS, getAllAutoSMS } from "../../store/reducers/AutoSMSSlice";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import Switch from "../../components/UI/Switch";
import Button from "../../components/UI/Button";
import Modal from "../../components/UI/Modal";
import AutoSMSEditModal from "../../components/Modals/AutoSMSEditModal";
import { getInfoText } from "../../store/reducers/InfoTextsSlice";
import { EInfoTextFields } from "../../models/IInfoTexts";
import { translations } from "../../utils/translations";
import classNames from "classnames";
import { User } from "../../models/User";

const Private:FC = () => {
  const dispatch = useAppDispatch();
  const autoSMSList = useAppSelector(state => state.AutoSMSSlice.autoSMSList);
  const { language } = useAppSelector((state) => state.TranslateSlice);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [autoSMSToEdit, setAutoSMSToEdit] = useState<IAutoSMS | null>(null);
  const user = useAppSelector(state => state.UserSlice.user);

  const {
    deleteNotification,
    cancelText,
    yesText
  } = translations.autoSMS;

  useEffect(() => {
    const fetchData = () => {
      void dispatch(getAllAutoSMS({ isPrivate: true }))
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

  return (
    <div className="w-full p-5 flex flex-col gap-5">
        <h2 className="text-center text-xl font-medium">Уведомления пользователей</h2>
        <div
          className={classNames("grid gap-2 mb-2 border-b border-gray-300  p-2")}
          style={{gridTemplateColumns: '1fr 3fr 1fr'}}
        >
          <span>E-mail</span>
          <span>Название</span>
          <span></span>
        </div>
				{autoSMSList.filter(sms => (sms.usersToSend?.at(0) as unknown as User)?._id !== user._id).map(autoSMS => (
          <div 
            key={autoSMS._id}
            className={classNames("grid gap-2 mb-2 border-b border-gray-300  p-2", {
              'bg-red-200': autoSMS.isAdditional
            })}
            style={{gridTemplateColumns: '1fr 3fr 1fr'}}
          >
            <span>{(autoSMS.usersToSend?.at(0) as unknown as User)?.email}</span>
            <span>{autoSMS.title}</span>
            <div className="flex gap-2">
              <Switch value={autoSMS.enabled} onChange={(enabled: boolean) => void handleToggle(autoSMS._id, enabled)} />
              <Button className="bg-sky-500" onClick={() => handleEdit(autoSMS)}><FaEdit /></Button>
              <Button className="bg-red-500" onClick={() => showConfirmDelete(autoSMS._id)}><FaTrash /></Button>
            </div>
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
    </div>
  );
}

export default Private;