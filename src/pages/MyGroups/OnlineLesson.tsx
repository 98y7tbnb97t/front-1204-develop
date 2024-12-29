import { FC, useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Container from '../../components/OnlineLesson/Container';
import TopMenuOnlineLesson from '../../components/UI/TopMenu/TopMenuOnlineLesson';
import { useAppSelector } from '../../hooks/redux.ts';
import { ITopMenuOnlineLesson } from '../../models/ITopMenu';
import {
  GroupRoomDisconnectSocket,
  GroupRoomSocket,
} from '../../sockets/GroupSockets';
import {
  ITranslateItemString,
  translations,
} from '../../utils/translations.tsx';
import {UserRoles} from "../../utils/userRoles.ts";
import IJitsiMeetExternalApi from '@jitsi/react-sdk/lib/types/IJitsiMeetExternalApi';

const OnlineLesson: FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [api, setApi] = useState<IJitsiMeetExternalApi|null>(null);
  const [active, setActive] = useState<string>();
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const user = useAppSelector((state) => state.UserSlice.user);

  const {
    programText,
    homeworkText,
    groupDescriptionText,
    historyText,
    participantsText,
  }: {
    programText: ITranslateItemString;
    homeworkText: ITranslateItemString;
    groupDescriptionText: ITranslateItemString;
    historyText: ITranslateItemString;
    participantsText: ITranslateItemString;
  } = translations.groups;

  const [menu, setMenu] = useState<ITopMenuOnlineLesson[]>([
    { id: 0, name: programText[language], openProgram: true }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
    { id: 1, name: participantsText[language] },
    { id: 2, name: historyText[language], openHistory: true }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
    { id: 3, name: homeworkText[language], dropdown: true, openHomework: true },
    {
      id: 4,
      name: groupDescriptionText[language],
      dropdown: true,
      openDescription: true,
    }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
  ]);

  useEffect(() => {
    if(user?.role === UserRoles.STUDENT && groupId) navigate(`/lesson/${groupId}`)
  }, [user]);

  useEffect(() => {
    if (groupId) {
      GroupRoomSocket(groupId);
    }
    return () => {
      if (groupId) {
        GroupRoomDisconnectSocket(groupId);
      }
    };
  }, [groupId]);

  useEffect(() => {
    setMenu([
      { id: 0, name: programText[language], openProgram: true }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
      { id: 1, name: participantsText[language] },
      { id: 2, name: historyText[language], openHistory: true }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
      {
        id: 3,
        name: homeworkText[language],
        dropdown: true,
        openHomework: true,
      },
      {
        id: 4,
        name: groupDescriptionText[language],
        dropdown: true,
        openDescription: true,
      }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
    ]);
  }, [language]);
  return (
    <div className="w-full  overflow-y-scroll relative flex flex-col h-[calc(100vh-10px)] border-2 border-white">
      <TopMenuOnlineLesson menu={menu} api={api} active={active} setActive={setActive}/>
      <div className="w-full max-w-[1920px] mx-auto flex-1">
        <Container setApi={setApi} setActive={setActive}/>
      </div>
    </div>
  );
};

export default OnlineLesson;
