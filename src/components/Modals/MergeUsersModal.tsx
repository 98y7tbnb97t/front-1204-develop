import React, { useEffect, useState } from 'react';
import Modal from '../UI/Modal';
import PermissionsService from '../../services/PermissionsService'; // Импортируйте getUsers
import { User } from '../../models/User';
import { UserRoles } from '../../utils/userRoles';
import classNames from 'classnames';
import { useDebounce } from '../../hooks/useDebounce';
import TestLessonService from '../../services/TestLessonService';
import { translations } from '../../utils/translations';
import { useAppSelector } from '../../hooks/redux';

interface IProps {
  modal: boolean;
  setModal: (modal: boolean) => void;
  userToMerge: string;
  onMerge: (id: string) => void;
}

const MergeUsersModal: React.FC<IProps> = ({ modal, setModal, userToMerge, onMerge }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const language = useAppSelector(state => state.TranslateSlice.language);
  const { mergeStudentText, mergeWithText, mergeText, searchUserText } = translations.testLesson;

  const fetchUsers = useDebounce(async () => {
      if (searchTerm !== '') {
          const fetchedUsers = await PermissionsService.getUsers(UserRoles.STUDENT, searchTerm);
          setUsers(fetchedUsers.data.users);
      } else {
          setUsers([]);
      }
  }, 1000);

  useEffect(() => {
    void fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleMerge = () => {
    if (selectedUser) {
      void TestLessonService.mergeUsers(userToMerge, selectedUser._id).then(() => {
        setModal(false);
      });
      onMerge(userToMerge);
    }
  };

  return (
    <Modal active={modal} setActive={setModal} className='!bg-white p-5'>
    <h3 className='text-xl font-bold mb-4 text-center'>{mergeStudentText[language]}</h3>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder={searchUserText[language]}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2"
        />
      </div>
      { selectedUser && (
        <div className=" mb-4">
          <p className="text-lg font-bold">{mergeWithText[language]}:</p>
          <p className="text-lg font-bold">{selectedUser.email} - {selectedUser.name} {selectedUser.sname}</p>
        </div>
      )}
      {users.length > 0 && (
        <ul className="border rounded p-2 max-h-[200px] overflow-y-auto">
          {users.map(user => (
            <li key={user._id} className={classNames('p-2 hover:bg-gray-200 cursor-pointer', {
              'bg-gray-200': selectedUser?._id === user._id,
            })} onClick={() => setSelectedUser(user)}>
              {user.email} - {user.name} {user.sname}
            </li>
          ))}
        </ul>
      )}
      <button disabled={!selectedUser} className='bg-blue-500 text-white p-2 rounded mt-2' onClick={handleMerge}>{mergeText[language]}</button>
    </Modal>
  );
};

export default MergeUsersModal;
