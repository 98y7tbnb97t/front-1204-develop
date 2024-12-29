import { FC } from "react";
import Modal from "../UI/Modal";
import { ITranslateItemString, translations } from "../../utils/translations";
import { useAppSelector } from "../../hooks/redux";
import Button from "../UI/Button";

interface PermissionsTableFieldsSettingsModalProps {
  active: boolean;
  setActive: (active: boolean) => void;
	fieldsSettings: {
		[key in PermTableFieldType]: boolean;
	},
	setFieldsSettings: (fieldsSettings: {
		[key in PermTableFieldType]: boolean
	}) => void;
}

export type PermTableFieldType = 
	'avatar' | 
	'requests' | 
	'name' | 
	'groups' | 
	'lastOnline' | 
	'lastInLesson' | 
	'levels' | 
	'removedFromGroupBy' | 
	'debtorHistory';

const fieldsList: PermTableFieldType[] = [
    'avatar',
    'name',
		'requests',
    'groups',
    'lastOnline',
    'lastInLesson',
    'removedFromGroupBy',
    'debtorHistory',
		'levels',
];

const fieldsTranslations: {
    [key in PermTableFieldType]: ITranslateItemString;
} = {
    avatar: {
        ru: 'Аватар',
        am: 'Ավատար',
        en: 'Avatar',
    },
    name: {
        ru: 'Имя',
        am: 'Անուն',
        en: 'Name',
    },
    groups: {
        ru: 'Группы',
        am: 'Խմբեր',
        en: 'Groups',
    },
    lastOnline: {
        ru: 'Последний раз онлайн',
        am: 'Վերջին անգամ օնլայն',
        en: 'Last online',
    },
    lastInLesson: {
        ru: 'Последний раз на уроке',
        am: 'Վերջին անգամ դասին',
        en: 'Last in lesson',
    },
    debtorHistory: {
        ru: 'История должника',
        am: 'Պարտապանի պատմություն',
        en: 'Debtor history',
    },
    requests: {
        ru: 'Запросы на изменение',
        am: 'Փոփոխության հարցումներ',
        en: 'Change requests',
    },
    levels: {
        ru: 'Уровни',
        am: 'Մակարդակներ',
        en: 'Levels',
    },
    removedFromGroupBy: {
        ru: 'Кем удален из группы',
        am: 'Ում կողմից հեռացվել է խմբից',
        en: 'Removed from the group by',
    },

};

const PermissionsTableFieldsSettingsModal:FC<PermissionsTableFieldsSettingsModalProps> = ({ 
	active,
	setActive,
	fieldsSettings,
	setFieldsSettings
}) => {
  const language = useAppSelector(state => state.TranslateSlice.language);

	const { saveText, fieldsSettingsText } = translations.access;

	const changeHandler = (field: PermTableFieldType, checked: boolean) => {
		setFieldsSettings({...fieldsSettings, [field]: checked });
	}

	const saveHandler = () => {
		setActive(false);
		localStorage.setItem('permTableFieldsSettings', JSON.stringify(fieldsSettings));
	}

  return (
    <Modal
        className='p-5 !bg-white'
        active={active}
        setActive={setActive}
      >
        <h3 className='text-xl font-medium'>{fieldsSettingsText[language]}</h3>
        <div className="flex flex-col gap-1 mt-4">
            {fieldsList.map(f => (
                <label key={f} className="flex gap-2">
                    <input
											type='checkbox'
											name={f}
											onChange={(e => changeHandler(f, e.target.checked))}
											checked={fieldsSettings[f]}
										/>
                    {fieldsTranslations[f][language]}
                </label>
            ))}
        </div>
				<Button onClick={saveHandler} className="mt-2">{saveText[language]}</Button>
      </Modal>
  );
}

export default PermissionsTableFieldsSettingsModal;