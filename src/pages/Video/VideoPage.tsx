import copy from 'copy-to-clipboard';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import VideoGroups from '../../components/Video/VideoGroups';
import VideoList from '../../components/Video/VideoList';
import AppDownloadModal from '../../components/Modals/AppDownloadModal.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getGroups } from '../../store/reducers/GroupSlice';
import {
  ITranslateItemArray,
  ITranslateItemString,
  translations,
} from '../../utils/translations.tsx';
import Input from '../../components/UI/Input.tsx';
import debounce from 'lodash.debounce';
import { UserRoles } from '../../utils/userRoles.ts';
import TrustLessonWarning from '../../components/TrustLessonWarning/TrustLessonWarning.tsx';

const VideoPage: FC = () => {
  
  const language = useAppSelector((state) => state.TranslateSlice.language);

  // const {
  //     nameText,
  //     knowledgeLevelText,
  //     studentNumberText,
  //     startDateText,
  // }: {
  //     nameText: ITranslateItemString,
  //     knowledgeLevelText: ITranslateItemString,
  //     studentNumberText: ITranslateItemString,
  //     startDateText: ITranslateItemString,
  // } = translations.groups

  const {
    didYouMissLessonText,
    forCancellLessonText,
    weMissedLessonText,
    copyText,
    copiedText,
  }: {
    didYouMissLessonText: ITranslateItemString;
    forCancellLessonText: ITranslateItemArray;
    weMissedLessonText: ITranslateItemString;
    copyText: ITranslateItemString;
    copiedText: ITranslateItemString;
  } = translations.videoLessons;

  const {
    searchText,
  }: {
    searchText: ITranslateItemString;
  } = translations.messenger;

  // const [menu] = useState<ITopMenu[]>([
  //     {id: 0, name: nameText[language]},
  //     {id: 1, name: knowledgeLevelText[language]},
  //     {id: 2, name: studentNumberText[language]},
  //     {id: 3, name: startDateText[language]},
  // ])
  const [copyed, setCopyed] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { groups } = useAppSelector((state) => state.GroupSlice);
  const { user } = useAppSelector((state) => state.UserSlice);
  const [isAppDownloadModalOpened, setIsAppDownloadModalOpened] =
    useState<boolean>(false);

  // TODO!: Delete userAgent && isIosMobApp after comfirm app in AppStore + string 68!
  const ua = navigator.userAgent;
  const isIosMobApp = ua === 'ios-mob-app';

  const SearchDebounce = debounce((e: string) => {
    void dispatch(getGroups({ videocounter: true, search: e, archive: 'any' }));
  }, 1000);

  useEffect(() => {
    function checkFCM() {
      setIsAppDownloadModalOpened(true);
    }
    (!user.fcm || user.fcm.length === 0) &&
      user.born &&
      user.role !== 'DIRECTOR' &&
      user.role !== 'ZDIRECTOR' &&
      user.role !== 'ADMIN' &&
      checkFCM();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getGroups({ videocounter: true }));
    };
    void fetchData();
  }, [dispatch]);

  return (
    <div className="w-full">
      {/*<TopMenu/>*/}
      <div className="">
        {!isIosMobApp && (
          <>
            <p className="text-lg font-semibold text-red-500 px-5 mt-4 text-center">
              {didYouMissLessonText[language]}
            </p>
            <div className="w-full lg:w-1/3 px-2 order-2 lg:order-3">
              {(user.role === UserRoles.DIRECTOR || user.role === UserRoles.ZDIRECTOR) && (
                <Input
                  className="mt-2"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => void SearchDebounce(e.target.value)}
                  type="text"
                  placeholder={searchText[language]}
                />
              )}
            </div>
            <p className="text-lg font-semibold text-red-500 px-5 mt-4 text-center">
              {forCancellLessonText[language][0]}
              <a
                target="_blank"
                className="block mx-auto w-fit bg-gradient-button rounded-full px-5 py-2 mx-2 items-center font-semibold text-[16px] sm:text-2xl shadow-lg hover:bg-gradient-appricot text-blue-500 cursor-pointer"
                href="https://puzzle.araratchess.com/messenger/chat/651c1e9fbfbc95c1f9d7f8b8"
              >
                {forCancellLessonText[language][1]}
              </a>
            </p>
            <p className="text-lg font-semibold text-black-500 px-5 mt-4 text-center">
              {weMissedLessonText[language]}
              <span
                className="cursor-pointer font-bold text-red-500"
                onClick={() => {
                  setCopyed(true);
                  copy(weMissedLessonText[language]);
                }}
              >
                ({copyed ? copiedText[language] : copyText[language]})
              </span>
            </p>
          </>
        )}
        {user.role === 'DIRECTOR' ||
        user.role === 'ZDIRECTOR' ||
        user.role === 'TRANER' ||
        user.role === 'TRANERMETODIST' ||
        user.role === 'STUDENT' ? (
          groups && <VideoGroups groups={groups} />
        ) : (
          <VideoList />
        )}
      </div>
      <AppDownloadModal
        active={isAppDownloadModalOpened}
        onClose={setIsAppDownloadModalOpened}
      />
    </div>
  );
};

export default VideoPage;
