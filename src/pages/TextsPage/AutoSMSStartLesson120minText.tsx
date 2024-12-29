import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getInfoText, editInfoText } from '../../store/reducers/InfoTextsSlice';
import Button from '../../components/UI/Button';
import { EInfoTextFields, IInfoText } from '../../models/IInfoTexts';
import { Elanguages } from '../../store/reducers/TranslateSlice';
import ChangeLanguageBtns from '../../components/UI/ChangeLanguageBtns';
import Modal from '../../components/UI/Modal';
import { translations } from '../../utils/translations';
import TextEditor from '../../components/Widgets/TextEditor';

const AutoSMSStartLesson120minText: FC = () => {
  const dispatch = useAppDispatch();
  const { AutoSMSStartLesson120min } = useAppSelector((state) => state.InfoTextsSlice);
  const [language, setLanguage] = useState<Elanguages>(Elanguages.RU);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {saveText, closeText, successfullText, dataSavedText} = translations.infoTexts;

  const [text, setText] = useState<IInfoText>({
    [Elanguages.RU]: '',
    [Elanguages.EN]: '',
    [Elanguages.AM]: '',
  });

  useEffect(() => {
      void dispatch(getInfoText({ field: EInfoTextFields.AutoSMSStartLesson120min }));
  }, [dispatch]);

  useEffect(() => {
    if (AutoSMSStartLesson120min) {
      setText(AutoSMSStartLesson120min);
    }
  }, [AutoSMSStartLesson120min]);

  const handleSave = () => {
    void dispatch(editInfoText({ field: EInfoTextFields.AutoSMSStartLesson120min, text }))
    setIsModalOpen(true);
  };

  const onChange = (language: Elanguages) => (value: string) => {
    setText(prev => ({ ...prev, [language]: value }))
  };

  return (
    <>
      <ChangeLanguageBtns className="mt-2" language={language} onLangChange={setLanguage}/>
      {language === Elanguages.RU && <TextEditor onChange={onChange(Elanguages.RU)} value={text.ru || ''}/>}
      {language === Elanguages.EN && <TextEditor onChange={onChange(Elanguages.EN)} value={text.en || ''}/>}
      {language === Elanguages.AM && <TextEditor onChange={onChange(Elanguages.AM)} value={text.am || ''}/>}
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

export default AutoSMSStartLesson120minText;