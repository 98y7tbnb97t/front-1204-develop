import { FC } from "react";
import Modal from "../UI/Modal";
import { ITranslateItemString, translations } from "../../utils/translations";
import { useAppSelector } from "../../hooks/redux";
import Button from "../UI/Button";

interface PermissionsTableFieldsSettingsModalProps {
  active: boolean;
  setActive: (active: boolean) => void;
  sort: IPermissionsTableSort | null,
  setSort: (fieldsSettings: IPermissionsTableSort) => void;
}

export type PermTableFieldType = 
	'lastOnline' | 
	'lastTimeInLesson';

const fieldsList: PermTableFieldType[] = [
    'lastOnline',
    'lastTimeInLesson',
];

export interface IPermissionsTableSort {
    field: PermTableFieldType;
    order: 'asc' | 'desc';
}

const orderTranslations: {
    [key in 'asc' | 'desc']: ITranslateItemString;
} = {
    asc: {
        ru: 'По возрастанию',
        am: 'Հակառավանում',
        en: 'Ascending',
    },
    desc: {
        ru: 'По убыванию',
        am: 'Հակառավանում',
        en: 'Descending',
    },
}

const fieldsTranslations: {
    [key in PermTableFieldType]: ITranslateItemString;
} = {
    lastOnline: {
        ru: 'Последний раз онлайн',
        am: 'Վերջին անգամ օնլայն',
        en: 'Last online',
    },
    lastTimeInLesson: {
        ru: 'Последний раз на уроке',
        am: 'Վերջին անգամ դասին',
        en: 'Last in lesson',
    },
};

const PermissionsSortModal:FC<PermissionsTableFieldsSettingsModalProps> = ({ 
	active,
	setActive,
	sort,
	setSort
}) => {
  const language = useAppSelector(state => state.TranslateSlice.language);

	const { saveText, sortText } = translations.access;

	const changeFieldHandler = (field: PermTableFieldType) => {
		if (sort) {
			setSort({ ...sort, field: field });
		} else {
			setSort({ field, order: 'asc' });
		}
	}

    const changeOrderHandler = (order: 'asc' | 'desc') => {
			if (sort) {
        setSort({ ...sort, order });
			}
    }

	const saveHandler = () => {
		setActive(false);
	}

  return (
    <Modal
        className='p-5 !bg-white'
        active={active}
        setActive={setActive}
      >
        <h3 className='text-xl font-medium'>{sortText[language]}</h3>
        <div className="flex flex-col gap-1 mt-4">
            {fieldsList.map(f => (
                <div className="flex gap-2">
                    <label key={f} className="flex gap-2">
                        <input
                                                type='checkbox'
                                                name={f}
                                                onChange={(() => changeFieldHandler(f))}
                                                checked={sort?.field === f}
                                            />
                        {fieldsTranslations[f][language]}
											<p 
													onClick={() => sort?.field === f && changeOrderHandler(sort?.order === 'asc' ? 'desc' : 'asc')}
													className="text-sky-500 underline decoration-1 underline-offset-2 decoration-dashed cursor-pointer"
											>
													{sort?.field === f ? orderTranslations[sort.order][language] : orderTranslations['asc'][language]}
											</p>
                    </label>
                </div>
            ))}
        </div>
				<Button onClick={saveHandler} className="mt-2">{saveText[language]}</Button>
      </Modal>
  );
}

export default PermissionsSortModal;