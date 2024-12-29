import { FC, useEffect, useState } from "react";
import Modal from "../UI/Modal";
import ChangeLanguageBtns from "../UI/ChangeLanguageBtns";
import { Elanguages } from "../../store/reducers/TranslateSlice";
import { ITranslateItemString, translations } from "../../utils/translations";
import toSlug from "../../utils/toSlug";
import AutoSMSTemplatesService from "../../services/AutoSMSTemplatesService";
import { IAutoSMSTemplate } from "../../models/IAutoSMS";

interface AutoSMSTemplateModalProps {
  active: boolean;
  setActive: (active: boolean) => void;
  setTemplates: React.Dispatch<React.SetStateAction<IAutoSMSTemplate[]>>;
  templates?: IAutoSMSTemplate[];
  templateId?: string;
}

const AutoSMSTemplateModal:FC<AutoSMSTemplateModalProps> = ({ active, setActive, setTemplates, templates, templateId }) => {
  const [modalLanguage, setModalLanguage] = useState<Elanguages>(Elanguages.RU);
  const { nameT } = translations.autoSMS;
  const [autoSMSTemplateName, setAutoSMSTemplateName] = useState<ITranslateItemString>({
    [Elanguages.RU]: '',
    [Elanguages.EN]: '',
    [Elanguages.AM]: '',
  });
  const [autoSMSTemplate, setAutoSMSTemplate] = useState<ITranslateItemString>({
    [Elanguages.RU]: '',
    [Elanguages.EN]: '',
    [Elanguages.AM]: '',
  });

  const saveAutoSMSTemplateHandler = async () => {
    const slug = toSlug(autoSMSTemplateName.en);
    if (templateId) {
      const res = await AutoSMSTemplatesService.editAutoSMSTemplate({_id: templateId, slug, template: autoSMSTemplate, name: autoSMSTemplateName });
      setTemplates(prev => prev.map(t => t._id === templateId ? res.data : t));
    } else {
      const res = await AutoSMSTemplatesService.createAutoSMSTemplate({ name: autoSMSTemplateName, slug, template: autoSMSTemplate });
      setTemplates(prev => ([...prev, res.data]));
    }
    setActive(false);
    setAutoSMSTemplateName({
      ru: '',
      en: '',
      am: ''
    });
  }

  useEffect(() => {
    const curTemplate = templates?.find(t => t._id === templateId);
    if (curTemplate) {
      setAutoSMSTemplateName(curTemplate.name);
      setAutoSMSTemplate(curTemplate.template);
    }
  }, [templateId, templates]);

  return (
    <Modal className="p-5" active={active} setActive={setActive}>
        <h2 className="text-center text-xl font-bold mb-2">
          {templateId ? 'Редактировать шаблон' : 'Добавить шаблон'}
        </h2>
        <ChangeLanguageBtns className="my-2" language={modalLanguage} onLangChange={setModalLanguage}/>
        <input
          className="bg-gray-200 rounded-md px-2 py-1"
          type="text" 
          placeholder={nameT[modalLanguage]} 
          value={autoSMSTemplateName[modalLanguage]} 
          onChange={(e) => setAutoSMSTemplateName({ ...autoSMSTemplateName, [modalLanguage]: e.target.value})}
        />
        <textarea 
          className="bg-gray-200 rounded-md px-2 py-1 my-2"
          value={autoSMSTemplate[modalLanguage]}
          onChange={e => setAutoSMSTemplate({...autoSMSTemplate, [modalLanguage]: e.target.value})}
          placeholder="Шаблон"
          style={{listStyle: 'revert', height: '150px'}}
        />
        <button onClick={() => void saveAutoSMSTemplateHandler()} className="bg-sky-500 block w-full text-white font-medium py-1 rounded-md">Сохранить</button>
      </Modal>
  );
}

export default AutoSMSTemplateModal;