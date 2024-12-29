import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getHomeworkText, saveHomeworkText } from '../../store/reducers/InfoTextsSlice';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import { translations } from '../../utils/translations';
import TextEditor from '../../components/Widgets/TextEditor';


const HomeworkText: FC = () => {
  const language = useAppSelector(state => state.TranslateSlice.language);
  const dispatch = useAppDispatch();
  const { homeworkText } = useAppSelector((state) => state.InfoTextsSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [text, setText] = useState<string>('');

  const {saveText, closeText, successfullText, dataSavedText} = translations.infoTexts;

  useEffect(() => {
    void dispatch(getHomeworkText());
  }, [dispatch]);

  useEffect(() => {
    if (homeworkText) {
      setText(homeworkText);
    }
  }, [homeworkText]);

  const handleSave = () => {
    void dispatch(saveHomeworkText(text))
    setIsModalOpen(true);
  };

  const onChange = (value: string) => {
    setText(value)
  }

  return (
    <>
      <TextEditor onChange={onChange} value={text}/>
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

export default HomeworkText;