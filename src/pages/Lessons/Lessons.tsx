import { FC, useEffect, useState } from 'react';
import Table from '../../components/Lessons/Table';
import AboutPromotionModal from '../../components/Modals/AboutPromotionModal.tsx';
import AppDownloadModal from '../../components/Modals/AppDownloadModal.tsx';
import HomeRecomendModal from '../../components/Modals/HomeRecomendModal.tsx';
import UseGoogleModal from '../../components/Modals/UseGoogleModal.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getGroups } from '../../store/reducers/GroupSlice';
import { translations } from '../../utils/translations.tsx';
import TrustLessonWarning from '../../components/TrustLessonWarning/TrustLessonWarning.tsx';

const Lessons: FC = () => {
  const dispatch = useAppDispatch();
  const { groups } = useAppSelector((state) => state.GroupSlice);
  const user = useAppSelector((state) => state.UserSlice.user);
  const language = useAppSelector((state) => state.TranslateSlice.language);

  const [isAppDownloadModalOpened, setIsAppDownloadModalOpened] =
    useState<boolean>(false);
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [isRecomendModalOpened, setIsRecomendModalOpened] =
    useState<boolean>(false);
  const [isPromotionModalOpened, setIsPromotionModalOpened] =
    useState<boolean>(false);

  const { useGoogleBtnText, moreDetailsText } = translations.useGoogleModal;
  const { actionText, copyBtnText, copyBtn2Text } = translations.homepage;

  const onOpenRecomendModal = () => setIsRecomendModalOpened(true);
  const onOpenPromotionModal = () => setIsPromotionModalOpened(true);

  // TODO!: Delete userAgent && isIosMobApp after comfirm app in AppStore + string 45,59!
  const ua = navigator.userAgent;
  const isIosMobApp = ua === 'ios-mob-app';

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getGroups({}));
    };
    void fetchData();
  }, [dispatch]);

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

  const openModal = (): void => setModalOpened(true);
  const closeModal = (): void => setModalOpened(false);

  return (
    <div className="w-full">
      <TrustLessonWarning />
      {!isIosMobApp && (
        <div className="bg-[#2c2c2c] w-full p-3 flex flex-row gap-[5px] justify-center">
          <h4 className="text-[20px] text-red-600">
            {useGoogleBtnText[language]}
          </h4>
          <button
            onClick={openModal}
            className="bg-transparent text-blue-400 text-[16px] underline"
          >
            {moreDetailsText[language]}
          </button>
        </div>
      )}
      {groups.length > 0 && <Table table={groups} />}
      {user.role !== 'TRANER' && !isIosMobApp && (
        <div className="flex flex-col md:pl-5 items-center md:items-start">
          <strong className="text-red-600 text-xl font-bold md:ml-5">
            {actionText[language]}
          </strong>
          <button
            onClick={onOpenRecomendModal}
            className="w-fit bg-gradient-button rounded-full mt-2 px-1 sm:px-5 py-2  items-center font-semibold shadow-lg hover:bg-gradient-appricot hover:text-black text-blue-500 text-[12px] sm:text-[14px] xl:text-[18px] leading-normal mb-2"
          >
            <p>{copyBtnText[language]}</p>
          </button>
          <button
            onClick={onOpenPromotionModal}
            className="w-fit bg-gradient-appricot rounded-full mt-2 px-1 sm:px-5 mb-2 py-2  items-center font-semibold shadow-lg hover:text-red-600 text-black text-[12px] sm:text-[14px] xl:text-[18px] leading-normal md:ml-12"
          >
            <p>{copyBtn2Text[language]}</p>
          </button>
        </div>
      )}
      <AppDownloadModal
        active={isAppDownloadModalOpened}
        onClose={setIsAppDownloadModalOpened}
      />
      <UseGoogleModal active={modalOpened} onClose={closeModal} />
      <HomeRecomendModal
        active={isRecomendModalOpened}
        onClose={setIsRecomendModalOpened}
      />
      <AboutPromotionModal
        active={isPromotionModalOpened}
        onClose={setIsPromotionModalOpened}
        onOpenRecomendModal={onOpenRecomendModal}
      />
    </div>
  );
};

export default Lessons;
