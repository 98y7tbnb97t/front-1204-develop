import {FC, useEffect, useState} from "react";
import {IRequisite, DisclosureData} from "../../../models/IRequisite.ts";
import Modal from "../../UI/Modal.tsx";
import {translations} from "../../../utils/translations.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {useFormValue} from "../../../hooks/useFormValue.ts";
import Input from "../../UI/Main/Input.tsx";
import {createSelectOptionsFromObj} from "../../../utils/createSelectOptionsFromObj.ts";
import {userCountries} from "../../../constants.ts";
import Select from "../../UI/Main/Select.tsx";
import {ISelect} from "../../../models/ISelect.ts";
import {createRequisite, editRequisite} from "../../../store/reducers/BalansSlice.ts";
import Button from "../../UI/Button.tsx";
import ChangeLanguageBtns from "../../UI/ChangeLanguageBtns.tsx";
import { Elanguages } from "../../../store/reducers/TranslateSlice.ts";
import DisclosureInputs from "./DisclosuresInputs.tsx";
import { ECountries } from "../../../models/ECountries.ts";

interface AddEditBalanceModalProps {
    opened: boolean,
    onClose: (val: boolean) => void,
    editData: IRequisite | null
}

export const enum EFormFields {
    bic = "bic",
    card = "card",
    ownerEn = "ownerEn",
    ownerRu = "ownerRu",
    cardType = "cardType",
    countries = "countries",
    expireDate = "expireDate",
    accountNumber = "accountNumber",
    linkTitleRU = "linkTitleRU",
    linkTitleEN = "linkTitleEN",
    linkTitleAM = "linkTitleAM",
    link = "link",
    transferByCardTextRU = "transferByCardTextRU",
    transferByCardTextEN = "transferByCardTextEN",
    transferByCardTextAM = "transferByCardTextAM",
    disclosuresData = "disclosuresData"
}

export interface FormProps {
    [EFormFields.bic]: string,
    [EFormFields.accountNumber]: string,
    [EFormFields.card]: string,
    [EFormFields.ownerEn]: string,
    [EFormFields.ownerRu]: string,
    [EFormFields.cardType]: string,
    [EFormFields.expireDate]: string,
    [EFormFields.countries]: ISelect[],
    [EFormFields.linkTitleRU]: string,
    [EFormFields.linkTitleAM]: string,
    [EFormFields.linkTitleEN]: string,
    [EFormFields.link]: string,
    [EFormFields.transferByCardTextRU]: string,
    [EFormFields.transferByCardTextEN]: string,
    [EFormFields.transferByCardTextAM]: string,
    [EFormFields.disclosuresData]: DisclosureData[]
}

const {
    editRequisiteText,
    addRequisiteText,
    cardOwnerEnText,
    cardOwnerRuText,
    cardNumberText,
    bicText,
    accountNumberText,
    cardTypeText,
    validThruText,
    linkTitleText,
    allLangsMustFilledText,
    linkText,
    linkMustFilledText,
    transferByCardText,
    allDisclosuresMustFilledText
} = translations.requisites

const {
    countryText,
    saveText,
    fieldMustFilledText,
} = translations.profile

const initialDisclosuresData = [{
    id: Date.now().toString(),
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
}];

const initialData: FormProps = {
    [EFormFields.bic]: "",
    [EFormFields.accountNumber]: "",
    [EFormFields.card]: "",
    [EFormFields.ownerEn]: "",
    [EFormFields.ownerRu]: "",
    [EFormFields.cardType]: "",
    [EFormFields.expireDate]: "",
    [EFormFields.countries]: [],
    [EFormFields.linkTitleRU]: "",
    [EFormFields.linkTitleAM]: "",
    [EFormFields.linkTitleEN]: "",
    [EFormFields.link]: "",
    [EFormFields.transferByCardTextRU]: "",
    [EFormFields.transferByCardTextEN]: "",
    [EFormFields.transferByCardTextAM]: "",
    [EFormFields.disclosuresData]: initialDisclosuresData
}

const AddEditBalanceModal: FC<AddEditBalanceModalProps> = ({opened, onClose, editData}) => {
    const dispatch = useAppDispatch()
    const language = useAppSelector(state => state.TranslateSlice.language)
    const countryOptions = createSelectOptionsFromObj(userCountries, language)
    const [linkTitleVisible, setLinkTitleVisible] = useState<Elanguages>(Elanguages.RU); 
    const [transferTextVisible, setTransferTextVisible] = useState<Elanguages>(Elanguages.RU);
    const [disclosuresError, setDisclosuresError] = useState<string>();

    const {
        formData,
        onChange,
        setValue,
        handleSubmit,
        error,
        setFieldError,
        clearInputError,
        setFormData
    } = useFormValue(initialData, [
        EFormFields.bic,
        EFormFields.accountNumber,
        EFormFields.expireDate,
        EFormFields.linkTitleAM,
        EFormFields.linkTitleEN,
        EFormFields.linkTitleRU,
        EFormFields.ownerRu,
        EFormFields.link,
        EFormFields.transferByCardTextRU,
        EFormFields.transferByCardTextAM,
        EFormFields.transferByCardTextEN,
        EFormFields.disclosuresData
    ])


    useEffect(() => {
        if(editData) {
            setFormData({
                [EFormFields.bic]: editData?.bic || "",
                [EFormFields.accountNumber]: editData?.accountNumber || "",
                [EFormFields.card]: editData?.card || "",
                [EFormFields.ownerEn]: editData?.ownerEn || "",
                [EFormFields.ownerRu]: editData?.ownerRu || "",
                [EFormFields.cardType]: editData?.cardType || "",
                [EFormFields.expireDate]: editData?.expireDate || "",
                [EFormFields.countries]: countryOptions.filter(item => editData?.countries.includes(item.slug as ECountries)),
                [EFormFields.linkTitleRU]: editData?.linkTitle?.ru || "",
                [EFormFields.linkTitleAM]: editData?.linkTitle?.am || "",
                [EFormFields.linkTitleEN]: editData?.linkTitle?.en || "",
                [EFormFields.link]: editData?.link || "",
                [EFormFields.transferByCardTextRU]: editData?.transferByCardText?.ru || "",
                [EFormFields.transferByCardTextEN]: editData?.transferByCardText?.en || "",
                [EFormFields.transferByCardTextAM]: editData?.transferByCardText?.am || "",
                [EFormFields.disclosuresData]: editData?.disclosuresData || initialDisclosuresData
            })
        }
    }, [editData]);
    const onSelectChange = (val: ISelect) => {
        clearInputError(EFormFields.countries)

        if(error[EFormFields.accountNumber]) clearInputError(EFormFields.accountNumber)
        else if(error[EFormFields.bic]) clearInputError(EFormFields.bic)
        setValue(EFormFields.countries, val);
    }

    const onSubmit = async (data: FormProps) => {
        if (!data[EFormFields.bic] && !data[EFormFields.accountNumber]) {
            const errKey =
                data[EFormFields.countries] && data[EFormFields.countries].find(item => item.slug === ECountries.ARMENIA)
                    ? EFormFields.accountNumber
                    : EFormFields.bic
            setFieldError(errKey, fieldMustFilledText)

            return;
        }

        if (
            (data[EFormFields.linkTitleAM] || data[EFormFields.linkTitleRU] || data[EFormFields.linkTitleEN]) &&
            (!data[EFormFields.linkTitleAM] || !data[EFormFields.linkTitleRU] || !data[EFormFields.linkTitleEN])
        ) {
            switch(linkTitleVisible) {
                case Elanguages.RU: 
                    setFieldError(EFormFields.linkTitleRU, allLangsMustFilledText);
                    break;
                case 
                    Elanguages.AM: 
                    setFieldError(EFormFields.linkTitleAM, allLangsMustFilledText);
                    break;
                case Elanguages.EN: setFieldError(EFormFields.linkTitleEN, allLangsMustFilledText);
            }
            return;
        }

        if ((data[EFormFields.linkTitleAM] && data[EFormFields.linkTitleRU] && data[EFormFields.linkTitleEN]) && !data[EFormFields.link]) {
            setFieldError(EFormFields.link, linkMustFilledText);
            return;
        }
        
        if (data[EFormFields.disclosuresData].length) {
            if (
                data[EFormFields.disclosuresData]
                .some(data => !data.body.am || !data.body.ru || !data.body.en || !data.title.am || !data.title.en || !data.title.ru)
            ) {
                setDisclosuresError(allDisclosuresMustFilledText[language]);
                return;
            }
        }
        setDisclosuresError(undefined);

        if (
            (data[EFormFields.transferByCardTextAM] || data[EFormFields.transferByCardTextRU] || data[EFormFields.transferByCardTextEN]) &&
            (!data[EFormFields.transferByCardTextAM] || !data[EFormFields.transferByCardTextRU] || !data[EFormFields.transferByCardTextEN])
        ) {
            switch(transferTextVisible) {
                case Elanguages.RU: 
                    setFieldError(EFormFields.transferByCardTextRU, allLangsMustFilledText);
                    break;
                case 
                    Elanguages.AM: 
                    setFieldError(EFormFields.transferByCardTextAM, allLangsMustFilledText);
                    break;
                case Elanguages.EN: setFieldError(EFormFields.transferByCardTextEN, allLangsMustFilledText);
            }
            return;
        }

        const payload = {
            ...data,
            countries: data[EFormFields.countries]?.map(item => item.slug) as ECountries[] || [] as ECountries[]
        }
        try {
            if(!editData) {
                await dispatch(createRequisite(payload))
            } else {
                await dispatch(editRequisite({payload,id: editData._id}))
            }
            onClose(false)
        } catch (e) {
            console.error(e)
        }
    }

    const onLinkTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearInputError(EFormFields.linkTitleAM);
        clearInputError(EFormFields.linkTitleEN);
        clearInputError(EFormFields.linkTitleRU);
        onChange(e);
    }

    const onLangChange = (lang: Elanguages) => {
        clearInputError(EFormFields.linkTitleAM);
        clearInputError(EFormFields.linkTitleEN);
        clearInputError(EFormFields.linkTitleRU);
        setLinkTitleVisible(lang);
    }

    const onTransferChange = (lang: Elanguages) => {
        clearInputError(EFormFields.transferByCardTextRU);
        clearInputError(EFormFields.transferByCardTextEN);
        clearInputError(EFormFields.transferByCardTextAM);
        setTransferTextVisible(lang);
    }

    return (
        <Modal setActive={onClose} active={opened} className={'max-w-[800px]'}>
            <h2 className={'text-[24px] font-bold mb-3 dark:text-white text-center'}>
                {(editData ? editRequisiteText : addRequisiteText)[language]}
            </h2>

            <form className={'flex flex-col gap-6'} onSubmit={(e) => {
                handleSubmit(e, onSubmit)
                }}>
                <Input
                    onChange={onChange}
                    placeholder={cardOwnerRuText[language]}
                    error={error[EFormFields.ownerRu]?.[language]}
                    value={formData[EFormFields.ownerRu]}
                    name={EFormFields.ownerRu}
                />
                <Input
                    onChange={onChange}
                    placeholder={cardOwnerEnText[language]}
                    error={error[EFormFields.ownerEn]?.[language]}
                    value={formData[EFormFields.ownerEn]}
                    name={EFormFields.ownerEn}
                />
                <Input
                    onChange={onChange}
                    placeholder={cardNumberText[language]}
                    maxLength={19} // SPACES BETWEEN NUMBERS
                    minLength={19}
                    error={error[EFormFields.card]?.[language]}
                    value={formData[EFormFields.card]}
                    name={EFormFields.card}
                />
                <Input
                    onChange={onChange}
                    placeholder={bicText[language]}
                    error={error[EFormFields.bic]?.[language]}
                    value={formData[EFormFields.bic]}
                    name={EFormFields.bic}
                />
                <Input
                    onChange={onChange}
                    placeholder={accountNumberText[language]}
                    error={error[EFormFields.accountNumber]?.[language]}
                    value={formData[EFormFields.accountNumber]}
                    name={EFormFields.accountNumber}
                />
                <Input
                    onChange={onChange}
                    placeholder={validThruText[language]}
                    error={error[EFormFields.expireDate]?.[language]}
                    value={formData[EFormFields.expireDate]}
                    name={EFormFields.expireDate}
                />
                <Input
                    onChange={onChange}
                    placeholder={cardTypeText[language]}
                    error={error[EFormFields.cardType]?.[language]}
                    value={formData[EFormFields.cardType]}
                    name={EFormFields.cardType}
                />
                <Input
                    onChange={onLinkTitleChange}
                    placeholder={`${linkTitleText[language]} (${Elanguages.RU})`}
                    error={error[EFormFields.linkTitleRU]?.[language]}
                    value={formData[EFormFields.linkTitleRU]}
                    name={EFormFields.linkTitleRU}
                    wrapperClass={linkTitleVisible !== Elanguages.RU && 'hidden'}
                />
                <Input
                    onChange={onLinkTitleChange}
                    placeholder={`${linkTitleText[language]} (${Elanguages.AM})`}
                    error={error[EFormFields.linkTitleAM]?.[language]}
                    value={formData[EFormFields.linkTitleAM]}
                    name={EFormFields.linkTitleAM}
                    wrapperClass={linkTitleVisible !== Elanguages.AM && 'hidden'}
                />
                <Input
                    onChange={onLinkTitleChange}
                    placeholder={`${linkTitleText[language]} (${Elanguages.EN})`}
                    error={error[EFormFields.linkTitleEN]?.[language]}
                    value={formData[EFormFields.linkTitleEN]}
                    name={EFormFields.linkTitleEN}
                    wrapperClass={linkTitleVisible !== Elanguages.EN && 'hidden'}
                />
                <ChangeLanguageBtns onLangChange={onLangChange} language={linkTitleVisible}/>
                <Input
                    onChange={onChange}
                    placeholder={`${linkText[language]}`}
                    error={error[EFormFields.link]?.[language]}
                    value={formData[EFormFields.link]}
                    name={EFormFields.link}
                />
                <Input
                    onChange={onChange}
                    placeholder={`${transferByCardText[language]} (${Elanguages.RU})`}
                    error={error[EFormFields.transferByCardTextRU]?.[language]}
                    value={formData[EFormFields.transferByCardTextRU]}
                    name={EFormFields.transferByCardTextRU}
                    wrapperClass={transferTextVisible !== Elanguages.RU && 'hidden'}
                />
                <Input
                    onChange={onChange}
                    placeholder={`${transferByCardText[language]} (${Elanguages.AM})`}
                    error={error[EFormFields.transferByCardTextAM]?.[language]}
                    value={formData[EFormFields.transferByCardTextAM]}
                    name={EFormFields.transferByCardTextAM}
                    wrapperClass={transferTextVisible !== Elanguages.AM && 'hidden'}
                />
                <Input
                    onChange={onChange}
                    placeholder={`${transferByCardText[language]} (${Elanguages.EN})`}
                    error={error[EFormFields.transferByCardTextEN]?.[language]}
                    value={formData[EFormFields.transferByCardTextEN]}
                    name={EFormFields.transferByCardTextEN}
                    wrapperClass={transferTextVisible !== Elanguages.EN && 'hidden'}
                />
                <ChangeLanguageBtns onLangChange={onTransferChange} language={transferTextVisible}/>
                <DisclosureInputs formData={formData} setFormData={setFormData} error={disclosuresError}/>
                <Select
                    multiple={true}
                    error={error[EFormFields.countries]?.[language]}
                    className='select'
                    wrapperClass='w-full'
                    name={`${countryText[language]}:`}
                    options={countryOptions}
                    value={formData[EFormFields.countries]}
                    onChange={onSelectChange}/>
                <Button>{saveText[language]}</Button>
            </form>
        </Modal>
    );
}

export default AddEditBalanceModal;