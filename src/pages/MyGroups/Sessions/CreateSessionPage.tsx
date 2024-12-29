import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus';
import { FaUser } from '@react-icons/all-files/fa6/FaUser';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ModalChat from '../../Lessons/ModalChat/ModalChat';
import { ITopMenu } from '../../../models/ITopMenu';
import TopMenu from '../../../components/UI/TopMenu/TopMenu';
import { IoChatboxEllipsesOutline } from '@react-icons/all-files/io5/IoChatboxEllipsesOutline';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getAllSeans } from '../../../store/reducers/SeansSlice';
import {format} from 'date-fns'

const CreateSessionPage = () => {
  const dispatch = useAppDispatch();
  const [chat, setChat] = useState(false);
  const { groupId } = useParams();
  const [menu] = useState<ITopMenu[]>([
    {
      id: 0,
      name: 'Программа',
      path: `/group/${groupId}/program`,
      scope: [
        'DIRECTOR',
        'ZDIRECTROR',
        'TRANER',
        groupId === '653bb23a7575d7142fe229e7' ? 'ADMIN' : '',
      ],
    }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
    {
      id: 1,
      name: 'Онлайн урок',
      path: `/group/${groupId}/online-lesson`,
      scope: [
        'DIRECTOR',
        'ZDIRECTROR',
        'TRANER',
        groupId === '653bb23a7575d7142fe229e7' ? 'ADMIN' : '',
      ],
    }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
    {
      id: 2,
      name: 'Домашнее\nзадание',
      path: `/group/${groupId}/homework`,
      scope: [
        'DIRECTOR',
        'ZDIRECTROR',
        'TRANER',
        groupId === '653bb23a7575d7142fe229e7' ? 'ADMIN' : '',
      ],
    }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
    {
      id: 3,
      name: 'Ученики',
      scope: [
        'DIRECTROR',
        'ZDIRECTROR',
        'TRANER',
        groupId === '653bb23a7575d7142fe229e7' ? 'ADMIN' : '',
      ],
    },
    { id: 4, name: 'Описание группы', path: `/group/${groupId}/description` }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
    { id: 5, name: 'История', path: `/group/${groupId}/history` }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
  ]);
  const { seansList } = useAppSelector((state) => state.SeansSlice);
  const { user } = useAppSelector((state) => state.UserSlice);

  useEffect(() => {
    dispatch(getAllSeans({ groupId }));
  }, []);

  return (
    <>
      <TopMenu menu={menu} />
      <div className="p-5">
        <div className="bg-gray-100 rounded-3xl">
          <table className="w-full bg-[#f0f0f0] rounded-xl border-collapse ">
            <caption className="text-4xl font-semibold py-8">
              Сеанс одновременной игры
            </caption>
            <thead className="bg-gray-300">
              <tr>
                <td className="text-center font-semibold text-3xl py-1">
                  Ваши предстоящие сеансы
                </td>
                <td className="text-center font-semibold text-3xl py-1">
                  Сеансёр
                </td>
                <td className="text-center font-semibold text-3xl py-1">
                  Игроки
                </td>
              </tr>
            </thead>
            <tbody className="min-h-40">
              {seansList?.length
                ? seansList.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b-2 border-b-[#C4C4C4]"
                    >
                      <td className="text-center p-3">
                        <Link
                          className="text-blue-400"
                          to={
                            item.status === 'playing'
                              ? `/session/${item._id}/game/s`
                              : `/session/tostart/${item._id}`
                          }
                        >
                          <p className="text-4xl font-semibold">{item.name}</p>
                          <p className="text-xl font-normal mt-2">
                            {item.startTime/1000/60} + {item.additionalTime/1000}
                          </p>
                        </Link>
                      </td>
                      <td className="text-center p-3">
                        <p className="text-2xl">{item.seanser?.name}</p>
                        <p className="font-semibold text-xl mt-2">
                          {format(new Date(item.createdAt), "MM.dd.yyyy HH:mm")}
                        </p>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-row items-center text-3xl">
                          <FaUser className="mr-3" />
                          <span>{item.games?.length}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                : ''}
            </tbody>
          </table>

          <div className="flex items-center justify-between pb-8 px-9 pt-4">
            {user.role !== 'STUDENT' && (
              <>
                <Link
                  to={'/session/table'}
                  className="mt-5 bg-gradient-button text-2xl font-semibold rounded-full py-4 px-12 hover:bg-gradient-red flex items-center hover:text-white"
                >
                  Результаты лиги
                </Link>
                <Link
                  to={`create`}
                  className="mt-5 text-2xl font-semibold rounded-full py-4 px-12 bg-gradient-appricot flex items-center hover:underline"
                >
                  <span className="text-red-600 block">(не готово)</span>
                  Создать сеанс <AiOutlinePlus className="ml-5" />
                </Link>
              </>
            )}
            <button
              className="flex flex-row items-center mt-5"
              onClick={() => setChat((prev) => !prev)}
            >
              <span className="shadow-md inline-block rounded-full p-1 px-3 mr-2 font-semibold">
                {chat ? 'Закрыть' : 'Открыть'} чат группы{' '}
              </span>
              <span className="shadow-md bg-gradient-button text-2xl font-semibold rounded-full py-2 px-4 inline-block items-center">
                <IoChatboxEllipsesOutline />
              </span>
            </button>
          </div>
        </div>
        {chat && (
          <div className="max-w-[900px] p-[10px] m-auto">
            <ModalChat className="w-full 2xl:w-full" contentHeight={300} />
          </div>
        )}
      </div>
    </>
  );
};

export default CreateSessionPage;
