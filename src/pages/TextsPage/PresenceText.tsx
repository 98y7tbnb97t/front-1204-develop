import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { editInfoText, getInfoText } from '../../store/reducers/InfoTextsSlice';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import { EInfoTextFields, IInfoText } from '../../models/IInfoTexts';
import { Elanguages } from '../../store/reducers/TranslateSlice';
import ChangeLanguageBtns from '../../components/UI/ChangeLanguageBtns';
import { translations } from '../../utils/translations';

const PresenceText: FC = () => {
  const dispatch = useAppDispatch();
  const { willBePresent, willNotBePresent } = useAppSelector((state) => state.InfoTextsSlice);
  const { language } = useAppSelector((state) => state.TranslateSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [willBeLanguage, setWillBeLanguage] = useState<Elanguages>(Elanguages.RU);
  const [wontBeLanguage, setWontBeLanguage] = useState<Elanguages>(Elanguages.RU);

  const {saveText, closeText, successfullText, dataSavedText} = translations.infoTexts;
  const {willBeInLesson, willNotBeInLesson} = translations.autoSMS;

  const [willBePresentText, setWillBePresentText] = useState<IInfoText>({
    ru: '',
    en: '',
    am: '',
  });
  const [willNotBePresentText, setWillNotBePresentText] = useState<IInfoText>({
    ru: '',
    en: '',
    am: '',
  });

  useEffect(() => {
    void dispatch(getInfoText({ field: EInfoTextFields.willBePresent }));
    void dispatch(getInfoText({ field: EInfoTextFields.willNotBePresent }));
  }, [dispatch]);

  useEffect(() => {
    if (willBePresent.ru) {
      setWillBePresentText(willBePresent);
    }
    if (willNotBePresent.ru) {
      setWillNotBePresentText(willNotBePresent);
    }
  }, [willBePresent, willNotBePresent]);

  const handleSave = () => {
    void dispatch(editInfoText({ field: EInfoTextFields.willBePresent, text: willBePresentText }))
    void dispatch(editInfoText({ field: EInfoTextFields.willNotBePresent, text: willNotBePresentText }))
    setIsModalOpen(true);
  };
  return (
    <>
    <ChangeLanguageBtns className="mt-2" language={willBeLanguage} onLangChange={setWillBeLanguage}/>
      <p>{willBeInLesson[willBeLanguage]}</p>
      <textarea
        value={willBePresentText[willBeLanguage]}
        onChange={(e) => setWillBePresentText({ ...willBePresentText, [willBeLanguage]: e.target.value || '' })}
        className="w-full h-96 border border-gray-300 p-2"
      />
      <ChangeLanguageBtns className="mt-2" language={wontBeLanguage} onLangChange={setWontBeLanguage}/>
      <p>{willNotBeInLesson[wontBeLanguage]}</p>
      <textarea
        value={willNotBePresentText[wontBeLanguage]}
        onChange={(e) => setWillNotBePresentText({ ...willNotBePresentText, [wontBeLanguage]: e.target.value || '' })}
        className="w-full h-96 border border-gray-300 p-2"
      />
      <Button onClick={handleSave} className="mt-5 bg-green-500 hover:bg-green-600">{saveText[language]}</Button>
      <Modal active={isModalOpen} setActive={setIsModalOpen}>
        <div className="p-4 text-center">
            <h2 className="text-xl font-bold mb-2">{successfullText[language]}</h2>
            <p>{dataSavedText[language]}</p>
            <Button onClick={() => setIsModalOpen(false)} className="mt-4">{closeText[language]}</Button>
        </div>
      </Modal>
    </>
  );
};

export default PresenceText;