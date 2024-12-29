import { FC } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Link } from 'react-router-dom';
import { getUserRejectedRequests } from '../../utils/getUserRejectedRequests.ts';

interface UserInfoProps {
  closedmenu?: boolean;
  setModal: (bool: boolean) => void;
}

const UserInfo: FC<UserInfoProps> = ({ closedmenu, setModal }) => {
  const { user } = useAppSelector((state) => state.UserSlice);
  const { group } = useAppSelector((state) => state.GroupSlice);

  const editReuests =
    user.editRequest &&
    user.editRequest.filter((item) => getUserRejectedRequests(user, item))
      .length;
  return (
    <div className="flex items-center xl:border-t-2 xl:border-t-gray-500">
      <Link
        to={!group?.open || user.role === 'ADMIN' ? '/profile' : ''}
        {...(group?.open && { onClick: () => void setModal(true) })}
        className="flex items-center mb-5 pl-3  pt-5"
      >
        <div className="mr-4 w-8 h-8 max-2xl:w-8 max-2xl:h-8">
          <img
            src={user.avatar}
            className="w-[inherit] h-[inherit]"
            alt="avatar"
          />
        </div>
        {!closedmenu && (
          <p className="hidden xl:block text-white text-lg max-2xl:text-base font-medium">
            {user.name + ' ' + user.sname}
            {!!editReuests && (
              <span
                className={
                  'w-[30px] aspect-square rounded-full bg-red-600 text-white flex items-center justify-center'
                }
              >
                {editReuests}
              </span>
            )}
          </p>
        )}
      </Link>
    </div>
  );
};

export default UserInfo;
