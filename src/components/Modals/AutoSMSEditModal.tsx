import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import Modal from "../UI/Modal";
import { Elanguages } from "../../store/reducers/TranslateSlice";
import ChangeLanguageBtns from "../UI/ChangeLanguageBtns";
import Button from "../UI/Button";
import { IAutoSMS, INotification, RepeatOptions, Units } from "../../models/IAutoSMS";
import { useAppDispatch } from "../../hooks/redux";
import { editAutoSMS } from "../../store/reducers/AutoSMSSlice";
import { formatDate } from "../../utils/formatDate";
import { repeatOptionsTranslations, translations, unitsTranslations } from "../../utils/translations";

interface AutoSMSEditModalProps {
  className?: string;
  active: boolean;
  setActive: (active: boolean) => void;
  autoSMS: IAutoSMS | null;
}

const AutoSMSEditModal:FC<AutoSMSEditModalProps> = ({ className, active, setActive, autoSMS }) => {
  const [text, setText] = useState<{
    [Elanguages.RU]: string;
    [Elanguages.EN]: string;
    [Elanguages.AM]: string;
  }>({
    [Elanguages.RU]: '',
    [Elanguages.EN]: '',
    [Elanguages.AM]: '',
  });
  const dispatch = useAppDispatch();
  const [language, setLanguage] = useState<Elanguages>(Elanguages.RU);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [repeatOption, setRepeatOption] = useState<RepeatOptions>(RepeatOptions.None);
  const [sendToNotifications, setSendToNotifications] = useState<boolean>(false);
  const [notificationGroups, setNotificationGroups] = useState<INotification[]>([{ amount: 30, unit: Units.MINUTES}]);
  const [title, setTitle] = useState<string>('');

  const { edit, sendReminderTo, addNotification, save, nameT } = translations.autoSMS;

  const addDynamicFieldGroup = () => {
    setNotificationGroups([...notificationGroups, { amount: 30, unit: Units.MINUTES }]);
  };

  const removeDynamicFieldGroup = (index: number) => {
    setNotificationGroups(notificationGroups.filter((_, i) => i !== index));
  };

  const updateDynamicFieldGroup = (index: number, field: keyof INotification, value: string) => {
    setNotificationGroups(notificationGroups.map((group, i) => i === index ? { ...group, [field]: value } : group));
  };

  useEffect(() => {
    if (autoSMS) {
      if (autoSMS?.date) {
        const [d, t] = autoSMS.date.split('T');
        setDate(d);
        setTime(t);
      }
      if (autoSMS.group_id) {
        setSendToNotifications(true);
      } else {
        setSendToNotifications(autoSMS.sendToNotifications);
      }
      setRepeatOption(autoSMS?.repeat || RepeatOptions.None);
      setNotificationGroups(autoSMS.notifications);
      setTitle(autoSMS.title);
      setText(autoSMS.text);
    }
  }, [autoSMS])

  const saveHandler = () => {
    let autoSMSDate;
    if (date && time) {
      autoSMSDate = date + 'T' + time;
    }
    if (autoSMS) {
      void dispatch(editAutoSMS({
        _id: autoSMS._id,
        date: autoSMSDate, 
        dialog_id: autoSMS.dialog_id,
        repeat: repeatOption,
        notifications: notificationGroups,
        text,
        sendToNotifications,
        title,
        enabled: true,
        usersToSend: autoSMS.usersToSend,
        isPersonal: autoSMS.isPersonal || false
      }));
    }
    setActive(false);
  }

  return (
    <Modal maxWidth={800} active={active} setActive={setActive} className={classNames('p-4 !bg-white', {}, [className])}>
      <h2 className="text-center text-xl font-bold mb-2">
        {edit[language]}
      </h2>
      { !autoSMS?.group_id && 
        <>
          <div className="flex gap-2">
            <label className="flex items-center gap-2 ">
              <input className="bg-gray-200 rounded-md px-2 py-1" type="date" value={date} onChange={(e) => setDate(e.target.value)} min={formatDate(new Date())} />
            </label>
            <label className="flex items-center gap-2 bg-gray-200 rounded-md">
              <input className="bg-gray-200 rounded-md px-2 py-1" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </label>
          </div>
          <div className="flex flex-col gap-4 mt-2">
            <label className="flex items-center gap-2">
              <select className="bg-gray-200 rounded-md px-2 py-2" value={repeatOption} onChange={(e) => setRepeatOption(e.target.value as RepeatOptions)}>
                {Object.entries(repeatOptionsTranslations).map(([key, value]) => (
                  <option key={key} value={key}>{value[language]}</option>
                ))}
              </select>
            </label>
          </div>
        </>
      }
      
        <div className="mt-4">
          {notificationGroups.map((group, index) => (
            <div key={index} className="flex gap-2 mb-2">
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
          ))}
          <button onClick={addDynamicFieldGroup} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {addNotification[language]}
          </button>
        </div>
        <input className="bg-gray-200 rounded-md px-2 py-1 mt-2" type="text" placeholder={nameT[language]} value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea
          className="mt-2 p-4 bg-gray-200 rounded-md"
          value={text[language]}
          onChange={(e) => setText({...text, [language]: e.target.value})}
          style={{listStyle: 'revert', minHeight: '300px'}}
          placeholder="Текст"
        />
        <ChangeLanguageBtns className="mt-2" language={language} onLangChange={setLanguage}/>
        { !autoSMS?.group_id && !autoSMS?.isPersonal && 
          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" id="sendToNotifications" checked={sendToNotifications} onChange={(e) => setSendToNotifications(e.target.checked)} />
            <label htmlFor="sendToNotifications">{sendReminderTo[language]}</label>
          </div>
        }  
    <div className="flex justify-end mt-4">
      <Button
        onClick={saveHandler}
      >
        {save[language]}
      </Button>
    </div>
    </Modal>
  );
}

export default AutoSMSEditModal;