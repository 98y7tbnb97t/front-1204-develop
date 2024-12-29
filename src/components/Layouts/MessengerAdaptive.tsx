import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { socket } from '../../sockets/socket';
import ChatCall from '../Messenger/Chats/Call/ChatCall';
import Calling from '../Messenger/Chats/Call/Calling';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo_sm_white.png';
import Logo2 from '../../assets/logo2.png';
import Menu from '../Index/Sidebar/Menu.tsx';
import { FiLogOut } from '@react-icons/all-files/fi/FiLogOut';
import MenuMobileAdaptive from '../Index/Sidebar/MenuMobileAdaptive.tsx';
import { logout } from '../../store/reducers/UserSlice.ts';
import GroupOpenedErrorModal from '../Modals/GroupOpenedErrorModal.tsx';
import TrustLessonWarning from '../TrustLessonWarning/TrustLessonWarning.tsx';
import { UserRoles } from '../../utils/userRoles.ts';

const LayoutMessenger: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const { group } = useAppSelector((state) => state.GroupSlice);
  const [modal, setModal] = useState(false);
  const [closedMenu, setClosedMenu] = useState(true);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.UserSlice);
  const [callingState, setCallingState] = useState<boolean>(false);
  const [callState, setCallState] = useState<boolean>(false);
  const [callData, setCallData] = useState<{
    room_id: string;
    name: string;
    sname: string;
    email: string;
  }>({
    room_id: '',
    name: '',
    sname: '',
    email: '',
  });

  const isTrustLesson = useMemo(
    () => user.role == UserRoles.STUDENT && user.trustLesson,
    [user.role, user.trustLesson]
  );

  useEffect(() => {
    socket.on('chat:call_recive', async (data) => {
      const audio = new Audio('/rington.mp3');
      await audio.play();
      setCallingState(true);
      void setCallData({
        room_id: data.room,
        name: data.name,
        sname: data.sname,
        email: data.email,
      });
    });
  }, [socket]); // eslint-disable-line react-hooks/exhaustive-deps

  const logOutHandler = async () => {
    await dispatch(logout());
  };

  const isChat = location.pathname.includes('messenger');
  const isChatsList = location.pathname === '/messenger';
  return (
    <div className="w-full max-w-[100vw] xl:max-w-[1920px] mx-auto h-screen flex flex-col justify-between">
      <div
        className={`h-14  bg-gradient-menu block sm:hidden ${
          isChatsList ? 'hidden' : ''
        }`}
      >
        <div className="h-full relative flex justify-between items-center p-2">
          <div className={'flex-1'}></div>
          <Link
            to={!group?.open || user.role === 'ADMIN' ? '/' : null}
            {...(group?.open && { onClick: () => void setModal(true) })}
            className="h-full flex align-middle justify-center flex-1"
          >
            <img
              className=" max-h-full overflow-hidden"
              src={Logo2}
              alt="logo"
            />
          </Link>
          <div className={'flex-1 flex h-full justify-end'}>
            <Link to="/profile" className="flex items-center h-full">
              <img src={user.avatar} className="h-full" alt="avatar" />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full max-h-full h-full overflow-auto flex justify-between">
        <div className="hidden h-full sm:flex z-10">
          <aside
            className={[
              'flex justify-center flex-col max-w-[250px] bg-gray-900  h-full shadow-lg py-7',
              closedMenu ? '' : '',
            ].join(' ')}
          >
            <Link
              to={!group?.open || user.role === 'ADMIN' ? '/' : null}
              {...(group?.open && { onClick: () => void setModal(true) })}
              className="flex justify-center"
            >
              <img
                className={[
                  'self-center hidden sm:block',
                  closedMenu ? 'w-14 mb-8' : '',
                ].join(' ')}
                src={Logo}
                alt="logo"
              />
            </Link>
            <div className="flex flex-col justify-between h-full overflow-auto">
              <Menu setModal={setModal} closedmenu={closedMenu} />
              <div className="flex items-center border-t-2 border-t-gray-500">
                <Link
                  to={!group?.open || user.role === 'ADMIN' ? '/profile' : null}
                  {...(group?.open && { onClick: () => void setModal(true) })}
                  className="flex items-center  pl-3  pt-5"
                >
                  <div className="mr-4 w-8 h-8">
                    <img
                      src={user.avatar}
                      className="w-[inherit] h-[inherit]"
                      alt="avatar"
                    />
                  </div>
                  {!closedMenu && (
                    <p className="text-white text-lg font-medium">
                      {user.name + ' ' + user.sname}
                    </p>
                  )}
                </Link>
                <button
                  onClick={() => void logOutHandler()}
                  title="Выйти"
                  className={[
                    'ml-2 text-white text-xl',
                    closedMenu ? 'hidden' : '',
                  ].join(' ')}
                >
                  <FiLogOut />
                </button>
              </div>
            </div>
          </aside>
          {modal && user.role !== 'ADMIN' && (
            <GroupOpenedErrorModal modal={modal} setModal={setModal} />
          )}
        </div>
        <div className={` w-full ${isTrustLesson ? 'sm:h-[calc(100vh-3.8rem)] h-[calc(100vh-12.3rem)]' : 'sm:h-screen h-[calc(100vh-3.5rem)]'}`}>
          <div
            className={`w-full h-0 ${isChat ? 'sm:h-[20px]' : ''} bg-gray-900`}
          ></div>
          <TrustLessonWarning />
          <div
            className={`h-full ${
              isChat ? 'sm:h-[calc(100%-20px)]' : ''
            } relative grow w-full overflow-auto flex`}
          >
            
            {children}
          </div>
        </div>
      </div>
      <div className="h-13 block sm:hidden fixed w-full bottom-0">
        <MenuMobileAdaptive />
      </div>
      <Calling
        active={callingState}
        setActive={setCallingState}
        user={callData}
        setCallActive={setCallState}
      />
      <ChatCall
        active={callState}
        setActive={setCallState}
        roomid={callData.room_id}
        email={callData.email}
        username={callData.name}
      />
    </div>
  );
};

export default LayoutMessenger;
