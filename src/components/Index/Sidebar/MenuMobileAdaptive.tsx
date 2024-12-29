import { FC, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
import { isDeviceMobile } from '../../../utils/getDeviceType.ts';
import { isMobileMenuHidden } from '../../../utils/menuMobileHidden.ts';
import { translations } from '../../../utils/translations.tsx';
import MenuItemMobileAdaptive from './MenuItemMobileAdaptive/MenuItemMobileAdaptive.tsx';

interface MenuProps {
  closedmenu?: boolean;
  setModal: (bool: boolean) => void;
}

const MenuMobileAdaptive: FC<MenuProps> = ({ closedmenu, setModal }) => {
  const language = useAppSelector((state) => state.TranslateSlice.language);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const params = useParams();
  const { user } = useAppSelector((state) => state.UserSlice);
  const { unreaded } = useAppSelector((state) => state.MessengerSlice);

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
    homeworkShortText,
    videoLessonsText,
    requisitesShortText,
    programShortText,
    trialLessonText,
    waitGroupText,
    waitGroupShortText,
    accessText,
    myGroupsText,
    tipsShortText,
  } = translations.menu;

  const waitGroupCondText = isDeviceMobile()
    ? waitGroupShortText
    : waitGroupText;

  const isHidden = isMobileMenuHidden(params, location.pathname);
  return (
    <nav
      className={`h-full relative bg-gradient-silver  ${
        isHidden ? 'hidden' : ''
      }`}
    >
      <ul className="h-full flex justify-between align-middle overflow-hidden bg-gradient-menu">
        <div className="relative w-full h-full">
          <div
            className={`h-full flex justify-start overflow-x-auto no-scrollbar`}
          >
            {(user.role === 'NEWUSER' ||
              user.role === 'DIRECTOR' ||
              user.role === 'ZDIRECTOR') && (
              <MenuItemMobileAdaptive
                setModal={setModal}
                title={messengerText[language]}
                closedmenu={closedmenu}
                to="/messenger"
                ico={Messenger}
              >
                <div className="absolute top-0 md:top-1 right-0 md:right-1 md:ml-3  bg-green-500 xl:bg-apricot p-0.5 md:px-1 leading-none md:leading-6 w-auto text-center md:aspect-square md:min-w-[28px] flex justify-center align-middle text-sm rounded-full text-white">
                  {unreaded}
                </div>
              </MenuItemMobileAdaptive>
            )}
            {user.role !== 'NEWUSER' &&
              user.role !== 'DIRECTOR' &&
              user.role !== 'ZDIRECTOR' && (
                <MenuItemMobileAdaptive
                  setModal={setModal}
                  title={messengerText[language]}
                  closedmenu={closedmenu}
                  to="/messenger"
                  ico={Messenger}
                >
                  <div className="absolute top-0 md:top-1 right-0 md:right-1 md:ml-3  bg-green-500 xl:bg-apricot p-0.5 md:px-1 leading-none md:leading-6 w-auto text-center md:aspect-square md:min-w-[28px] flex justify-center align-middle text-sm rounded-full text-black">
                    {unreaded}
                  </div>
                </MenuItemMobileAdaptive>
              )}
            {(user.role === 'DIRECTOR' ||
              user.role === 'ZDIRECTOR' ||
              user.role === 'TRANER' ||
              user.role === 'ADMIN') && (
              <MenuItemMobileAdaptive
                setModal={setModal}
                title={myGroupsText[language]}
                closedmenu={closedmenu}
                to="/mygroups"
                ico={Groups}
              ></MenuItemMobileAdaptive>
            )}
            {(user.role === 'STUDENT' ||
              user.role === 'DIRECTOR' ||
              user.role === 'ZDIRECTOR' ||
              user.role === 'TRANERMETODIST') && (
              <MenuItemMobileAdaptive
                setModal={setModal}
                title={lessonsText[language]}
                closedmenu={closedmenu}
                to="/lessons"
                ico={Lessons}
              ></MenuItemMobileAdaptive>
            )}
            {(user.role === 'STUDENT' ||
              user.role === 'DIRECTOR' ||
              user.role === 'ZDIRECTOR' ||
              user.role === 'TRANERMETODIST') && (
              <MenuItemMobileAdaptive
                setModal={setModal}
                title={homeworkShortText[language]}
                closedmenu={closedmenu}
                to="/homework"
                ico={Homework}
              ></MenuItemMobileAdaptive>
            )}
            {(user.role === 'STUDENT' ||
              user.role === 'TRANER' ||
              user.role === 'TRANERMETODIST' ||
              user.role === 'DIRECTOR' ||
              user.role === 'ZDIRECTOR') && (
              <MenuItemMobileAdaptive
                setModal={setModal}
                title={videoLessonsText[language]}
                closedmenu={closedmenu}
                to="/video"
                ico={Video}
              ></MenuItemMobileAdaptive>
            )}
            {/*user.role === 'STUDENT' ||*/}
            {(user.role === 'DIRECTOR' ||
              user.role === 'ZDIRECTOR' ||
              user.role === 'TRANERMETODIST') && (
              <MenuItemMobileAdaptive
                setModal={setModal}
                title={requisitesShortText[language]}
                closedmenu={closedmenu}
                to="/balance"
                ico={Requizits}
              ></MenuItemMobileAdaptive>
            )}
            {(user.role === 'STUDENT' ||
              user.role === 'DIRECTOR' ||
              user.role === 'ZDIRECTOR' ||
              user.role === 'TRANERMETODIST') && (
              <MenuItemMobileAdaptive
                setModal={setModal}
                title={tipsShortText[language]}
                closedmenu={closedmenu}
                to="/faq"
                ico={Faq}
              ></MenuItemMobileAdaptive>
            )}
            {(user.role === 'DIRECTOR' ||
              user.role === 'ZDIRECTOR' ||
              user.role === 'TRANER') && (
              <MenuItemMobileAdaptive
                setModal={setModal}
                title={tipsShortText[language]}
                closedmenu={closedmenu}
                to="/faqtrainers"
                ico={Faq}
              ></MenuItemMobileAdaptive>
            )}
            {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') && (
              <MenuItemMobileAdaptive
                setModal={setModal}
                title={programShortText[language]}
                closedmenu={closedmenu}
                to="/program"
                ico={Program}
              ></MenuItemMobileAdaptive>
            )}
            {(user.role === 'DIRECTOR' ||
              user.role === 'ZDIRECTOR' ||
              user.role === 'TRANERMETODIST') && (
              <MenuItemMobileAdaptive
                setModal={setModal}
                title={trialLessonText[language]}
                closedmenu={closedmenu}
                to="/testlesson"
                ico={TestLesson}
              ></MenuItemMobileAdaptive>
            )}
            {(user.role === 'DIRECTOR' ||
              user.role === 'ZDIRECTOR' ||
              user.role === 'ADMIN') && (
              <MenuItemMobileAdaptive
                setModal={setModal}
                title={waitGroupCondText[language]}
                closedmenu={closedmenu}
                to="/groupwaiting"
                ico={Groups}
              ></MenuItemMobileAdaptive>
            )}
            {(user.role === 'DIRECTOR' ||
              user.role === 'ZDIRECTOR' ||
              user.role === 'ADMIN') && (
              <MenuItemMobileAdaptive
                setModal={setModal}
                title={accessText[language]}
                closedmenu={closedmenu}
                to="/permissions"
                ico={Access}
              ></MenuItemMobileAdaptive>
            )}
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default MenuMobileAdaptive;
