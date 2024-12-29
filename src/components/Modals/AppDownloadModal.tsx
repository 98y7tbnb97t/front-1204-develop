import { FC, useState } from 'react';
import AraratTitle from '../../assets/AraratTitle.webp';
import lichessModalImg from '../../assets/lichessModalImg.png';
import pcModeImg from '../../assets/pcmode.png';
import { useAppSelector } from '../../hooks/redux.ts';
import {
  ITranslateItemArray,
  ITranslateItemString,
  translations,
} from '../../utils/translations.tsx';
import Modal from '../UI/Modal.tsx';

interface AppDowloadModalProps {
  active: boolean;
  onClose: (val: boolean) => void;
}

const classNames = {
  title:
    'text-[#fdc800] font-normal text-center text-[30px] mb-[12px] px-[10px]',
  container: 'max-w-[700px] mx-auto px-[15px]',
  contentTxt: 'text-[16px] block text-white whitespace-pre-wrap leading-[1.6]',
};

const AppDownloadModal: FC<AppDowloadModalProps> = ({ active, onClose }) => {
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const [lishessModalOpened, setLishessModalOpened] = useState<boolean>(false);
  const [mobileNewsModalOpened, setMobileNewsOpened] = useState<boolean>(false);
  const [lessonsImgOpened, setLessonsImgOpened] = useState<boolean>(false);

  const {
    appDownloadText1,
    appDownloadText1_1,
    appDownloadText1_2,
    appDownloadText2,
    appDownloadText3,
    appDownloadText4,
    appDownloadText5,
    appDownloadText6,
  }: {
    appDownloadText1: ITranslateItemString;
    appDownloadText1_1: ITranslateItemString;
    appDownloadText1_2: ITranslateItemString;
    appDownloadText2: ITranslateItemString;
    appDownloadText3: ITranslateItemString;
    appDownloadText4: ITranslateItemString;
    appDownloadText5: ITranslateItemString;
    appDownloadText6: ITranslateItemArray;
  } = translations.appDownloadModal;
  const {
    mobilePlatform1Text,
    mobilePlatform2Text,
    mobilePlatform3Text,
    mobilePlatform4Text,
    importantText,
  } = translations.homepage;

  const onOpenLichessModal = () => setLishessModalOpened(true);
  const onOpenMobileNewsModal = () => setMobileNewsOpened(true);

  return (
    <>
      <Modal
        active={active}
        setActive={onClose}
        closeBtnStyle={'!text-black'}
        className={`${classNames.container} !p-[0px] !bg-white rounded-[20px]`}
      >
        <div className="w-full p-4">
          <h2
            className={'text-[24px]  text-red-600 font-extrabold text-center'}
          >
            {appDownloadText1[language]}
          </h2>
          <h2
            className={
              'text-[24px]  text-red-600 font-extrabold mb-[10px]  text-center'
            }
          >
            {appDownloadText1_1[language]}
          </h2>
          <div className="flex justify-center text-center">
            <p className="text-[24px] font-bold text-center">
              {appDownloadText1_2[language]}
            </p>
            <img
              src={AraratTitle}
              alt="ararat-title"
              className={'  text-[24px]  object-contain mb-2'}
            />
          </div>
          <div className="border-y-2 border-red-600 py-2 mb-4 mx-auto">
            <p className="text-[24px] font-bold text-center mb-1">
              🚀 {appDownloadText2[language]}
            </p>
            <p className="text-[24px] font-bold text-center mb-1">
              ✍️ {appDownloadText3[language]}
            </p>
            <p className="text-[24px] font-bold text-center mb-1">
              🎥 {appDownloadText4[language]}
            </p>
            <p className="text-[24px] font-bold text-center mb-1">
              {appDownloadText5[language]} 👍
            </p>
            <p className={'text-[20px] font-medium '}>
              {appDownloadText6[language][0]}
              <button
                onClick={onOpenLichessModal}
                className={
                  'w-fit bg-gradient-button rounded-full px-1 sm:px-5 py-2 font-semibold shadow-lg hover:bg-gradient-appricot hover:text-black text-blue-500 text-[12px] sm:text-[14px] xl:text-[18px] leading-normal'
                }
              >
                {appDownloadText6[language][1]}
              </button>
              {appDownloadText6[language][2]}
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
      </Modal>
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
        setActive={setMobileNewsOpened}
        active={mobileNewsModalOpened}
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
    </>
  );
};

export default AppDownloadModal;
