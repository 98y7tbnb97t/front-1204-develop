import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import Modal from "../UI/Modal";
import { Elanguages } from "../../store/reducers/TranslateSlice";
import ChangeLanguageBtns from "../UI/ChangeLanguageBtns";
import Button from "../UI/Button";
import { IAutoSMS, IAutoSMSTemplate, IAutoSMSType, INotification, RepeatOptions, Units } from "../../models/IAutoSMS";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { createAutoSMS, editAutoSMS } from "../../store/reducers/AutoSMSSlice";
import { ELessonFormatTypes, User } from "../../models/User";
import { EUserLanguages } from "../../models/EUserLanguages";
import { formatDate } from "../../utils/formatDate";
import { ITranslateItemString, repeatOptionsTranslations, translations, unitsTranslations } from "../../utils/translations";
import { Listbox } from "@headlessui/react";
import AutoSMSTypesService from "../../services/AutoSMSTypesService";
import AutoSMSTemplatesService from "../../services/AutoSMSTemplatesService";
import UsersAddSearch from "../Widgets/UsersAddSearch";
import { UserRoles } from "../../utils/userRoles";
import { ISubject } from "../../models/ISubject";
import SubjectService from "../../services/SubjectService";
import { FaEdit } from '@react-icons/all-files/fa/FaEdit';
import AutoSMSTemplateModal from "./AutoSMSTemplateModal";
import SubjectModal from "./SubjectModal";
import AutoSMSTypesModal from "./AutoSMSTypesModal";
import { setHours } from "date-fns";


interface NotificationModalProps {
  className?: string;
  active: boolean;
  setActive: (active: boolean) => void;
  autoSMS: IAutoSMS | null;
}

interface ISelectOption<T> {
  id: T;
  text: ITranslateItemString;
}

const nationalities: ISelectOption<string>[] = [
  {id: EUserLanguages.RUS, text: {ru: 'Отправить всем русским', en: 'Send to all Russians', am: 'Ուղարկել բոլոր ռուսներին'}},
  {id: EUserLanguages.ARM, text: {ru: 'Отправить всем армянам', en: 'Send to all Armenians', am: 'Ուղարկել բոլոր հայերին'}},
  {id: EUserLanguages.ENG, text: {ru: 'Отправить всем англичанам', en: 'Send to all English', am: 'Ուղարկել բոլոր անգլիացիներին'}},
  {id: EUserLanguages.FRA, text: {ru: 'Отправить всем французам', en: 'Send to all French', am: 'Ուղարկել բոլոր ֆրանսիացիներին'}},
  {id: EUserLanguages.GER, text: {ru: 'Отправить всем немцам', en: 'Send to all Germans', am: 'Ուղարկել բոլոր գերմանացիներին'}},
];

const archived: ISelectOption<boolean>[] = [
  {id: true, text: {ru: 'Архивные', en: 'Archived', am: 'Արխիվային'}},
  {id: false, text: {ru: 'Активные', en: 'Active', am: 'Ակտիվ'}},
];

const roles: ISelectOption<string>[] = [
  {id: UserRoles.STUDENT, text: {ru: 'Для учеников', en: 'For students', am: 'Ուսանողների համար'}},
  {id: UserRoles.TRANER, text: {ru: 'Для тренеров', en: 'For trainers', am: 'Մարզիչների համար'}},
  {id: UserRoles.ADMIN, text: {ru: 'Для администраторов', en: 'For administrators', am: 'Ադմինիստրատորների համար'}},
  {id: UserRoles.PROGRAMMER, text: {ru: 'Для программистов', en: 'For programmers', am: 'Ծրագրավորողների համար'}},
];

const lessonFormats: ISelectOption<string>[] = [
  {id: ELessonFormatTypes.GROUP, text: {ru: 'Групповой', en: 'Group', am: 'Խմբային'}},
  {id: ELessonFormatTypes.IND, text: {ru: 'Индивидуальный', en: 'Individual', am: 'Անհատական'}},
  {id: 'forTraners', text: {ru: 'Для тренеров', en: 'For trainers', am: 'Մարզիչների համար'}},
];

const lessonPeriods: ISelectOption<string>[] = [
  {id: 'today', text: {ru: 'Сегодня', en: 'Today', am: 'Այսօր'}},
  {id: 'tomorrow', text: {ru: 'Завтра', en: 'Tomorrow', am: 'Վաղը'}},
  {id: 'afterTomorrow', text: {ru: 'Послезавтра', en: 'The day after tomorrow', am: 'Վաղը չէ մյուս օրը'}},
  {id: 'yesterday', text: {ru: 'Вчера', en: 'Yesterday', am: 'Երեկ'}},
];

const lessonStatus: ISelectOption<string>[] = [
  {id: 'scheduled', text: {ru: 'Запланирован', en: 'Scheduled', am: 'Նախատեսված է'}},
  {id: 'canceled', text: {ru: 'Отменен', en: 'Canceled', am: 'Չեղարկված է'}},
  {id: 'conducted', text: {ru: 'Проведен', en: 'Conducted', am: 'Անցկացվել է'}},
];

const lessonLanguages: ISelectOption<string>[] = [
  {id: 'rus', text: {ru: 'Русский', en: 'Russian', am: 'Ռուսերեն'}},
  {id: 'arm', text: {ru: 'Армянский', en: 'Armenian', am: 'Հայերեն'}},
  {id: 'eng', text: {ru: 'Английский', en: 'English', am: 'Անգլերեն'}},
  {id: 'fra', text: {ru: 'Французский', en: 'French', am: 'Ֆրանսերեն'}},
  {id: 'ger', text: {ru: 'Немецкий', en: 'German', am: 'Գերմաներեն'}},
];

const autoSMSTypes: ISelectOption<string>[] = [
  {id: 'fixedTime', text: {ru: 'Фиксированное время', en: 'Fixed time', am: 'Ֆիքսված ժամանակ'}},
  {id: 'beforeStart', text: {ru: 'Перед началом', en: 'Before start', am: 'Մինչև սկիզբը'}},
];

const NotificationModal:FC<NotificationModalProps> = ({ className, active, setActive, autoSMS }) => {
  const [text, setText] = useState<ITranslateItemString>({
    [Elanguages.RU]: '',
    [Elanguages.EN]: '',
    [Elanguages.AM]: '',
  });
  const dispatch = useAppDispatch();
  const [modalLanguage, setModalLanguage] = useState<Elanguages>(Elanguages.RU);
  const [date, setDate] = useState<string>(formatDate(new Date()));
  const [time, setTime] = useState<string>(`${new Date().getHours()}:${new Date().getMinutes()}`);
  const [notificationGroups, setNotificationGroups] = useState<INotification[]>([{ amount: 0, unit: Units.MINUTES}]);
  const [repeatOption, setRepeatOption] = useState<RepeatOptions>(RepeatOptions.None);
  const [title, setTitle] = useState<string>('');
  const { addText, edit, save, textT, nameT, addNotification } = translations.autoSMS;
  const [types, setTypes] = useState<IAutoSMSType[]>([]);
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [selectedArchived, setSelectedArchived] = useState<ISelectOption<boolean> | null>(null);
  const [selectedNationalities, setSelectedNationalities] = useState<ISelectOption<string>[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<ISelectOption<string>[]>([]);
  const [selectedLessonFormat, setSelectedLessonFormat] = useState<ISelectOption<string> | null>(null);
  const [selectedLessonPeriod, setSelectedLessonPeriod] = useState<ISelectOption<string>>(lessonPeriods[0]);
  const [selectedLessonStatus, setSelectedLessonStatus] = useState<ISelectOption<string> | null>(null);
  const [selectedLessonLanguage, setSelectedLessonLanguage] = useState<ISelectOption<string> | null>(null);
  const [selectedAutoSMSType, setSelectedAutoSMSType] = useState<ISelectOption<string>>(autoSMSTypes[0]);
  const [selectedSubject, setSelectedSubject] = useState<ISubject | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedType, setSelectedType] = useState<IAutoSMSType | null>(null);
  const [autoSMSTypeModal, setAutoSMSTypeModal] = useState<boolean>(false);
  const [editAutoSMSTypeModal, setEditAutoSMSTypeModal] = useState<boolean>(false);
  const [autoSMSTemplateModal, setAutoSMSTemplateModal] = useState<boolean>(false);
  const [editAutoSMSTemplateModal, setEditAutoSMSTemplateModal] = useState<boolean>(false);
  const [templates, setTemplates] = useState<IAutoSMSTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<IAutoSMSTemplate | null>(null);
  const language = useAppSelector(state => state.TranslateSlice.language);

  useEffect(() => {
    const fetchData = async () => {
      const resTypes = await AutoSMSTypesService.getAutoSMSTypes();
      const resTemplates = await AutoSMSTemplatesService.getAutoSMSTemplates();
      const res = await SubjectService.getSubjects();
      setSubjects(res.data);
      setTypes(resTypes.data);
      setTemplates(resTemplates.data);
    }
    void fetchData();
  }, []);

  useEffect(() => {
    if (autoSMS) {
      if (autoSMS.date) {
        const [date, time] = autoSMS.date.split('T');
        setDate(date);
        setTime(time);
      }
      setNotificationGroups(autoSMS.notifications);
      if (autoSMS.repeat) {
        setRepeatOption(autoSMS.repeat);
      }
      setTitle(autoSMS.title);
      setText(autoSMS.text);
      if (autoSMS.archived !== undefined) {
        const option = archived.find(a => a.id === autoSMS.archived);
        if (option) {
          setSelectedArchived(option);
        }
      }
      if (autoSMS.archived !== undefined) {
        const option = archived.find(a => a.id === autoSMS.archived);
        if (option) {
          setSelectedArchived(option);
        }
      }
      if (autoSMS.nationalities !== undefined) {
        const options = nationalities.filter(n => autoSMS.nationalities?.includes(n.id));
        if (options) {
          setSelectedNationalities(options);
        }
      }
      if (autoSMS.roles !== undefined) {
        const options = roles.filter(r => autoSMS.roles?.includes(r.id as UserRoles));
        if (options) {
          setSelectedRoles(options);
        }
      }
      if (autoSMS.format !== undefined) {
        const option = lessonFormats.find(f => f.id === autoSMS.format);
        if (option) {
          setSelectedLessonFormat(option);
        }
      }
      if (autoSMS.period !== undefined) {
        const option = lessonPeriods.find(p => p.id === autoSMS.period);
        if (option) {
          setSelectedLessonPeriod(option);
        }
      }
      if (autoSMS.status !== undefined) {
        const option = lessonStatus.find(s => s.id === autoSMS.status);
        if (option) {
          setSelectedLessonStatus(option);
        }
      }
      if (autoSMS.language !== undefined) {
        const option = lessonLanguages.find(l => l.id === autoSMS.language);
        if (option) {
          setSelectedLessonLanguage(option);
        }
      }
      if (autoSMS.autoSMSType !== undefined) {
        const option = autoSMSTypes.find(t => t.id === autoSMS.autoSMSType);
        if (option) {
          setSelectedAutoSMSType(option);
        }
      }
      if (autoSMS.subject !== undefined) {
        const subj = subjects.find(s => s._id === autoSMS.subject);
        if (subj) {
          setSelectedSubject(subj);
        }
      }
      if (autoSMS.type !== undefined) {
        const type = types.find(t => t._id === autoSMS.type);
        if (type) {
          setSelectedType(type);
        }
      }
    } else {
      setNotificationGroups([{ unit: Units.MINUTES, amount: 0 }]);
      setRepeatOption(RepeatOptions.None);
      setTitle('');
      setText({
        ru: '',
        en: '',
        am: ''
      });
      setSelectedArchived(null);
      setSelectedNationalities([]);
      setSelectedRoles([]);
      setSelectedLessonFormat(null);
      setSelectedLessonPeriod(lessonPeriods[0]);
      setSelectedLessonStatus(null);
      setSelectedLessonLanguage(null);
      setSelectedAutoSMSType(autoSMSTypes[0]);
      setSelectedSubject(null);
      setSelectedType(null);
      setUsers([]);
    }
  }, [autoSMS, subjects, types]);

  useEffect(() => {
    if (autoSMS && autoSMS.usersToSend?.length) {
      setUsers([]);
      setUsers(autoSMS.usersToSend as unknown as User[]);
    } else {
      setUsers([]);
    }
  }, [autoSMS?.usersToSend, autoSMS]);

  const saveHandler = () => {
    const autoSMSDate = date + 'T' + time;
    const autoSMSObj = {
      date: autoSMSDate,
      repeat: repeatOption,
      notifications: 
        selectedType?.slug === 'lesson-notifications' && selectedAutoSMSType.id === 'beforeStart' ?
        notificationGroups.length ? notificationGroups : [{ unit: Units.MINUTES, amount: 0 } as INotification] :
        [{ amount: 0, unit: Units.MINUTES } as INotification],
      text, 
      sendToNotifications: true,
      title,
      enabled: true,
      usersToSend: users.map(u => u._id),
      isPersonal: false,
      archived: (selectedType?.slug === 'broadcast-mailing' || selectedType?.slug === 'birthday-greeting') ?
        selectedArchived?.id || null :
        null,
      nationalities: (selectedType?.slug === 'broadcast-mailing' || selectedType?.slug === 'birthday-greeting') ?
        selectedNationalities.map(n => n.id) :
        null,
      roles: selectedType?.slug === 'birthday-greeting' ? 
        selectedRoles.map(r => r.id as UserRoles) :
        (selectedType?.slug === 'invoices-to-clients' ? [UserRoles.STUDENT] : null),
      format: selectedType?.slug === 'lesson-notifications' ?
        selectedLessonFormat?.id || null :
        null,
      period: selectedType?.slug === 'lesson-notifications' ?
        selectedLessonPeriod?.id || null :
        null,
      status: selectedType?.slug === 'lesson-notifications' ?
        selectedLessonStatus?.id || null :
        null,
      language: selectedType?.slug === 'lesson-notifications' ?
        selectedLessonLanguage?.id || null :
        null,
      subject: selectedType?.slug === 'lesson-notifications' ?
        selectedSubject?._id || null :
        null,
      type: selectedType?._id || null,
      autoSMSType: selectedAutoSMSType.id
    }
    if (autoSMS) {
      void dispatch(editAutoSMS({_id: autoSMS._id, ...autoSMSObj}));
    } else {
      void dispatch(createAutoSMS(autoSMSObj));
    }
    setActive(false);
  }

  const renderAdditionalFields = () => {
    switch (selectedType?.slug) {
      case 'broadcast-mailing':
        return (
          <Broadcast 
            selectedArchived={selectedArchived}
            setSelectedArchived={setSelectedArchived}
            onChangeUsers={setUsers}
            selectedNationalities={selectedNationalities}
            setSelectedNationalities={setSelectedNationalities}
            users={users}
          />
        )
      case 'birthday-greeting':
        return (
          <Birthday 
            selectedArchived={selectedArchived}
            setSelectedArchived={setSelectedArchived}
            selectedRoles={selectedRoles}
            setSelectedRoles={setSelectedRoles}
            onChangeUsers={setUsers}
            selectedNationalities={selectedNationalities}
            setSelectedNationalities={setSelectedNationalities}
          />
        )
      case 'lesson-notifications':
        return (
          <LessonNotification 
            selectedLessonFormat={selectedLessonFormat}
            setSelectedLessonFormat={setSelectedLessonFormat}
            selectedLessonPeriod={selectedLessonPeriod}
            setSelectedLessonPeriod={setSelectedLessonPeriod}
            selectedLessonStatus={selectedLessonStatus}
            setSelectedLessonStatus={setSelectedLessonStatus}
            selectedLessonLanguage={selectedLessonLanguage}
            setSelectedLessonLanguage={setSelectedLessonLanguage}
            selectedAutoSMSType={selectedAutoSMSType}
            setSelectedAutoSMSType={setSelectedAutoSMSType}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            subjects={subjects}
            setSubjects={setSubjects}
          />
        )
      default:
        return <></>
    }
  }

  const addDynamicFieldGroup = () => {
    setNotificationGroups([...notificationGroups, { amount: 30, unit: Units.MINUTES }]);
  };

  const removeDynamicFieldGroup = (index: number) => {
    setNotificationGroups(notificationGroups.filter((_, i) => i !== index));
  };

  const updateDynamicFieldGroup = (index: number, field: keyof INotification, value: string) => {
    setNotificationGroups(notificationGroups.map((group, i) => i === index ? { ...group, [field]: value } : group));
  };

  return (
    <>
      <Modal maxWidth={800} active={active} setActive={setActive} className={classNames('p-4 !bg-white', {}, [className])}>
        <h2 className="text-center text-xl font-bold mb-2">
          {autoSMS ? edit[language] : addText[language]}
        </h2>
        <label className="mb-1">Тип уведомления</label>
        <div className="flex gap-2">
          <Listbox
            className="mb-2 w-full text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40"
            as="div"
            value={selectedType}
            onChange={(e: IAutoSMSType | null) => {
              setSelectedType(e);
            }}
          > 
            <Listbox.Button className="p-3">
              {selectedType?.name[language] || <span>Выбрать тип</span>}
            </Listbox.Button>
            <Listbox.Options className="border-t-2 border-t-apricot">
              <Listbox.Option
                className="cursor-pointer px-3 py-2 hover:bg-apricot"
                value={null}
              ><span className="text-transparent">null</span></Listbox.Option>
              {types.map((type) => (
                <Listbox.Option
                  className="cursor-pointer px-3 py-2 hover:bg-apricot"
                  key={type._id}
                  value={type}
                >
                  {type.name[language]}
                </Listbox.Option>
              ))}
            <button onClick={() => setAutoSMSTypeModal(true)} className="bg-sky-500 block w-full text-white font-bold text-xl py-1">+</button>
            </Listbox.Options>
          </Listbox>
          <button 
            className="bg-sky-500 block text-white font-medium rounded-md shrink-0 p-4 self-start"
            onClick={() => setEditAutoSMSTypeModal(true)}
            disabled={!selectedType?._id}
          >
            <FaEdit />
          </button>
        </div>
        {renderAdditionalFields()}
        { (selectedType?.slug !== 'lesson-notifications' || selectedAutoSMSType.id === 'fixedTime') && selectedType?.slug !== 'birthday-greeting' &&
          <div className="flex gap-2 mt-2">
            <label className="flex items-center gap-2">
              <input className="bg-gray-200 rounded-md px-2 py-1" type="date" value={date} onChange={(e) => setDate(e.target.value)} min={formatDate(new Date())} />
            </label>
            <label className="flex items-center gap-2 bg-gray-200 rounded-md">
              <input className="bg-gray-200 rounded-md px-2 py-1" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </label>
          </div>
        }
        {
          selectedType?.slug === 'lesson-notifications' && selectedAutoSMSType.id === 'beforeStart' &&
          <>
            {notificationGroups.map((group, index) => (
              <div key={index} className="mb-2">
                <div className="flex gap-2 mb-2">
                  <input className="bg-gray-200 rounded-md px-2 py-1" type="number" min={0} value={group.amount} onChange={(e) => updateDynamicFieldGroup(index, 'amount', e.target.value)} />
                  <select className="bg-gray-200 rounded-md px-2 py-1" value={group.unit} onChange={(e) => updateDynamicFieldGroup(index, 'unit', e.target.value)}>
                    {Object.entries(unitsTranslations).map(([key, value]) => (
                      <option key={key} value={key}>{value[language]}</option>
                    ))}
                  </select>
                  <button onClick={() => removeDynamicFieldGroup(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  &#10006;
                  </button>
                </div>
                <button onClick={addDynamicFieldGroup} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  {addNotification[language]}
                </button>
              </div>
            ))}
          </>
        }
          {(selectedType?.slug !== 'lesson-notifications' || selectedAutoSMSType.id === 'fixedTime') && selectedType?.slug !== 'birthday-greeting' &&
            <div className="flex flex-col gap-4 mt-2">
              <label className="flex items-center gap-2">
                <select className="bg-gray-200 rounded-md px-2 py-2" value={repeatOption} onChange={(e) => setRepeatOption(e.target.value as RepeatOptions)}>
                  {Object.entries(repeatOptionsTranslations).map(([key, value]) => (
                    <option key={key} value={key}>{value[language]}</option>
                  ))}
                </select>
              </label>
            </div>
          }
          <input className="bg-gray-200 rounded-md px-2 py-1 mt-2" type="text" placeholder={nameT[language]} value={title} onChange={(e) => setTitle(e.target.value)} />
          <label className="mt-2 mb-1">Шаблон</label>
          <div className="flex gap-2">
            <Listbox
              className="text-gray-700 w-full placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40"
              as="div"
              value={selectedTemplate}
              onChange={(e: IAutoSMSTemplate | null) => {
                setSelectedTemplate(e);
                if (e) {
                  setText(e.template);
                } else {
                  setText({
                    ru: '',
                    en: '',
                    am: ''
                  });
                }
              }}
            >
              <Listbox.Button className="p-3">
                {selectedTemplate?.name[language] || <span>Выбрать шаблон</span>}
              </Listbox.Button>
              <Listbox.Options className="border-t-2 border-t-apricot">
                <Listbox.Option
                  className="cursor-pointer px-3 py-2 hover:bg-apricot"
                  value={null}
                ><span className="text-transparent">null</span></Listbox.Option>
                {templates.map((template) => (
                  <Listbox.Option
                    className="cursor-pointer px-3 py-2 hover:bg-apricot"
                    key={template._id}
                    value={template}
                  >
                    {template.name[language]}
                  </Listbox.Option>
                ))}
                <button onClick={() => setAutoSMSTemplateModal(true)} className="bg-sky-500 block w-full text-white font-bold text-xl py-1">+</button>
              </Listbox.Options>
            </Listbox>
            <button 
              className="bg-sky-500 block text-white font-medium rounded-md shrink-0 p-4 self-start"
              onClick={() => setEditAutoSMSTemplateModal(true)}
              disabled={!selectedTemplate?._id}
            >
              <FaEdit />
            </button>
          </div>
          <textarea
            className="mt-2 p-4 bg-gray-200 rounded-md"
            value={text[modalLanguage]}
            onChange={(e) => setText({...text, [modalLanguage]: e.target.value})}
            style={{listStyle: 'revert', minHeight: '300px'}}
            placeholder={textT[modalLanguage]}
          />
          <ChangeLanguageBtns className="mt-2" language={modalLanguage} onLangChange={setModalLanguage}/>
      <div className="flex justify-end mt-4">
        <Button
          onClick={saveHandler}
        >
          {save[language]}
        </Button>
      </div>
      </Modal>
      <AutoSMSTypesModal setTypes={setTypes} active={autoSMSTypeModal} setActive={setAutoSMSTypeModal} />
      <AutoSMSTypesModal
        setTypes={setTypes}
        active={editAutoSMSTypeModal}
        setActive={setEditAutoSMSTypeModal}
        types={types}
        typeId={selectedType?._id}
      />
      <AutoSMSTemplateModal
        setTemplates={setTemplates}
        active={autoSMSTemplateModal}
        setActive={setAutoSMSTemplateModal}
      />
      <AutoSMSTemplateModal
        setTemplates={setTemplates}
        active={editAutoSMSTemplateModal}
        setActive={setEditAutoSMSTemplateModal}
        templates={templates}
        templateId={selectedTemplate?._id}
      />
    </>
  );
}

interface BroadcastType {
  selectedArchived: ISelectOption<boolean> | null;
  setSelectedArchived: (archived: ISelectOption<boolean>) => void;
  onChangeUsers: (users: User[]) => void;
  selectedNationalities: ISelectOption<string>[];
  setSelectedNationalities: (nationalities: ISelectOption<string>[]) => void;
  users: User[];
}

const Broadcast: FC<BroadcastType> = ({
  selectedArchived,
  setSelectedArchived,
  selectedNationalities,
  setSelectedNationalities,
  onChangeUsers,
  users
}) => {
  const [dropdown, setDropDown] = useState<boolean>(false);
  const language = useAppSelector(state => state.TranslateSlice.language);
  return (
    <div className="flex flex-col">
      <Listbox
        as='div'
        className="my-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40"
        value={selectedArchived}
        onChange={setSelectedArchived}
      >
        <Listbox.Button className="p-3">{selectedArchived?.text[language] || 'Архивные и активные'}</Listbox.Button>
        <Listbox.Options className="border-t-2 border-t-apricot">
            <Listbox.Option value={null} className={classNames("cursor-pointer px-3 py-2 hover:bg-apricot", {
              'bg-apricot': !selectedArchived
            })}>
              Архивные и активные
            </Listbox.Option>
          {archived.map((arch) => (
            <Listbox.Option key={arch.text['en']} value={arch} className={classNames("cursor-pointer px-3 py-2 hover:bg-apricot", {
              'bg-apricot': selectedArchived?.id === arch.id
            })}>
              {arch.text[language]}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <Listbox
        as='div'
        className="my-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40"
        value={selectedNationalities}
        onChange={setSelectedNationalities}
        multiple
      >
        <Listbox.Button className="p-3">{selectedNationalities.map((nationality) => nationality.text[language]).join(', ') || 'Отправить всем национальностям'}</Listbox.Button>
        <Listbox.Options className="border-t-2 border-t-apricot">
          {nationalities.filter(n => n.id !== 'all').map((nationality) => (
            <Listbox.Option key={nationality.id} value={nationality} className={classNames("cursor-pointer px-3 py-2 hover:bg-apricot", {
              'bg-apricot': selectedNationalities.some(n => nationality.id === n.id),
            })}>
              {nationality.text[language]}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <UsersAddSearch
        dropdown={dropdown}
        setDropDown={setDropDown}
        onChangeUsers={onChangeUsers}
        chatUsers={users}
      />
    </div>
  )
}

interface BirthdayType {
  selectedArchived: ISelectOption<boolean> | null;
  setSelectedArchived: (archived: ISelectOption<boolean>) => void;
  selectedRoles: ISelectOption<string>[];
  setSelectedRoles: (roles: ISelectOption<string>[]) => void;
  onChangeUsers: (users: User[]) => void;
  selectedNationalities: ISelectOption<string>[];
  setSelectedNationalities: (nationalities: ISelectOption<string>[]) => void
}
const Birthday: FC<BirthdayType> = ({
  selectedArchived,
  setSelectedArchived,
  selectedRoles,
  setSelectedRoles,
  selectedNationalities,
  setSelectedNationalities,
  onChangeUsers,
}) => {
  const [dropdown, setDropDown] = useState<boolean>(false);
  const language = useAppSelector(state => state.TranslateSlice.language);
  return (
    <div className="flex flex-col">
      <Listbox
        as='div'
        className="my-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40"
        value={selectedArchived}
        onChange={setSelectedArchived}
      >
        <Listbox.Button className="p-3">{selectedArchived?.text[language] || 'Архивные и активные'}</Listbox.Button>
        <Listbox.Options className="border-t-2 border-t-apricot">
            <Listbox.Option value={null} className={classNames("cursor-pointer px-3 py-2 hover:bg-apricot", {
              'bg-apricot': !selectedArchived
            })}>
              Архивные и активные
            </Listbox.Option>
          {archived.map((arch) => (
            <Listbox.Option key={arch.text.en} value={arch} className={classNames("cursor-pointer px-3 py-2 hover:bg-apricot", {
              'bg-apricot': selectedArchived?.id === arch.id
            })}>
              {arch.text[language]}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <Listbox
        as='div'
        className="my-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40"
        value={selectedRoles}
        onChange={setSelectedRoles}
        multiple
      >
        <Listbox.Button className="p-3">{selectedRoles.map((arch) => arch.text[language]).join(', ') || 'Все роли'}</Listbox.Button>
        <Listbox.Options className="border-t-2 border-t-apricot">
          {roles.filter(n => n.id !== 'all').map((arch) => (
            <Listbox.Option key={arch.id} value={arch} className={classNames("cursor-pointer px-3 py-2 hover:bg-apricot", {
              'bg-apricot': selectedRoles.some(n => arch.id === n.id),
            })}>
              {arch.text[language]}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <Listbox
        as='div'
        className="my-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40"
        value={selectedNationalities}
        onChange={setSelectedNationalities}
        multiple
      >
        <Listbox.Button className="p-3">{selectedNationalities.map((nationality) => nationality.text[language]).join(', ') || 'Отправить всем национальностям'}</Listbox.Button>
        <Listbox.Options className="border-t-2 border-t-apricot">
          {nationalities.filter(n => n.id !== 'all').map((nationality) => (
            <Listbox.Option key={nationality.id} value={nationality} className={classNames("cursor-pointer px-3 py-2 hover:bg-apricot", {
              'bg-apricot': selectedNationalities.some(n => nationality.id === n.id),
            })}>
              {nationality.text[language]}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <UsersAddSearch
        dropdown={dropdown}
        setDropDown={setDropDown}
        onChangeUsers={onChangeUsers}
      />
    </div>
  )
}

interface LessonNotificationType {
  selectedLessonFormat: ISelectOption<string> | null;
  setSelectedLessonFormat: (value: ISelectOption<string>) => void;
  selectedLessonPeriod: ISelectOption<string>
  setSelectedLessonPeriod: (value: ISelectOption<string>) => void;
  selectedLessonStatus: ISelectOption<string> | null
  setSelectedLessonStatus: (value: ISelectOption<string>) => void;
  selectedLessonLanguage: ISelectOption<string> | null;
  setSelectedLessonLanguage: (value: ISelectOption<string>) => void;
  selectedAutoSMSType: ISelectOption<string>;
  setSelectedAutoSMSType: (value: ISelectOption<string>) => void;
  selectedSubject: ISubject | null;
  setSelectedSubject: (value: ISubject | null) => void;
  subjects: ISubject[];
  setSubjects: React.Dispatch<React.SetStateAction<ISubject[]>>;
}
const LessonNotification: FC<LessonNotificationType> = ({
  selectedLessonFormat,
  setSelectedLessonFormat,
  selectedLessonPeriod,
  setSelectedLessonPeriod,
  selectedLessonStatus,
  setSelectedLessonStatus,
  selectedLessonLanguage,
  setSelectedLessonLanguage,
  selectedAutoSMSType,
  setSelectedAutoSMSType,
  selectedSubject,
  setSelectedSubject,
  subjects,
  setSubjects
}) => {
  const language = useAppSelector(state => state.TranslateSlice.language);
  const [subjectsModal, setSubjectsModal] = useState<boolean>(false);
  const [editSubjectsModal, setEditSubjectsModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <label>Тип урока</label>
      <Listbox
        as='div'
        className="my-1 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40"
        value={selectedLessonFormat}
        onChange={setSelectedLessonFormat}
      >
        <Listbox.Button className="p-3">{selectedLessonFormat?.text[language] || 'Любой'}</Listbox.Button>
        <Listbox.Options className="border-t-2 border-t-apricot">
          <Listbox.Option value={null} className={classNames("cursor-pointer px-3 py-2 hover:bg-apricot", {
            'bg-apricot': !selectedLessonFormat,
          })}>
            Любой
          </Listbox.Option>
          {lessonFormats.map((t) => (
            <Listbox.Option key={t.id} value={t} className={classNames("cursor-pointer px-3 py-2 hover:bg-apricot", {
              'bg-apricot': selectedLessonFormat?.id === t.id,
            })}>
              {t.text[language]}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <label>Период уроков</label>
      <Listbox
        as='div'
        className="my-1 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40"
        value={selectedLessonPeriod}
        onChange={setSelectedLessonPeriod}
      >
        <Listbox.Button className="p-3">{selectedLessonPeriod.text[language]}</Listbox.Button>
        <Listbox.Options className="border-t-2 border-t-apricot">
          {lessonPeriods.map((t) => (
            <Listbox.Option key={t.id} value={t} className={classNames("cursor-pointer px-3 py-2 hover:bg-apricot", {
              'bg-apricot': selectedLessonPeriod.id === t.id,
            })}>
              {t.text[language]}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <label>Статус</label>
      <Listbox
        as='div'
        className="my-1 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40"
        value={selectedLessonStatus}
        onChange={setSelectedLessonStatus}
      >
        <Listbox.Button className="p-3">{selectedLessonStatus?.text[language] || 'Любой'}</Listbox.Button>
        <Listbox.Options className="border-t-2 border-t-apricot">
          <Listbox.Option value={null} className={classNames("cursor-pointer px-3 py-2 hover:bg-apricot", {
            'bg-apricot': !selectedLessonStatus,
          })}>
            Любой
          </Listbox.Option>
          {lessonStatus.map((t) => (
            <Listbox.Option key={t.id} value={t} className={classNames("cursor-pointer px-3 py-2 hover:bg-apricot", {
              'bg-apricot': selectedLessonStatus?.id === t.id,
            })}>
              {t.text[language]}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <label>Язык</label>
      <Listbox
        as='div'
        className="my-1 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40"
        value={selectedLessonLanguage}
        onChange={setSelectedLessonLanguage}
      >
        <Listbox.Button className="p-3">{selectedLessonLanguage?.text[language] || 'Любой'}</Listbox.Button>
        <Listbox.Options className="border-t-2 border-t-apricot">
          <Listbox.Option value={null} className={classNames("cursor-pointer px-3 py-2 hover:bg-apricot", {
            'bg-apricot': !selectedLessonLanguage,
          })}>
            Любой
          </Listbox.Option>
          {lessonLanguages.map((t) => (
            <Listbox.Option key={t.id} value={t} className={classNames("cursor-pointer px-3 py-2 hover:bg-apricot", {
              'bg-apricot': selectedLessonLanguage?.id === t.id,
            })}>
              {t.text[language]}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <label className="mb-1">Предмет</label>
        <div className="flex gap-1">
          <Listbox
            className="mb-2 w-full text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40"
            as="div"
            value={selectedSubject}
            onChange={(e: ISubject | null) => {
              setSelectedSubject(e);
            }}
          >
            <Listbox.Button className="p-3">
              {selectedSubject?.name[language] || <span>Выбрать предмет</span>}
            </Listbox.Button>
            <Listbox.Options className="border-t-2 border-t-apricot">
              <Listbox.Option
                className="cursor-pointer px-3 py-2 hover:bg-apricot"
                value={null}
              ><span className="text-transparent">null</span></Listbox.Option>
              {subjects.map((type) => (
                <Listbox.Option
                  className="cursor-pointer px-3 py-2 hover:bg-apricot"
                  key={type._id}
                  value={type}
                >
                  {type.name[language]}
                </Listbox.Option>
              ))}
            <button onClick={() => setSubjectsModal(true)} className="bg-sky-500 block w-full text-white font-bold text-xl py-1">+</button>
            </Listbox.Options>
          </Listbox>
          <button 
              className="bg-sky-500 block text-white font-medium rounded-md shrink-0 p-4 self-start"
              onClick={() => setEditSubjectsModal(true)}
              disabled={!selectedSubject?._id}
            >
              <FaEdit />
            </button>
        </div>
      <label>Тип рассылки</label>
      <Listbox
        as='div'
        className="my-1 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40"
        value={selectedAutoSMSType}
        onChange={setSelectedAutoSMSType}
      >
        <Listbox.Button className="p-3">{selectedAutoSMSType.text[language]}</Listbox.Button>
        <Listbox.Options className="border-t-2 border-t-apricot">
          {autoSMSTypes.map((t) => (
            <Listbox.Option key={t.id} value={t} className={classNames("cursor-pointer px-3 py-2 hover:bg-apricot", {
              'bg-apricot': selectedAutoSMSType.id === t.id,
            })}>
              {t.text[language]}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <SubjectModal active={subjectsModal} setActive={setSubjectsModal} setSubjects={setSubjects}/>
      <SubjectModal
        active={editSubjectsModal}
        setActive={setEditSubjectsModal}
        setSubjects={setSubjects}
        subjects={subjects}
        subjectId={selectedSubject?._id}
      />
    </div>
  )
}

export default NotificationModal;