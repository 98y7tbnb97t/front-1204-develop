import { FC, useEffect, useState } from "react";
import Modal from "../UI/Modal";
import ChangeLanguageBtns from "../UI/ChangeLanguageBtns";
import { Elanguages } from "../../store/reducers/TranslateSlice";
import { ITranslateItemString, translations } from "../../utils/translations";
import toSlug from "../../utils/toSlug";
import { IAutoSMSType } from "../../models/IAutoSMS";
import AutoSMSTypesService from "../../services/AutoSMSTypesService";

interface AutoSMSTypesModalProps {
  active: boolean;
  setActive: (active: boolean) => void;
  setTypes: React.Dispatch<React.SetStateAction<IAutoSMSType[]>>;
  types?: IAutoSMSType[];
  typeId?: string;
}

const AutoSMSTypesModal:FC<AutoSMSTypesModalProps> = ({ active, setActive, setTypes, types, typeId }) => {
  const [modalLanguage, setModalLanguage] = useState<Elanguages>(Elanguages.RU);
  const { nameT } = translations.autoSMS;
  const [autoSMSTypeName, setAutoSMSTypeName] = useState<ITranslateItemString>({
    [Elanguages.RU]: '',
    [Elanguages.EN]: '',
    [Elanguages.AM]: '',
  });

  useEffect(() => {
    const curType = types?.find(t => t._id === typeId);
    if (curType) {
      setAutoSMSTypeName(curType.name);
    }
  }, [typeId, types]);

  const saveAutoSMSTypeHandler = async () => {
    const slug = toSlug(autoSMSTypeName.en);
    if (typeId) {
      const res = await AutoSMSTypesService.editAutoSMSType({ _id: typeId, name: autoSMSTypeName, slug });
      setTypes(prev => prev.map(t => t._id === typeId ? res.data : t));
    } else {
      const res = await AutoSMSTypesService.createAutoSMSType({ name: autoSMSTypeName, slug });
      setTypes(prev => ([...prev, res.data]));
    }
    setActive(false);
    setAutoSMSTypeName({
      ru: '',
      en: '',
      am: ''
    });
  }
  
  return (
    <Modal className="p-5" active={active} setActive={setActive}>
      <h2 className="text-center text-xl font-bold mb-2">
        {typeId ? 'Редактировать' : 'Добавить тип уведомления'}
      </h2>
      <ChangeLanguageBtns className="mt-2" language={modalLanguage} onLangChange={setModalLanguage}/>
      <input
        className="bg-gray-200 rounded-md px-2 py-1 my-2"
        type="text" 
        placeholder={nameT[modalLanguage]} 
        value={autoSMSTypeName[modalLanguage]} 
        onChange={(e) => setAutoSMSTypeName({ ...autoSMSTypeName, [modalLanguage]: e.target.value})}
      />
      <button onClick={() => void saveAutoSMSTypeHandler()} className="bg-sky-500 block w-full text-white font-medium py-1 rounded-md">Сохранить</button>
    </Modal>
  );
}

export default AutoSMSTypesModal;