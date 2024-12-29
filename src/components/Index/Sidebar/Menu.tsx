import { FC, useEffect, useState } from 'react';
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
import SessionIcon from '../../../assets/menu-icons/session_icon.svg';
import TournamentIcon from '../../../assets/menu-icons/Tournament.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getUnreaded } from '../../../store/reducers/MessengerSlice';
import { isDeviceMobile } from '../../../utils/getDeviceType.ts';
import {
  ITranslateItemString,
  translations,
} from '../../../utils/translations.tsx';
import MenuItem from './MenuItem';

import languageIcon from '../../../assets/icons/language.png';
import { languages } from '../../../constants.ts';
import LanguageModal from '../../Modals/LanguageModal.tsx';
import { MdTextFields } from '@react-icons/all-files/md/MdTextFields';
import { MdOutlineReviews } from '@react-icons/all-files/md/MdOutlineReviews';
import { FaBell  } from '@react-icons/all-files/fa/FaBell';
import { logout } from '../../../store/reducers/UserSlice.ts';
import { clearSession } from '../../../store/reducers/SessionSlice.ts';
import { Link } from 'react-router-dom';

interface MenuProps {
  closedmenu?: boolean;
  setModal: (bool: boolean) => void;
  unreadedNotificationsCount: number;
}

const Menu: FC<MenuProps> = ({ closedmenu, setModal, unreadedNotificationsCount }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.UserSlice);
  const { testUser } = useAppSelector((state) => state.UserSlice);
  const { unreaded } = useAppSelector((state) => state.MessengerSlice);
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const counter = useAppSelector((state) => state.PermissionsSlice.counter);
  const [langModalOpened, setLangModalOpened] = useState(false);

  const {
    studentsEdited,
    adminsEdited,
    newStudentsEdited,
    newTrainersEdited,
    trainersEdited,
    studentsRequisiteEdited,
  } = counter;

  const editedCount =
    studentsEdited + adminsEdited + newStudentsEdited + studentsRequisiteEdited;
  const trainerEditedCount = newTrainersEdited + trainersEdited;

  const requisiteAccepted =
    user.editRequest &&
    user.editRequest.find(
      (item) =>
        item.field === 'requizits' && (item.acceptedAt || item.rejectedAt),
    );

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
    commentText,
    accessText,
    myGroupsText,
    tipsForParentsText,
    tipsForTrainersText,
    textsText,
  }: {
    messengerText: ITranslateItemString;
    groupsText: ITranslateItemString;
    commentText: ITranslateItemString;
    lessonsText: ITranslateItemString;
    homeworkText: ITranslateItemString;
    videoLessonsText: ITranslateItemString;
    requisitesText: ITranslateItemString;
    programText: ITranslateItemString;
    trialLessonText: ITranslateItemString;
    waitGroupText: ITranslateItemString;
    accessText: ITranslateItemString;
    myGroupsText: ITranslateItemString;
    tipsForParentsText: ITranslateItemString;
    tipsForTrainersText: ITranslateItemString;
    textsText: ITranslateItemString;
  } = translations.menu;

  const {
    languageText,
    logoutText
  }: {
    languageText: ITranslateItemString;
    logoutText: ITranslateItemString;
  } = translations.profile;

  // TODO!: Delete userAgent && isIosMobApp after comfirm app in AppStore + string 224!
  const ua = navigator.userAgent;
  const isIosMobApp = ua === 'ios-mob-app';

  useEffect(() => {
    const fetchUnreaded = async () => {
      await dispatch(getUnreaded());
    };
    void fetchUnreaded();
  }, []);

  return (
    <>
      <nav className="flex flex-col flex-1">
        <ul className=" border-t-2 border-t-white mb-2">
          {user.role !== 'NEWUSER' && !testUser._id && (
            <MenuItem
              setModal={setModal}
              title={messengerText[language]}
              closedmenu={closedmenu}
              to="/messenger"
              ico={Messenger}
            >
              {messengerText[language]}
              <div className="h-fit self-center ml-3 bg-apricot px-1 min-w-[28px] flex justify-center text-lg rounded-full text-black">
                {unreaded}
              </div>
            </MenuItem>
          )}
          {user.role === 'NEWUSER' && (
            <MenuItem
              setModal={setModal}
              title={groupsText[language]}
              closedmenu={closedmenu}
              to="/messenger"
              ico={Groups}
              diabled={
                !user?.editRequest?.find((item) => item.field === 'role')
              }
            >
              {groupsText[language]}
            </MenuItem>
          )}
          {(user.role === 'DIRECTOR' ||
            user.role === 'ZDIRECTOR' ||
            user.role === 'TRANER' ||
            user.role === 'ADMIN') && (
            <MenuItem
              setModal={setModal}
              title={myGroupsText[language]}
              closedmenu={closedmenu}
              to="/mygroups"
              ico={Groups}
            >
              {myGroupsText[language]}
            </MenuItem>
          )}
          {!isDeviceMobile() &&
            (user.role === 'STUDENT' ||
              user.role === 'DIRECTOR' ||
              user.role === 'ZDIRECTOR' ||
              user.role === 'TRANERMETODIST') && (
              <MenuItem
                setModal={setModal}
                title={lessonsText[language]}
                closedmenu={closedmenu}
                to="/lessons"
                ico={Lessons}
              >
                {lessonsText[language]}
              </MenuItem>
            )}

          {(user.role === 'STUDENT' ||
            user.role === 'DIRECTOR' ||
            user.role === 'ZDIRECTOR' ||
            user.role === 'TRANERMETODIST' ||
            testUser._id) && (
            <MenuItem
              setModal={setModal}
              title={homeworkText[language]}
              closedmenu={closedmenu}
              to="/homework"
              ico={Homework}
            >
              {homeworkText[language]}
            </MenuItem>
          )}
          {(user.role === 'STUDENT' ||
            user.role === 'DIRECTOR' ||
            user.role === 'ZDIRECTOR' ||
            user.role === 'TRANER' ||
            user.role === 'TRANERMETODIST') && (
            <MenuItem
              setModal={setModal}
              title={videoLessonsText[language]}
              closedmenu={closedmenu}
              to="/video"
              ico={Video}
            >
              {videoLessonsText[language]}
            </MenuItem>
          )}

          {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') && (
            <MenuItem
              setModal={setModal}
              title={'Сеанс'}
              closedmenu={closedmenu}
              to="/session"
              ico={SessionIcon}
            >
              Сеанс <span className="text-red-600"> (не готово)</span>
            </MenuItem>
          )}
                    {(user.role === 'TRANER' ||user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR' || user.role === 'STUDENT') && (
            <MenuItem
              setModal={setModal}
              title={'Турнир'}
              closedmenu={closedmenu}
              to="/Tournament"
              ico={TournamentIcon}
            >
              Турнир <span className="text-red-600"> (не готово)</span>
            </MenuItem>
          )}

          {user.role === 'TRANER' && (
            <MenuItem
              setModal={setModal}
              title={'Сеанс'}
              closedmenu={closedmenu}
              to="/session/653bb23a7575d7142fe229e7"
              ico={SessionIcon}
            >
              Сеанс <span className="text-red-600"> (не готово)</span>
            </MenuItem>
          )}
          {(user.role === 'STUDENT' ||
            user.role === 'DIRECTOR' ||
            user.role === 'ZDIRECTOR' ||
            user.role === 'TRANERMETODIST') &&
            !isIosMobApp && (
              <MenuItem
                setModal={setModal}
                title={requisitesText[language]}
                closedmenu={closedmenu}
                to="/balance"
                ico={Requizits}
              >
                {requisitesText[language]}
                {!!requisiteAccepted && (
                  <div
                    className={`h-fit self-center ml-3 mr-1 bg-${
                      requisiteAccepted.acceptedAt ? 'green' : 'red'
                    }-500 px-1 min-w-[28px] flex justify-center text-lg rounded-full text-black`}
                  >
                    {requisiteAccepted ? 1 : 0}
                  </div>
                )}
              </MenuItem>
            )}
          {(user.role === 'STUDENT' ||
            user.role === 'DIRECTOR' ||
            user.role === 'ZDIRECTOR' ||
            user.role === 'TRANERMETODIST') && (
            <MenuItem
              setModal={setModal}
              title={tipsForParentsText[language]}
              closedmenu={closedmenu}
              to="/faq"
              ico={Faq}
            >
              {tipsForParentsText[language]}
            </MenuItem>
          )}
          {(user.role === 'DIRECTOR' ||
            user.role === 'ZDIRECTOR' ||
            user.role === 'TRANER') && (
            <MenuItem
              setModal={setModal}
              title={tipsForTrainersText[language]}
              closedmenu={closedmenu}
              to="/faqtrainers"
              ico={Faq}
            >
              {tipsForTrainersText[language]}
            </MenuItem>
          )}
          {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') && (
            <MenuItem
              setModal={setModal}
              title={programText[language]}
              closedmenu={closedmenu}
              to="/program"
              ico={Program}
            >
              {programText[language]}
            </MenuItem>
          )}
          {(user.role === 'DIRECTOR' ||
            user.role === 'ZDIRECTOR' ||
            user.role === 'TRANERMETODIST') && (
            <MenuItem
              setModal={setModal}
              title={trialLessonText[language]}
              closedmenu={closedmenu}
              to="/testlesson"
              ico={TestLesson}
            >
              {trialLessonText[language]}
            </MenuItem>
          )}
          {(user.role === 'DIRECTOR' ||
            user.role === 'ZDIRECTOR' ||
            user.role === 'ADMIN') && (
            <MenuItem
              setModal={setModal}
              title={waitGroupText[language]}
              closedmenu={closedmenu}
              to="/groupwaiting"
              ico={Groups}
            >
              {waitGroupText[language]}
            </MenuItem>
          )}
          {(user.role === 'DIRECTOR' ||
            user.role === 'ZDIRECTOR' ||
            user.role === 'ADMIN') && (
            <MenuItem
              setModal={setModal}
              title={accessText[language]}
              closedmenu={closedmenu}
              to="/permissions"
              ico={Access}
            >
              {accessText[language]}

              {!!trainerEditedCount && (
                <div className="h-fit self-center ml-3  px-1 min-w-[28px] flex justify-center text-lg rounded-full text-black bg-blue-500">
                  {trainerEditedCount}
                </div>
              )}
              {!!editedCount && (
                <div className="h-fit self-center ml-3 bg-apricot px-1 min-w-[28px] flex justify-center text-lg rounded-full text-black">
                  {editedCount}
                </div>
              )}
            </MenuItem>
          )}
          {/* {user.role === 'TRANER' && (
            <MenuItem
              setModal={setModal}
              title={myCommentsText[language]}
              closedmenu={closedmenu}
              to="/mycomments"
              ico={Groups}
            >
              {myCommentsText[language]}
            </MenuItem>
          )} */}
          {/* {(user.role === 'DIRECTOR' ||
            user.role === 'ZDIRECTOR' ||
            user.role === 'TRANERMETODIST') && (
            <MenuItem
              setModal={setModal}
              title={commentText[language]}
              closedmenu={closedmenu}
              to="/comments"
              ico={Groups}
            >
              {commentText[language]}
            </MenuItem>
          )} */}
          {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') && (
            <MenuItem
              setModal={setModal}
              title={textsText[language]}
              closedmenu={closedmenu}
              to="/texts"
              ico={<MdTextFields size={24} />}
            >
              {textsText[language]}
            </MenuItem>
          )}
          <MenuItem
            setModal={setModal}
            title={'Уведомления'}
            closedmenu={closedmenu}
            to="/mynotifications"
            ico={<FaBell size={24} />}
          >
            {'Уведомления'}
          </MenuItem>
          { user.role !== 'PROGRAMMER' && <MenuItem
            setModal={setModal}
            title={'Мои отзывы'}
            closedmenu={closedmenu}
            to="/myestimates"
            ico={<MdOutlineReviews size={24} />}
          >
            {'Мои отзывы'}
          </MenuItem>}
        </ul>
        {!isDeviceMobile() &&
        <button className='flex justify-center mt-auto mb-2'>
          <Link to="/messenger/chat/662603b7fbceb487fbc46a42"><FaBell color='white' size={24} /></Link>
          {!!unreadedNotificationsCount && (
            <div className="h-fit self-center ml-1 px-1 min-w-[28px] flex justify-center text-lg rounded-full text-black bg-blue-500">
              {unreadedNotificationsCount}
            </div>
          )}
        </button>
        }
        
        <button
          onClick={() => setLangModalOpened(true)}
          className={`bg-[#6d5733] w-full min-h-[40px] cursor-pointer border-t-white border-t-2 flex gap-2 items-stretch  ${
            closedmenu ? 'justify-center ' : ''
          }`}
        >
          <div
            className={`flex justify-center items-center min-w-[42px] border-r-white ${
              !closedmenu ? 'border-r-2' : 'border-r-0'
            }`}
          >
            <img src={languageIcon} alt="language" className="w-[20px]" />
          </div>
          {!closedmenu && (
            <div className="py-[8px] flex gap-[5px]">
              <span className="text-[16px] text-white font-medium">
                {languageText[language]}
              </span>
              <div className="flex gap-1">
                {Object.values(languages).map((item) => (
                  <img
                    src={item.img}
                    alt="language"
                    key={item.text}
                    className="rounded-full w-[25px]"
                  />
                ))}
              </div>
            </div>
          )}
        </button>
        {testUser._id && <button
          onClick={() => {
            void dispatch(logout());
            void dispatch(clearSession());
            window.location.reload();
          }}
          className={`bg-red-600 w-full min-h-[40px] cursor-pointer border-t-white border-t-2 flex gap-2 items-stretch ${
            closedmenu ? 'justify-center' : ''
          }`}
        >
          <div
            className={`flex justify-center items-center min-w-[42px] border-r-white ${
              !closedmenu ? 'border-r-2' : 'border-r-0'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
          </div>
            {!closedmenu && (
            <div className="py-[8px] flex gap-[5px]">
              <span className="text-[16px] text-white font-medium">
                {logoutText[language]}
              </span>
            </div>
          )}
        </button>}
      </nav>
      <LanguageModal
        isModalOpened={langModalOpened}
        setIsModalOpened={setLangModalOpened}
      />
    </>
  );
};

export default Menu;
