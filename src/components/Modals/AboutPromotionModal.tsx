import { FC, useEffect, useState } from 'react';
import { languages } from '../../constants.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { Elanguages } from '../../store/reducers/TranslateSlice.ts';
import {
  ITranslateItemString,
  translations,
} from '../../utils/translations.tsx';
import Modal from '../UI/Modal.tsx';
import { EInfoTextFields } from '../../models/IInfoTexts.ts';
import { getInfoText } from '../../store/reducers/InfoTextsSlice.ts';

interface AboutPromotionModalProps {
  active: boolean;
  onClose: (val: boolean) => void;
  onOpenRecomendModal: () => void;
}

const classNames = {
  title:
    'text-[#fdc800] font-normal text-center text-[30px] mb-[12px] px-[10px]',
  container: 'max-w-[700px] mx-auto px-[15px]',
  contentTxt: 'text-[16px] block text-white whitespace-pre-wrap leading-[1.6]',
};

const AboutPromotionModal: FC<AboutPromotionModalProps> = ({
  active,
  onClose,
  onOpenRecomendModal,
}) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const stockText = useAppSelector(state => state.InfoTextsSlice.stockText);
  const [popupLanguage, setPopupLanguage] = useState<Elanguages>(language);

  const {
    promotionTitleText,
  }: {
    promotionTitleText: ITranslateItemString;
  } = translations.aboutPromotionModal;

  useEffect(() => {
    void dispatch(getInfoText({ field: EInfoTextFields.stockText }));
  }, [dispatch]);

  const { copyBtnText } = translations.homepage;

  const onLangChange = (lang: Elanguages) => {
    setPopupLanguage(lang);
  };
  const handleRecommendButton = () => {
    onClose(false);
    onOpenRecomendModal();
  };

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
            {promotionTitleText[popupLanguage]}
          </h2>
          <div className="relative">
            <div className="flex items-center justify-between flex-col sm:flex-row gap-2 mb-2">
              <div className="flex gap-[6px] mb-4">
                {Object.values(languages).map((item) => (
                  <button
                    key={item.text}
                    onClick={() => onLangChange(item.text)}
                    className={`flex gap-[2px] p-[4px] items-center ${
                      popupLanguage === item.text
                        ? 'bg-[#ccc] rounded-full'
                        : ''
                    }`}
                  >
                    <img
                      src={item.img}
                      alt="language"
                      key={item.text}
                      className="rounded-full w-[20px]"
                    />
                    <span>{item.shortName}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{__html: stockText[popupLanguage] || ''}}></div>
          <div className="flex w-full mb-4 justify-center">
            <button
              onClick={handleRecommendButton}
              className="w-fit bg-gradient-button rounded-full mt-2 px-1 sm:px-5 py-2  items-center font-semibold shadow-lg hover:bg-gradient-appricot hover:text-black text-blue-500 text-[12px] sm:text-[14px] xl:text-[18px] leading-normal "
            >
              <p>{copyBtnText[popupLanguage]}</p>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AboutPromotionModal;
