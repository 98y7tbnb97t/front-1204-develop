import { FC, useEffect, useState } from "react";
import { FormProps, EFormFields } from "./AddEditBalanceModal";
import Input from "../../UI/Main/Input";
import { Elanguages } from "../../../store/reducers/TranslateSlice";
import { DisclosureData } from "../../../models/IRequisite";
import ChangeLanguageBtns from "../../UI/ChangeLanguageBtns";
import Button from "../../UI/Button";
import { translations } from "../../../utils/translations";
import { useAppSelector } from "../../../hooks/redux";

interface DisclosureInputsProps {
    formData: FormProps,
    setFormData: React.Dispatch<React.SetStateAction<FormProps>>,
    error?: string;
}

type DisclosuresLangState = {
    id: string;
    lang: Elanguages,
}

const {
    text,
    subtext,
    disclosureElementsText,
    addDisclosureElementText
} = translations.requisites

const DisclosureInputs: FC<DisclosureInputsProps> = ({ formData, setFormData, error }) => {
    const language = useAppSelector((state) => state.TranslateSlice.language);

    const [disclosuresLang, setDisclosuresLang] = useState<DisclosuresLangState[]>([]);

    useEffect(() => {
        setDisclosuresLang(prev => formData[EFormFields.disclosuresData].map(({id}) => ({
            id,
            lang: prev.find(({id: langId}) => langId === id)?.lang || Elanguages.RU
        })));
    }, [formData[EFormFields.disclosuresData], setDisclosuresLang])

    const addInputsHandler = () => {
        const id = Date.now().toString();
        setFormData({
            ...formData,
            [EFormFields.disclosuresData]: [...formData[EFormFields.disclosuresData], {
                id,
                title: {
                    ru: '',
                    am: '',
                    en: ''
                },
                body: {
                    ru: '',
                    am: '',
                    en: ''
                },
            }]
        });
    }


    const deleteInputsHandler = (id: string) => {
        setFormData({
            ...formData,
            [EFormFields.disclosuresData]: formData[EFormFields.disclosuresData].filter(({ id: dataId }) => dataId !== id)
        });
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, id: string, key: 'title' | 'body', lang: Elanguages) => {
        setFormData({ 
            ...formData,
            [EFormFields.disclosuresData]: formData[EFormFields.disclosuresData].map(data => {
                if (data.id === id) {
                    return {
                        ...data,
                        [key]: {
                            ...data[key],
                            [lang]: e.target.value
                        },
                    }
                } else return data;
            })
        })
    }

    const onLangChange = (lang: Elanguages, id: string ) => {
        setDisclosuresLang(disclosuresLang.map(data => data.id === id ? { ...data, lang } : data))
    }
    const renderDisclosureInputs = ({ id, title, body }: DisclosureData) => {
        const lang = disclosuresLang.find(({ id: langId }) => langId === id)?.lang || Elanguages.RU;

        return (
            <div key={id}>
                <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, id, 'title', Elanguages.EN)}
                    placeholder={`${text[language]} (${Elanguages.EN})`}
                    value={title.en}
                    className='mb-2'
                    wrapperClass={lang !== Elanguages.EN && 'hidden'}
                />
                <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, id, 'title', Elanguages.RU)}
                    placeholder={`${text[language]} (${Elanguages.RU})`}
                    value={title.ru}
                    className='mb-2'
                    wrapperClass={lang !== Elanguages.RU && 'hidden'}
                />
                <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, id, 'title', Elanguages.AM)}
                    placeholder={`${text[language]} (${Elanguages.AM})`}
                    value={title.am}
                    className='mb-2'
                    wrapperClass={lang !== Elanguages.AM && 'hidden'}
                />
                <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, id, 'body', Elanguages.EN)}
                    placeholder={`${subtext[language]} (${Elanguages.EN})`}
                    value={body.en}
                    className='mb-2'
                    wrapperClass={lang !== Elanguages.EN && 'hidden'}
                />
                <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, id, 'body', Elanguages.RU)}
                    placeholder={`${subtext[language]} (${Elanguages.RU})`}
                    value={body.ru}
                    className='mb-2'
                    wrapperClass={lang !== Elanguages.RU && 'hidden'}
                />
                <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, id, 'body', Elanguages.AM)}
                    placeholder={`${subtext[language]} (${Elanguages.AM})`}
                    value={body.am}
                    className='mb-2'
                    wrapperClass={lang !== Elanguages.AM && 'hidden'}
                />
                <div className="flex gap-4 items-center">
                    <ChangeLanguageBtns className="shrink-0" onLangChange={(lang => onLangChange(lang, id))} language={lang}/>
                    <button type="button" onClick={() => deleteInputsHandler(id)} className="bg-transparent !text-rose-500 font-bold">Удалить</button>
                </div>
                
            </div>
        );
    }

    return (
        <>
            <h4 className="text-xl">{disclosureElementsText[language]}</h4>
            {formData[EFormFields.disclosuresData].map(renderDisclosureInputs)}
            <div className="mb-4">
                <Button type='button' onClick={addInputsHandler}>{addDisclosureElementText[language]}</Button>
                {!!error  && <p className="text-red-600 font-medium whitespace-nowrap text-sm mt-1">{error}</p>}
            </div>
        </>
    )
}

export default DisclosureInputs;