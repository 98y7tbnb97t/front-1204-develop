
import copy from 'copy-to-clipboard';
import { FC, useEffect, useState } from 'react';
import Modal from '../UI/Modal.tsx';
import Turndown from 'turndown';
import copyImg from '../../assets/icons/copy.png';
import messengerImg from '../../assets/icons/messenger.png';
import telegramImg from '../../assets/icons/telegram.png';
import viberImg from '../../assets/icons/viber.png';
import whatsappImg from '../../assets/icons/whatsapp.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { Elanguages } from '../../store/reducers/TranslateSlice.ts';
import { isDeviceMobile } from '../../utils/getDeviceType.ts';
import {
  ITranslateItemArray,
  ITranslateItemString,
  translations,
} from '../../utils/translations.tsx';
import ChangeLanguageBtns from '../UI/ChangeLanguageBtns.tsx';
import { EInfoTextFields } from '../../models/IInfoTexts.ts';
import { getInfoText } from '../../store/reducers/InfoTextsSlice.ts';

interface HomeRecomendModalProps {
  active: boolean;
  onClose: (val: boolean) => void;
}

const classNames = {
  title:
    'text-[#fdc800] font-normal text-center text-[30px] mb-[15px] px-[10px]',
  container: 'max-w-[700px] mx-auto px-[15px]',
  contentTxt: 'text-[16px] block text-white whitespace-pre-wrap leading-[1.6]',
};

const turndownService = new Turndown({
  linkStyle: 'referenced'
});

const processText = (text:string) => {
  return text.replace(/\[(https?:\/\/[^\]]+)\]\[\d+\]/g, (_, p1: string) => {
      return p1.replace(/\s/g, '');
  })
  .replace(/\n\[\d+\]:\shttps?:\/\/[^\n]+$/gm, '').trim();
};

const HomeRecomendModal: FC<HomeRecomendModalProps> = ({ active, onClose }) => {
  const { user } = useAppSelector((state) => state.UserSlice);

  const [isshareBtnsShowing, setIsshareBtnsShowing] = useState(false);
  const language = useAppSelector((state) => state.TranslateSlice.language);

  const [popupLanguage, setPopupLanguage] = useState<Elanguages>(language);
  const [isCopied, setIsCopied] = useState(false);

  const {
    recommendationTitleText,
    shareText,
    copiedText,
  }: {
    recommendationTitleText: ITranslateItemString;
    shareText: ITranslateItemString;
    recommendationText: ITranslateItemString;
    advantagesText: ITranslateItemString;
    advantageLinkText: ITranslateItemString;
    advantage1Text: ITranslateItemArray;
    advantage4Text: ITranslateItemString;
    advantage4LinkText: ITranslateItemString;
    registerForFreeLessonText: ITranslateItemString;
    officialSiteText: ITranslateItemString;
    instagramText: ITranslateItemString;
    priceSiteText: ITranslateItemString;
    copiedText: ITranslateItemString;
  } = translations.recommendModal;
  const dispatch = useAppDispatch();
  const { recomendationText } = useAppSelector((state) => state.InfoTextsSlice);
  const referrerData = `id:${user._id}, name:${user.name}, surname:${user.sname}, email:${user.email}`;
  const referrerUrl = `https://araratchess.ru/online?referrer=${btoa(
    escape(referrerData),
  )}&popup=free-lesson`;

  useEffect(() => {
    void dispatch(getInfoText({ field: EInfoTextFields.recomendationText }));
  }, [dispatch]);

  const shareFullText = processText(turndownService.turndown(`${recomendationText[popupLanguage]
    ?.replace('{{ref_link}}', `<a class="text-[#216ba5] break-all" href="${referrerUrl}">${referrerUrl}</a>`) || ''}\n`)
    .replace(/\\/g, ' '))
  
  const telegramShareText = shareFullText.replace(/\*\*/g, '');

  const toggleShareBtnsShowing = () =>
    setIsshareBtnsShowing((prevState) => !prevState);

  const copyText = () => {
    copy(shareFullText.replace(/\*\*/g, ''));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  const onLangChange = (lang: Elanguages) => {
    setPopupLanguage(lang);
  };

  const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(referrerUrl)}&text=${encodeURIComponent(
    telegramShareText,
  )}`;

  const whatsappLink = isDeviceMobile()
    ? `whatsapp://send?text=${encodeURIComponent(shareFullText.replace(/\*\*/g, '*'))}`
    : `https://web.whatsapp.com/send?text=${encodeURIComponent(shareFullText.replace(/\*\*/g, '*'))}`;

  return (
    <Modal
      active={active}
      setActive={onClose}
      closeBtnStyle={'!text-black'}
      className={`${classNames.container} !p-[0px] !bg-white rounded-[20px]`}
    >
      <div>
        <div className={`${classNames.container}`}>
          <h2 className={classNames.title}>
            {recommendationTitleText[popupLanguage]}
          </h2>
          <div className="relative">
            <div className="flex items-center justify-between flex-col sm:flex-row gap-2 mb-2">
              <ChangeLanguageBtns onLangChange={onLangChange} language={popupLanguage} className='mb-10'/>
              <div className='flex flex-col items-center'>
                <button
                  onClick={toggleShareBtnsShowing}
                  className="bg-[#e1e3e8] py-[10px] px-[20px] text-[#424242] text-[16px] font-medium block  border-0 max-w-[200px] w-full "
                >
                  {shareText[popupLanguage]}
                </button>
                <div
                  className={`bottom-[-5px] right-0 mt-2 rounded-[5px] px-[10px] py-[6px] bg-[#ddd] flex items-center gap-[8px]`}
                >
                  <button
                    onClick={copyText}
                    className="border-0 bg-transparent cursor-pointer relative"
                  >
                    <img src={copyImg} alt="copy" className="w-[25px]" />
                    <span
                      className={`absolute top-[-20px] left-[50%] translate-x-[-50%] text-[14px] text-black translate-y-[-100%] whitespace-nowrap rounded-[5px] p-[6px] bg-[#ddd] transition text-center ${
                        isCopied ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {copiedText[popupLanguage]}
                    </span>
                  </button>
                  <button className="border-0 bg-transparent cursor-pointer">
                    <a
                      target="_blank"
                      href={whatsappLink}
                      className="border-0 bg-transparent cursor-pointer"
                    >
                      <img src={whatsappImg} alt="copy" className="w-[35px]" />
                    </a>
                  </button>
                  <button className="border-0 bg-transparent cursor-pointer">
                    <a target="_blank" href={telegramLink}>
                      <img src={telegramImg} alt="copy" className="w-[35px]" />
                    </a>
                  </button>
                  <button className="border-0 bg-transparent cursor-pointer">
                    <a
                      href={`viber://forward?text=${encodeURIComponent(shareFullText)}`}
                      target="_blank"
                    >
                      <img src={viberImg} alt="copy" className="w-[35px]" />
                    </a>
                  </button>
                  <button className="border-0 bg-transparent cursor-pointer">
                    <a
                      target="_blank"
                      href={`fb-messenger://share?link=${encodeURIComponent(referrerUrl)}`}
                    >
                      <img src={messengerImg} alt="copy" className="w-[35px]" />
                    </a>
                  </button>
                </div>
              </div>
            </div>

            
          </div>
          <div className="text-[14px] block text-black whitespace-pre-wrap leading-[1.6] py-[10px]">
            <div dangerouslySetInnerHTML={{
              __html: recomendationText[popupLanguage]?.replace('{{ref_link}}', `<a class="text-[#216ba5] break-all" href="${referrerUrl}">${referrerUrl}</a>`) || ''}
            }></div>
          </div>
        </div>
      </div>
    </Modal>
  );
};



export default HomeRecomendModal;
