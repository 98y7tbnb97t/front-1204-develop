import { FC, useEffect, useState } from 'react';
import AraratTitle from '../assets/AraratTitle.png';
import MainLogoWebp from '../assets/MainLogo.webp';
import lichessModalImg from '../assets/lichessModalImg.png';
import pcModeImg from '../assets/pcmode.png';
import AboutPromotionModal from '../components/Modals/AboutPromotionModal.tsx';
import AppDownloadModal from '../components/Modals/AppDownloadModal.tsx';
import DebtorWarningModal from '../components/Modals/DebtorWarningModal.tsx';
import HomeRecomendModal from '../components/Modals/HomeRecomendModal.tsx';
import Modal from '../components/UI/Modal.tsx';
import { useAppSelector } from '../hooks/redux.ts';
import { updateUserFCM } from '../utils/fcms.ts';
import { translations } from '../utils/translations.tsx';

const IndexPage: FC = () => {
  const user = useAppSelector((state) => state.UserSlice.user);
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const [isRecomendModalOpened, setIsRecomendModalOpened] =
    useState<boolean>(false);
  const [isPromotionModalOpened, setIsPromotionModalOpened] =
    useState<boolean>(false);
  const [isAppDownloadModalOpened, setIsAppDownloadModalOpened] =
    useState<boolean>(false);
  const [isDebtorWarningModalOpened, setIsDebtorWarningModalOpened] =
    useState<boolean>(false);
  const [lishessModalOpened, setLishessModalOpened] = useState<boolean>(false);
  const [mobeleNewsModalOpened, setMobeleNewsOpened] = useState<boolean>(false);
  const [lessonsImgOpened, setLessonsImgOpened] = useState<boolean>(false);

  const {
    futurePlan4Text,
    futurePlan5Text,
    futurePlan6Text,
    actionText,
    copyBtnText,
    copyBtn2Text,
    mobileIsReadyText,
    loginLichesText,
    mobilePlatform1Text,
    mobilePlatform2Text,
    mobilePlatform3Text,
    mobilePlatform4Text,
    importantText,
  } = translations.homepage;

  // TODO!: Delete userAgent && isIosMobApp after comfirm app in AppStore + strings 68,108!
  const ua = navigator.userAgent;
  const isIosMobApp = ua === 'ios-mob-app';

  const onOpenRecomendModal = () => setIsRecomendModalOpened(true);
  const onOpenPromotionModal = () => setIsPromotionModalOpened(true);
  const onOpenLichessModal = () => setLishessModalOpened(true);
  const onOpenMobileNewsModal = () => setMobeleNewsOpened(true);

  useEffect(() => {
    const tokenFCM = localStorage.getItem('tokenFCM');
    const { _id, access } = user;
    if (tokenFCM) {
      updateUserFCM(_id, tokenFCM).catch((error) => console.error(error));
    }
    function checkFCM() {
      setIsAppDownloadModalOpened(true);
    }
    (!user.fcm || user.fcm.length === 0) &&
      user.born &&
      user.role !== 'DIRECTOR' &&
      user.role !== 'ZDIRECTOR' &&
      user.role !== 'ADMIN' &&
      checkFCM();

    if (access === false) {
      setIsDebtorWarningModalOpened(true);
    }
  }, []);

  return (
    <>
      <div className="w-full h-full p-3 items-center flex flex-col">
        <div
          className={
            'flex md:gap-10 gap-4 flex-wrap w-full justify-between sm:flex-row flex-col  items-center sm:items-start'
          }
        >
          <div className="text-center text-[16px] xl:text-[24px] flex min-w-[250px]  flex-col self-center justify-center items-center">
            {user.role !== 'TRANER' && !isIosMobApp && (
              <>
                <strong className="text-red-600">{actionText[language]}</strong>
                <button
                  onClick={onOpenRecomendModal}
                  className="w-fit bg-gradient-button rounded-full mt-2 px-1 sm:px-5 py-2  items-center font-semibold shadow-lg hover:bg-gradient-appricot hover:text-black text-blue-500 text-[12px] sm:text-[14px] xl:text-[18px] leading-normal mb-2"
                >
                  <p>{copyBtnText[language]}</p>
                </button>
                <button
                  onClick={onOpenPromotionModal}
                  className="w-fit bg-gradient-appricot rounded-full mt-2 px-1 sm:px-5 py-2  items-center font-semibold shadow-lg hover:text-red-600 text-black text-[12px] sm:text-[14px] xl:text-[18px] leading-normal"
                >
                  <p>{copyBtn2Text[language]}</p>
                </button>
              </>
            )}
          </div>
          <ul className="self  min-w-[300px]  text-[14px] md:text-[16px] xl:text-[24px] justify-self-start font-semibold  leading-normal flex flex-col items-center sm:items-start">
            <li>
              {futurePlan4Text[language]}
              <span className="text-red-600"> 01.01.2025</span>
            </li>
            <li>
              {futurePlan5Text[language]}
              <span className="text-red-600"> 01.01.2025</span>
            </li>
            <li>
              {futurePlan6Text[language]}
              <span className="text-red-600"> 01.01.2025</span>
            </li>
          </ul>
        </div>
        <br />
        {!isIosMobApp && (
          <div
            className={
              'flex flex-1 w-full items-center overflow-auto gap-2 flex-col xl:flex-row h-full'
            }
          >
            <div className={'flex-1 w-full sm:block hidden'}>
              <div
                className={
                  'sm:block hidden  border-4 border-red-500 rounded-[10px] p-[8px]'
                }
              >
                <div className="relative">
                  <h2
                    className={
                      'text-[24px]  text-red-600 font-extrabold mb-[10px]  text-center'
                    }
                  >
                    {mobileIsReadyText[language]}
                  </h2>
                  <img
                    src={AraratTitle}
                    alt="ararat-title"
                    className={'  text-[24px]  object-contain mx-auto'}
                  />
                </div>
                <p className={'text-[20px] font-medium '}>
                  {loginLichesText[language][0]}
                  <button
                    onClick={onOpenLichessModal}
                    className={
                      'w-fit bg-gradient-button rounded-full px-1 sm:px-5 py-2 font-semibold shadow-lg hover:bg-gradient-appricot hover:text-black text-blue-500 text-[12px] sm:text-[14px] xl:text-[18px] leading-normal'
                    }
                  >
                    {loginLichesText[language][1]}
                  </button>
                  {loginLichesText[language][2]}
                </p>
              </div>
              <button
                onClick={onOpenMobileNewsModal}
                className={
                  'text-[24px] font-medium   text-red-600 sm:block hidden mx-auto mt-[6px] underline'
                }
              >
                {importantText[language]}
              </button>
            </div>
            <div
              className="flex-1 mx-auto max-w-[350px] bg-contain bg-no-repeat bg-center w-[60vmin] h-full aspect-square"
              style={{ backgroundImage: `url(${MainLogoWebp})` }}
            ></div>
            <div className={'flex-1 w-full hidden xl:block'}></div>
          </div>
        )}

        <br />
      </div>
      <HomeRecomendModal
        active={isRecomendModalOpened}
        onClose={setIsRecomendModalOpened}
      />
      <AboutPromotionModal
        active={isPromotionModalOpened}
        onClose={setIsPromotionModalOpened}
        onOpenRecomendModal={onOpenRecomendModal}
      />
      <AppDownloadModal
        active={isAppDownloadModalOpened}
        onClose={setIsAppDownloadModalOpened}
      />
      <DebtorWarningModal
        modal={isDebtorWarningModalOpened}
        setModal={setIsDebtorWarningModalOpened}
      />
      <Modal
        setActive={setLishessModalOpened}
        active={lishessModalOpened}
        className={'max-w-[800px]'}
      >
        <img
          src={lichessModalImg}
          alt="lichess"
          className={'w-full max-h-[calc(100vh-90px)] object-contain'}
        />
      </Modal>
      <Modal
        setActive={setLessonsImgOpened}
        active={lessonsImgOpened}
        className={'max-w-[800px]'}
        backdropClassName={'!z-[80]'}
      >
        <img
          src={pcModeImg}
          alt="lichess"
          className={'w-full max-h-[calc(100vh-90px)] object-contain'}
        />
      </Modal>
      <Modal
        setActive={setMobeleNewsOpened}
        active={mobeleNewsModalOpened}
        className={'!max-w-[1000px]'}
      >
        <p
          className={
            'text-[18px] block text-black whitespace-pre-wrap leading-[1.6] py-[10px] dark:text-white'
          }
        >
          {mobilePlatform1Text[language]}
        </p>
        <p
          className={
            'text-[18px] block text-black whitespace-pre-wrap leading-[1.6] py-[10px] dark:text-white'
          }
        >
          {mobilePlatform2Text[language][0]}{' '}
          <button
            className={'underline font-bold text-blue-400'}
            onClick={() => setLessonsImgOpened(true)}
          >
            {mobilePlatform2Text[language][1]}
          </button>
          {mobilePlatform2Text[language][2]}
        </p>
        <p
          className={
            'text-[18px] block text-black whitespace-pre-wrap leading-[1.6] py-[10px] dark:text-white'
          }
        >
          {mobilePlatform3Text[language]}
        </p>
        <p
          className={
            'text-[18px] block text-black whitespace-pre-wrap leading-[1.6] py-[10px] dark:text-white'
          }
        >
          {mobilePlatform4Text[language]}
        </p>
      </Modal>
    </>
  );
};

export default IndexPage;
