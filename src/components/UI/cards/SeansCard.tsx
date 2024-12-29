import React from 'react';
import { FaUsers } from '@react-icons/all-files/fa/FaUsers';
import { Link, useParams } from 'react-router-dom';

interface SeansCardProps {
  isOnline?: boolean;
  seanser: any | undefined;
  // seansId: string|undefined;
  seansTitle: string | React.ReactNode;
  extraTime: string;
  seanserColor: string;
  startTime: number;
  additionalTime: number;
  users?: any;
}

const SeansCard: React.FC<SeansCardProps> = ({
  isOnline,
  seansTitle,
  extraTime,
  seanserColor,
  additionalTime,
  startTime,
  users,
}) => {
  const [showUsers, setShowUsers] = React.useState(false);
  const { seansId, userId } = useParams();

  return (
    <div className="shadow rounded-2xl bg-white p-5">
      {showUsers ? (
        <ul>
          {users?.map(({ user }: any) => (
            <li>
              <Link
                className={`${
                  userId == user?._id ? 'font-medium' : 'font-light'
                } text-xs`}
                to={`/session/${seansId}/game/${user?._id}`}
              >
                {user.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <div className="flex flex-row items-center">
            <div>
              <FaUsers className="text-6xl mr-3" />
            </div>
            <div>
              <p className="font-medium text-2xl">
                {startTime / 1000 / 60}+{additionalTime / 1000}
              </p>
              <p className="text-base">STANDARD • ТОВАРИЩЕСКАЯ</p>
            </div>
          </div>
          <div className="text-base py-3">
            <p>
              Дополнительное время сеансёра:{' '}
              <span className="font-medium">
                {' '}
                {Number(extraTime) / 60 / 1000} минут
              </span>
            </p>
            <p>
              Цвет сеансёра:{' '}
              <span className="font-medium">
                {' '}
                {seanserColor === 'white' ? 'Белые' : 'Чёрные'}
              </span>
            </p>
          </div>
        </>
      )}
      <div className="flex flex-row items-center py-3 justify-between border-t">
        <div className="flex flex-row items-center text-lg font-medium">
          <span
            className={`w-4 h-4 rounded-full mr-2 ${
              isOnline ? 'bg-green-400' : 'bg-red-600'
            } `}
          ></span>
          {seansTitle}
        </div>
        {users?.length && (
          <button onClick={() => setShowUsers((prev) => !prev)} className="">
            участники
          </button>
        )}
      </div>
    </div>
  );
};

export default SeansCard;
