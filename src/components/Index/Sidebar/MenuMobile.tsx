import { FC, useEffect } from 'react';
import Access from '../../../assets/menu-icons/access.png';
import Faq from '../../../assets/menu-icons/faq.png';
import Groups from '../../../assets/menu-icons/groups.png';
import Homework from '../../../assets/menu-icons/homework.png';
import Lessons from '../../../assets/menu-icons/lessons.png';
import Messenger from '../../../assets/menu-icons/messenger.png';
import Program from '../../../assets/menu-icons/program.png';
import Requizits from '../../../assets/menu-icons/requizits.png';
import TestLesson from '../../../assets/menu-icons/testlesson.png';
import Video from '../../../assets/menu-icons/video.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getUnreaded } from '../../../store/reducers/MessengerSlice';
import {
  ITranslateItemString,
  translations,
} from '../../../utils/translations.tsx';
import MenuItemMobile from './MenuItemMobile';

interface MenuProps {
  closedmenu?: boolean;
  setModal: (bool: boolean) => void;
}

const MenuMobile: FC<MenuProps> = ({ closedmenu, setModal }) => {
  const { user } = useAppSelector((state) => state.UserSlice);
  const { unreaded } = useAppSelector((state) => state.MessengerSlice);
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.TranslateSlice.language);

  useEffect(() => {
    const fetchUnreaded = async () => {
      await dispatch(getUnreaded());
    };
    void fetchUnreaded();
  }, []);

  const {
    messengerText,
    groupsText,
    lessonsText,
    homeworkText,
    videoLessonsText,
    requisitesText,
    programText,
    trialLessonText,
    waitGroupText,
    accessText,
    myGroupsText,
    tipsForTrainersText,
    tipsForParentsText,
  }: {
    messengerText: ITranslateItemString;
    groupsText: ITranslateItemString;
    lessonsText: ITranslateItemString;
    homeworkText: ITranslateItemString;
    videoLessonsText: ITranslateItemString;
    requisitesText: ITranslateItemString;
    programText: ITranslateItemString;
    trialLessonText: ITranslateItemString;
    waitGroupText: ITranslateItemString;
    accessText: ITranslateItemString;
    myGroupsText: ITranslateItemString;
    tipsForTrainersText: ITranslateItemString;
    tipsForParentsText: ITranslateItemString;
  } = translations.menu;

  // TODO!: Delete userAgent && isIosMobApp after comfirm app in AppStore + string 224!
  const ua = navigator.userAgent;
  const isIosMobApp = ua === 'ios-mob-app';

  return (
    <nav className="xl:hidden">
      <ul className="pr-16 flex justify-center align-middle mx-2 xl:mx-4 overflow-x-auto   bg-gradient-menu h-full">
        {user.role !== 'NEWUSER' && (
          <MenuItemMobile
            setModal={setModal}
            title={messengerText[language]}
            closedmenu={closedmenu}
            to="/messenger"
            ico={Messenger}
          >
            <div className="absolute top-0 md:top-1 right-0 md:right-1 md:ml-3  bg-green-500 xl:bg-apricot p-0.5 md:px-1 leading-none md:leading-6 w-auto text-center md:aspect-square md:min-w-[28px] flex justify-center align-middle text-sm rounded-full text-black">
              {unreaded}
            </div>
          </MenuItemMobile>
        )}
        {user.role === 'NEWUSER' && (
          <MenuItemMobile
            setModal={setModal}
            title={groupsText[language]}
            closedmenu={closedmenu}
            to="/messenger"
            ico={Groups}
          ></MenuItemMobile>
        )}
        {(user.role === 'DIRECTOR' ||
          user.role === 'ZDIRECTOR' ||
          user.role === 'TRANER' ||
          user.role === 'ADMIN') && (
          <MenuItemMobile
            setModal={setModal}
            title={myGroupsText[language]}
            closedmenu={closedmenu}
            to="/mygroups"
            ico={Groups}
          ></MenuItemMobile>
        )}
        {(user.role === 'STUDENT' ||
          user.role === 'DIRECTOR' ||
          user.role === 'ZDIRECTOR' ||
          user.role === 'TRANERMETODIST') && (
          <MenuItemMobile
            setModal={setModal}
            title={lessonsText[language]}
            closedmenu={closedmenu}
            to="/lessons"
            ico={Lessons}
          ></MenuItemMobile>
        )}

        {(user.role === 'STUDENT' ||
          user.role === 'DIRECTOR' ||
          user.role === 'ZDIRECTOR' ||
          user.role === 'TRANERMETODIST') && (
          <MenuItemMobile
            setModal={setModal}
            title={homeworkText[language]}
            closedmenu={closedmenu}
            to="/homework"
            ico={Homework}
          ></MenuItemMobile>
        )}
        {(user.role === 'STUDENT' ||
          user.role === 'DIRECTOR' ||
          user.role === 'ZDIRECTOR' ||
          user.role === 'TRANERMETODIST') && (
          <MenuItemMobile
            setModal={setModal}
            title={videoLessonsText[language]}
            closedmenu={closedmenu}
            to="/video"
            ico={Video}
          ></MenuItemMobile>
        )}
        {(user.role === 'STUDENT' ||
          user.role === 'DIRECTOR' ||
          user.role === 'ZDIRECTOR' ||
          user.role === 'TRANERMETODIST') &&
          !isIosMobApp && (
            <MenuItemMobile
              setModal={setModal}
              title={requisitesText[language]}
              closedmenu={closedmenu}
              to="/balance"
              ico={Requizits}
            ></MenuItemMobile>
          )}
        {(user.role === 'STUDENT' ||
          user.role === 'DIRECTOR' ||
          user.role === 'ZDIRECTOR' ||
          user.role === 'TRANERMETODIST') && (
          <MenuItemMobile
            setModal={setModal}
            title={tipsForParentsText[language]}
            closedmenu={closedmenu}
            to="/faq"
            ico={Faq}
          ></MenuItemMobile>
        )}
        {(user.role === 'DIRECTOR' ||
          user.role === 'ZDIRECTOR' ||
          user.role === 'TRANER') && (
          <MenuItemMobile
            setModal={setModal}
            title={tipsForTrainersText[language]}
            closedmenu={closedmenu}
            to="/faqtrainers"
            ico={Faq}
          ></MenuItemMobile>
        )}
        {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') && (
          <MenuItemMobile
            setModal={setModal}
            title={programText[language]}
            closedmenu={closedmenu}
            to="/program"
            ico={Program}
          ></MenuItemMobile>
        )}
        {(user.role === 'DIRECTOR' ||
          user.role === 'ZDIRECTOR' ||
          user.role === 'TRANERMETODIST') && (
          <MenuItemMobile
            setModal={setModal}
            title={trialLessonText[language]}
            closedmenu={closedmenu}
            to="/testlesson"
            ico={TestLesson}
          ></MenuItemMobile>
        )}
        {(user.role === 'DIRECTOR' ||
          user.role === 'ZDIRECTOR' ||
          user.role === 'ADMIN') && (
          <MenuItemMobile
            setModal={setModal}
            title={waitGroupText[language]}
            closedmenu={closedmenu}
            to="/groupwaiting"
            ico={Groups}
          ></MenuItemMobile>
        )}
        {(user.role === 'DIRECTOR' ||
          user.role === 'ZDIRECTOR' ||
          user.role === 'ADMIN') && (
          <MenuItemMobile
            setModal={setModal}
            title={accessText[language]}
            closedmenu={closedmenu}
            to="/permissions"
            ico={Access}
          ></MenuItemMobile>
        )}
      </ul>
    </nav>
  );
};

export default MenuMobile;
