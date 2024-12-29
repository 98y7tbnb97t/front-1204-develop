import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getInfoText, editInfoText } from '../../store/reducers/InfoTextsSlice';
import Button from '../../components/UI/Button';
import { EInfoTextFields, IInfoText } from '../../models/IInfoTexts';
import { Elanguages } from '../../store/reducers/TranslateSlice';
import ChangeLanguageBtns from '../../components/UI/ChangeLanguageBtns';
import Modal from '../../components/UI/Modal';
import TextEditor from '../../components/Widgets/TextEditor';


const StockText: FC = () => {
  const dispatch = useAppDispatch();
  const { waitForCoachText } = useAppSelector((state) => state.InfoTextsSlice);
  const [language, setLanguage] = useState<Elanguages>(Elanguages.RU);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [text, setText] = useState<IInfoText>({
    [Elanguages.RU]: '',
    [Elanguages.EN]: '',
    [Elanguages.AM]: '',
  });

  useEffect(() => {
      void dispatch(getInfoText({ field: EInfoTextFields.waitForCoachText }));
  }, [dispatch]);

  useEffect(() => {
    if (waitForCoachText) {
      setText(waitForCoachText);
    }
  }, [waitForCoachText]);

  const handleSave = () => {
    void dispatch(editInfoText({ field: EInfoTextFields.waitForCoachText, text }))
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
      <Button onClick={handleSave} className="mt-5 bg-green-500 hover:bg-green-600">Сохранить</Button>
      <Modal active={isModalOpen} setActive={setIsModalOpen}>
        <div className="p-4 text-center">
            <h2 className="text-xl font-bold mb-2">Успешно!</h2>
            <p>Данные сохранены</p>
            <Button onClick={() => setIsModalOpen(false)} className="mt-4">Закрыть</Button>
        </div>
      </Modal>
    </>
  );
};

export default StockText;