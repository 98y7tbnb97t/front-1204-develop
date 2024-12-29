import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import Modal from "../UI/Modal";
import Switch from "../UI/Switch";
import Button from "../UI/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { deleteAutoSMS, getAllAutoSMS, toggleAutoSMS } from "../../store/reducers/AutoSMSSlice";
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import { FaEdit } from '@react-icons/all-files/fa/FaEdit';
import AutoSMSEditModal from "./AutoSMSEditModal";
import { IAutoSMS } from "../../models/IAutoSMS";
import AutoSMSModal from "./AutoSMSModal";
import { User } from "../../models/User";
import { UserRoles } from "../../utils/userRoles";
import { translations } from "../../utils/translations";

interface AutoSMSListModalProps {
  className?: string;
  dialog_id?: string;
  user_id?: string;
  users: User[];
}

const AutoSMSListModal:FC<AutoSMSListModalProps> = ({ className, dialog_id, user_id, users }) => {
  const dispatch = useAppDispatch();
  const autoSMSList = useAppSelector(state => state.AutoSMSSlice.autoSMSList);
  const language = useAppSelector(state => state.TranslateSlice.language);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [autoSMSToEdit, setAutoSMSToEdit] = useState<IAutoSMS | null>(null);
  const [addAutoSMSModal, setAddAutoSMSModal] = useState<boolean>(false);
  const user = useAppSelector(state => state.UserSlice.user);
  const [active, setActive] = useState<boolean>(false);

  const { addText, deleteNotification, cancelText, closeText, yesText } = translations.autoSMS;

  useEffect(() => {
		const fetchData = () => {
			void dispatch(getAllAutoSMS({ dialog_id, user_id }))
		}
    if ((dialog_id || user_id)) {
      void fetchData();
    }
	}, [dialog_id, user_id, dispatch])

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

  const canEdit = ([UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(user.role))

  return (
    <div className={className}>
    <Button className='max-w-xs' onClick={() => setActive(true)}>Действующие уведомления {autoSMSList.length}</Button>
      <Modal active={active} setActive={setActive} className={'p-5 !bg-white'}>
        {canEdit && <Button onClick={() => setAddAutoSMSModal(true)} className="bg-sky-500 mb-4 max-w-[200px] ml-auto">{addText[language]}</Button>}
        {autoSMSList.map(autoSMS => (
          <div key={autoSMS._id} className="flex justify-between items-center mb-2 border-b border-gray-300  p-2">
            <span>{autoSMS.title}</span>
            {canEdit && 
              <div className="flex gap-2">
                <Switch value={autoSMS.enabled} onChange={(enabled: boolean) => void handleToggle(autoSMS._id, enabled)} />
                <Button className="bg-sky-500" onClick={() => handleEdit(autoSMS)}><FaEdit /></Button>
                <Button className="bg-red-500" onClick={() => showConfirmDelete(autoSMS._id)}><FaTrash /></Button>
              </div>
            }
          </div>
        ))}
        <Button onClick={() => setActive(false)}>{closeText[language]}</Button>
      </Modal>
      <Modal active={confirmDeleteModal} setActive={setConfirmDeleteModal} className="!bg-white p-3">
        <h2 className="text-lg text-center mb-4">{deleteNotification[language]}</h2>
        <div className="flex gap-2 justify-end">
          <Button onClick={() => setConfirmDeleteModal(false)}>{cancelText[language]}</Button>
          <Button onClick={() => handleDelete(deleteId)} className="bg-red-500">{yesText[language]}</Button>
        </div>
      </Modal>
      <AutoSMSEditModal active={editModal} setActive={setEditModal} autoSMS={autoSMSToEdit} />
      <AutoSMSModal active={addAutoSMSModal} setActive={setAddAutoSMSModal} dialog_id={dialog_id} users={users}/>
    </div>
  );
}

export default AutoSMSListModal;