import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Logo from '../../assets/logo2.png';
import logoSm from '../../assets/logo_sm_white.png';
import Menu from '../Index/Sidebar/Menu.tsx';
import AuthErrorModal from '../Modals/AuthError.tsx';
import { useAppSelector } from '../../hooks/redux.ts';
import MenuMobileAdaptive from '../Index/Sidebar/MenuMobileAdaptive.tsx';

import './LayoutAdaptive.css';
import { isDeviceMobile } from '../../utils/getDeviceType.ts';
import { isMobileMenuHidden } from '../../utils/menuMobileHidden.ts';
import { BsArrowLeft } from '@react-icons/all-files/bs/BsArrowLeft.js';
import { UserRoles } from '../../utils/userRoles.ts';
import { getUserRejectedRequests } from '../../utils/getUserRejectedRequests.ts';
import GroupOpenedErrorModal from '../Modals/GroupOpenedErrorModal.tsx';
import DialogService from '../../services/DialogService.ts';
import { FaBell } from '@react-icons/all-files/fa/FaBell';

const LayoutAdaptive = ({ children }) => {
  const location = useLocation();
  const params = useParams();
  const { group } = useAppSelector((state) => state.GroupSlice);
  const { user } = useAppSelector((state) => state.UserSlice);
  const { testUser } = useAppSelector((state) => state.UserSlice);
  const [modal, setModal] = useState(false);
  const groupIdParamRef = useRef(params.groupId);
  const [unreadedNotificationsCount, setUnreadedNotificationsCount] = useState(0);

  const [closedMenu, setClosedMenu] = useState(false);
  const isHomework =
    location.pathname.includes('homework') && groupIdParamRef.current;
  const isLesson =
    location.pathname.includes('lesson') && groupIdParamRef.current;

  const editReuests =
    user.editRequest &&
    user.editRequest.filter((item) => getUserRejectedRequests(user, item))
      .length;

  const toggleCloseMenuOnResize = () => {
    const isHomework =
      location.pathname.includes('homework') && groupIdParamRef.current;
    // setClosedMenu(true )
    setClosedMenu(
      (window.document.body.clientWidth <= 1024 && isHomework) ||
        isDeviceMobile(),
    );
  };

  useEffect(() => {
    groupIdParamRef.current = params.groupId;
  }, [params]);

  useEffect(() => {
    const fetchData = async () => {
      if (user._id) {
        const res = await DialogService.getUnreadedNotificationsCount(user._id);
        setUnreadedNotificationsCount(res.data);
      }
    }
    void fetchData();
  }, [user._id])

  useEffect(() => {
    window.addEventListener('resize', toggleCloseMenuOnResize);

    return () => {
      window.removeEventListener('resize', toggleCloseMenuOnResize);
    };
  }, []);

  useEffect(() => {
    toggleCloseMenuOnResize();
  }, [location]);

  const isHidden = isMobileMenuHidden(params, location.pathname);

  const homeLinkDisabled =
    user.role === UserRoles.NEWUSER &&
    !user?.editRequest?.find((item) => item.field === 'role');
  return (
    <div
      className={`w-full sm:pb-0 ${
        !isHidden ? 'pb-[60px]' : 'pb-0'
      } max-w-[100vw] xl:max-w-[1920px] mx-auto h-screen flex flex-col justify-between`}
    >
      <div className="h-14  bg-gradient-menu block sm:hidden">
        <div className="h-full relative flex justify-between items-center p-2">
          {/* <div className={'flex-1'}>
            {isHidden && (
              <Link to={'/homework'} className={'text-white text-[24px]'}>
                <BsArrowLeft />
              </Link>
            )}
          </div> */}
          <button className='flex flex-1'>
            <Link to="/messenger/chat/662603b7fbceb487fbc46a42"><FaBell color='white' size={24} /></Link>
            {!!unreadedNotificationsCount && (
              <div className="h-fit self-center ml-1 px-1 min-w-[28px] flex justify-center text-lg rounded-full text-black bg-blue-500">
                {unreadedNotificationsCount}
              </div>
            )}
          </button>
          <Link
            to={!group?.open || user.role === 'ADMIN' ? '/' : null}
            {...(group?.open && { onClick: () => void setModal(true) })}
            className="h-full flex align-middle justify-center flex-1"
          >
            <img
              className=" max-h-full overflow-hidden"
              src={Logo}
              alt="logo"
            />
          </Link>
          <div className={'flex-1 flex h-full justify-end'}>
            <Link
              to={!group?.open || user.role === 'ADMIN' ? '/profile' : ''}
              {...(group?.open && { onClick: () => void setModal(true) })}
              className="flex items-center h-full"
            >
              <img src={user.avatar} className="h-full" alt="avatar" />
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`sm:min-h-[calc(100vh-60px)] w-full max-w-[100vw] h-full overflow-auto flex justify-between ${
          closedMenu && isHomework && isDeviceMobile() ? 'flex-row-reverse' : ''
        }`}
      >
        <div className="hidden h-full sm:flex ">
          <aside
            className={[
              'flex justify-start overflow-y-auto flex-col  bg-[#2c2c2c]  h-full  shadow-lg',
              closedMenu || isLesson
                ? 'w-[60px] overflow-x-hidden'
                : 'w-[250px] border-r-[12px] border-r-[#818181] ',
            ].join(' ')}
          >
            {!testUser._id && <Link
              to={
                !homeLinkDisabled && (!group?.open || user.role === 'ADMIN')
                  ? '/'
                  : null
              }
              {...(group?.open && { onClick: () => void setModal(true) })}
              className="flex justify-center pb-2"
            >
              <img
                className={[
                  'w-36 logoImg-tab self-center p-2',
                  closedMenu ? 'logoImg-tab' : '',
                ].join(' ')}
                src={closedMenu || isLesson ? logoSm : Logo}
                alt="logo"
              />
            </Link>}
            <div className="flex flex-col justify-between h-full overflow-y-auto">
              <Menu unreadedNotificationsCount={unreadedNotificationsCount} setModal={setModal} closedmenu={closedMenu || isLesson} />
              <div
                className={`flex items-center border-t-2 border-t-white ${
                  closedMenu || isLesson ? 'logout-block justify-center' : ''
                }`}
              >
                {!testUser._id && <Link
                  to="/profile"
                  className={`flex gap-[5px] items-center mb-5&    overflow-hidden`}
                >
                  <div
                    className={`${!closedMenu || isLesson ? 'mr-4 ' : ''} ${
                      !closedMenu && !isLesson ? 'border-r-2' : ''
                    }  min-w-[42px] h-8 border-r-white  h-full p-1`}
                  >
                    <img src={user.avatar} className="w-[30px]" alt="avatar" />
                  </div>
                  {!closedMenu && !isLesson && (
                    <p className="text-white whitespace-nowrap flex-1  text-lg font-medium flex gap-[4px] pr-[4px]  overflow-hidden text-ellipsis">
                      <span className={'overflow-hidden text-ellipsis w-full'}>
                        {user.name + ' ' + user.sname}
                      </span>
                      {!!editReuests && (
                        <span
                          className={
                            'min-w-[30px] text-[16px] aspect-square rounded-full bg-red-600 text-white flex items-center justify-center'
                          }
                        >
                          {editReuests}
                        </span>
                      )}
                    </p>
                  )}
                </Link>}
              </div>
            </div>
          </aside>
          {modal && user.role !== 'ADMIN' && (
            <GroupOpenedErrorModal modal={modal} setModal={setModal} />
          )}
        </div>
        <div className="h-full grow w-full overflow-auto">{children}</div>
      </div>
      <div className="h-13 block sm:hidden fixed w-full bottom-0">
        <MenuMobileAdaptive />
      </div>
    </div>
  );
};

export default LayoutAdaptive;
