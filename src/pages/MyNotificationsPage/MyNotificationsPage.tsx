import { FC, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import Common from "./Common";
import Private from "./Private";
import Users from "./Users";
import Chats from "./Chats";
import Groups from "./Groups";
import Homework from "./Homework";

enum Components {
  common = 'common',
  groups = 'groups',
  chats = 'chats',
  users = 'users',
  private = 'private',
  homework = 'homework',
}

const componentsTranslations: {[key in Components]: { ru: string, en: string, am: string}} = {
  [Components.common]: {
      ru: 'Уведомления/напоминания от школы (общие)',
      am: 'Դպրոցից հաղորդագրություններ/հիշեցումներ (Ընդհանուր)',
      en: 'Notifications/reminders from the school (general)'
  },
  [Components.groups]: {
      ru: 'Уведомления/напоминания от школы (Для групп)',
      am: 'Դպրոցից հաղորդագրություններ/հիշեցումներ (Խմբերի համար)',
      en: 'Notifications/reminders from the school (For groups)'
  },
  [Components.chats]: {
      ru: 'Уведомления/напоминания от школы (Для чатов)',
      am: 'Դպրոցից հաղորդագրություններ/հիշեցումներ (Խմբերի համար)',
      en: 'Notifications/reminders from the school (For groups)'
  },
  [Components.homework]: {
      ru: 'Уведомления/напоминания от школы (Домашнее задание)',
      am: 'Դպրոցից հաղորդագրություններ/հիշեցումներ (Տնային առաջադրանք)',
      en: 'Notifications/reminders from the school (Homework)'
  },
  [Components.users]: {
      ru: 'Уведомления/напоминания пользователей',
      am: 'Օգտատերերի հաղորդագրություններ/հիշեցումներ',
      en: 'User notifications/reminders'
  },
  [Components.private]: {
      ru: 'Мои уведомления/напоминания',
      am: 'Իմ հաղորդագրությունները/հիշեցումները',
      en: 'My notifications/reminders'
  },
};

const MyNotificationsPage:FC = () => {
  const { language } = useAppSelector((state) => state.TranslateSlice);

  const [activeComponent, setActiveComponent] = useState<Components>(Components.common);
    const renderComponent = () => {
        switch (activeComponent) {
            case Components.common:
                return <Common />;
            case Components.private:
                return <Private />;
            case Components.users:
                return <Users />;
            case Components.chats:
                return <Chats />;
            case Components.groups:
                return <Groups />;
            case Components.homework:
                return <Homework />;
            default:
                return null;
        }
    };
  return (
    <div className="w-full p-5 flex flex-col gap-5">
        <div className="flex justify-center space-x-4 mb-5 space-y-2 flex-wrap">
            {Object.entries(Components).map(([value]) => (
                <button
                    key={value}
                    className={`px-4 py-2 rounded ${activeComponent === value ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveComponent(value as Components)}
                >
                    {componentsTranslations[value as Components][language]}
                </button>
            ))}
        </div>
        {renderComponent()}
    </div>
  );
}

export default MyNotificationsPage;