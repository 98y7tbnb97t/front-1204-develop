import { FC, useEffect, useState } from "react";
import Modal from "../UI/Modal";
import ChangeLanguageBtns from "../UI/ChangeLanguageBtns";
import { Elanguages } from "../../store/reducers/TranslateSlice";
import { ITranslateItemString, translations } from "../../utils/translations";
import toSlug from "../../utils/toSlug";
import { ISubject } from "../../models/ISubject";
import SubjectService from "../../services/SubjectService";

interface SubjectModalProps {
  active: boolean;
  setActive: (active: boolean) => void;
  setSubjects: React.Dispatch<React.SetStateAction<ISubject[]>>;
  subjects?: ISubject[];
  subjectId?: string;
}

const SubjectModal:FC<SubjectModalProps> = ({ active, setActive, setSubjects, subjects, subjectId }) => {
  const [modalLanguage, setModalLanguage] = useState<Elanguages>(Elanguages.RU);
  const { nameT } = translations.autoSMS;
  const [subjectName, setSubjectName] = useState<ITranslateItemString>({
    ru: '',
    en: '',
    am: ''
  });

  const saveSubjectHandler = async () => {
    const slug = toSlug(subjectName.en);
    if (subjectId) {
      const res = await SubjectService.editSubject({ _id: subjectId, name: subjectName, slug });
      setSubjects(prev => prev.map(s => s._id === subjectId ? res.data : s));
    } else {
      const res = await SubjectService.createSubject({ name: subjectName, slug });
      setSubjects(prev => ([...prev, res.data]));
    }
    setActive(false);
    setSubjectName({
      ru: '',
      en: '',
      am: ''
    });
  }

  useEffect(() => {
    const curSubject = subjects?.find(t => t._id === subjectId);
    if (curSubject) {
      setSubjectName(curSubject.name);
    }
  }, [subjectId, subjects]);

  return (
    <Modal active={active} setActive={setActive}>
        <h2 className="text-center text-xl font-bold mb-2">
          {subjectId ? 'Редактировать' : 'Добавить предмет'}
        </h2>
        <ChangeLanguageBtns className="mt-2" language={modalLanguage} onLangChange={setModalLanguage}/>
        <input
          className="bg-gray-200 rounded-md px-2 py-1 my-2"
          type="text" 
          placeholder={nameT[modalLanguage]} 
          value={subjectName[modalLanguage]} 
          onChange={(e) => setSubjectName({ ...subjectName, [modalLanguage]: e.target.value})}
        />
        <button onClick={() => void saveSubjectHandler()} className="bg-sky-500 block w-full text-white font-medium py-1 rounded-md">Сохранить</button>
      </Modal>
  );
}

export default SubjectModal;