import { FC, useEffect, useState } from 'react';
import UserInfo from '../UserInfo';
import Menu from './Menu';
import Logo from '../../../assets/logo2.png';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import GroupOpenedErrorModal from '../../Modals/GroupOpenedErrorModal.tsx';
import { FaBell } from '@react-icons/all-files/fa/FaBell';
import DialogService from '../../../services/DialogService.ts';

interface SidebarProps {
  closedmenu?: boolean;
}

const Sidebar: FC<SidebarProps> = ({ closedmenu }) => {
  const { group } = useAppSelector((state) => state.GroupSlice);
  const { user } = useAppSelector((state) => state.UserSlice);
  const [modal, setModal] = useState<boolean>(false);
  const [unreadedNotificationsCount, setUnreadedNotificationsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (user._id) {
        const res = await DialogService.getUnreadedNotificationsCount(user._id);
        setUnreadedNotificationsCount(res.data);
      }
    }
    void fetchData();
  }, [user._id])
  return (
    <>
      <aside
        className={[
          'relative xl:max-w-[300px] shrink xl:static flex w-full justify-center flex-col bg-[#2c2c2c] xl:overflow-auto pt-2 xl:pt-10  xl:h-full shadow-lg xl:border-r-[12px] border-r-[#818181]',
          closedmenu
            ? ''
            : 'min-w-[300px] w-[300px] xl:min-w-[250px] xl:w-[250px]',
        ].join(' ')}
      >
        <button className='flex justify-center mt-auto mb-2'>
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
          className="flex justify-center"
        >
          <img
            className={[
              'self-center mb-2 xl:mb-10',
              closedmenu ? 'xl:w-20' : 'w-30 max-2xl:w-36',
            ].join(' ')}
            src={Logo}
            alt="logo"
          />
        </Link>
        <div className="absolute right-1 xl:hidden">
          <UserInfo closedmenu={closedmenu} setModal={setModal} />
        </div>
        <div className="hidden xl:flex flex-col overflow-auto justify-between h-full">
          <Menu unreadedNotificationsCount={unreadedNotificationsCount} setModal={setModal} closedmenu={closedmenu} />
          <UserInfo setModal={setModal} closedmenu={closedmenu} />
        </div>
      </aside>
      {modal && user.role !== 'ADMIN' && (
        <GroupOpenedErrorModal modal={modal} setModal={setModal} />
      )}
    </>
  );
};

export default Sidebar;
