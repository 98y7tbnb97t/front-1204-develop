import { FC, useState } from "react";
import Modal from "../UI/Modal";
import ChangeLanguageBtns from "../UI/ChangeLanguageBtns";
import { Elanguages } from "../../store/reducers/TranslateSlice";
import Button from "../UI/Button";
import { IInfoText } from "../../models/IInfoTexts";
import { translations } from "../../utils/translations";
import TextEditor from "../Widgets/TextEditor";

interface EditTeamsGameInfoModalProps {
  text: IInfoText;
  setText: (text: IInfoText) => void;
  active: boolean;
  setActive: (active: boolean) => void;
  onEditText: (text: IInfoText) => Promise<void>;
}

const {
  editText
} = translations.lessons

const EditTeamsGameInfoModal:FC<EditTeamsGameInfoModalProps> = ({ active, setActive, text, setText, onEditText }) => {
  const [language, setLanguage] = useState<Elanguages>(Elanguages.RU);

  const onEditTextHandler = () => {
    void onEditText(text);
  }

  const onChange = (language: Elanguages) => (value: string) => {
    setText({ ...text, [language]: value })
  };

  return (
    <>
    <Modal 
      active={active}
      setActive={setActive}
      closeBtnStyle={'!text-black'}
      className={`!max-w-[1100px] p-8 !h-[800px] mh-full !w-full`}
    >
      {language === Elanguages.RU && <TextEditor onChange={onChange(Elanguages.RU)} value={text.ru || ''}/>}
      {language === Elanguages.EN && <TextEditor onChange={onChange(Elanguages.EN)} value={text.en || ''}/>}
      {language === Elanguages.AM && <TextEditor onChange={onChange(Elanguages.AM)} value={text.am || ''}/>}
      <ChangeLanguageBtns className="mt-2" language={language} onLangChange={setLanguage}/>
      <Button
        className="mt-2"
        onClick={onEditTextHandler}
      >
        {editText[language]}
      </Button>
    </Modal>
    </>
  );
}

export default EditTeamsGameInfoModal;