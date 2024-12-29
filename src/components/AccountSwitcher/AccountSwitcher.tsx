import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import {
  createSession,
  getSession,
  removeUserFromSession,
} from '../../store/reducers/SessionSlice';
import { switchUser } from '../../store/reducers/UserSlice';
import MainButton from '../UI/MainButton.tsx';

const AccountSwitcher = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.UserSlice);
  const { session, isLoading } = useAppSelector((state) => state.SessionSlice);
  const navigate = useNavigate();

  const filteredUsers = session
    ? session.users?.filter((currentUser) => currentUser._id !== user._id)
    : [];

  const handleUserAccounts = () => {
    if (session && session._id) {
      navigate(`/login?sessionId=${session._id}`);
    }
  };

  const handleRemoveUser = async (userId: string) => {
    await dispatch(removeUserFromSession(userId));
  };

  const handleSwitchUser = async (userId: string) => {
    await dispatch(switchUser(userId));
  };

  useEffect(() => {
    const fetchSession = async () => {
      if (user._id && session === null && !isLoading) {
        await dispatch(getSession(user._id));
      }
      if (session && session.users?.length === 0!) {
        await dispatch(createSession(user._id));
      }
    };
    void fetchSession();
  }, [dispatch, user._id, session, isLoading]);

  return (
    <div>
      {filteredUsers.length > 0 && (
        <p className="font-bold text-2xl text-center mb-2">
          Переключиться на аккаунт
        </p>
      )}
      {session && (
        <div className="flex flex-col gap-2 mb-4">
          {filteredUsers.map((currentUser) => (
            <div
              key={currentUser._id}
              className="flex justify-between border border-[#B7975A] hover:bg-gray-100 cursor-pointer rounded-xl"
            >
              <button
                className="p-2 flex gap-4 flex-grow flex-shrink"
                onClick={() => void handleSwitchUser(currentUser._id)}
              >
                <p>{`${currentUser.name} ${
                  currentUser.sname ? currentUser.sname : ''
                }`}</p>
                <p>{currentUser.email}</p>
              </button>
              <button
                className="p-2 font-bold hover:text-red-600"
                onClick={() => void handleRemoveUser(currentUser._id)}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
      {session && filteredUsers.length < 1 && (
        <p className="font-bold text-2xl text-center mb-4">
          У вас нет других аккаунтов
        </p>
      )}

      <MainButton
        onClick={() => handleUserAccounts()}
        type="button"
        className="mx-auto"
      >
        Добавить аккаунт
      </MainButton>
    </div>
  );
};

export default AccountSwitcher;
