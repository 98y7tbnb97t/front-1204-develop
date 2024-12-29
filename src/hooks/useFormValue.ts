import {FormEvent, useState} from "react";
import {ITranslateItemString, translations} from "../utils/translations.tsx";

interface ErrorData {
    [key: string]: ITranslateItemString | null;
}


const {
    fieldMustFilledText,
    invalidMailText
} = translations.profile

function validateEmail(email: string) {
    // Regular expression for validating email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const useFormValue = <T extends Record<string, any>>(initialData: T,norRequiredProps?: string[] ) => {
    const [formData, setFormData] = useState<T>(initialData);
    const [error, setError] = useState<ErrorData>({});

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        clearInputError(name);
    };

    const onChangeMail = (e:React.ChangeEvent<HTMLInputElement>) => {
        onChange(e)
        const valid = validateEmail(e.target.value)
        if(!valid) {
            setFieldError(e.target.name,invalidMailText)
        }

    }

    const clearInputError = (inputName: string) => {
        if (error[inputName]) {
            setError({
                ...error,
                [inputName]: null
            });
        }
    };

    const setFieldError = (key: string,errorTxt: ITranslateItemString) => {
        setError(prevState => ({
            ...prevState,
            [key]: errorTxt
        }))
    }

    const setValue = (key: keyof T,value: any) => {
        setFormData(prevState => ({
            ...prevState,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            [key]: value
        }))
    }

    const isInvalid = (name: string) => error && error[name];

    const onResetForm = () => {
        setFormData(initialData);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>,onSubmit: (data: T) => void |  Promise<void>) => {
        e.preventDefault()

        const errorData = error
        Object.keys(formData)?.forEach(item => {
            if(
                item in formData &&
                (!norRequiredProps || !norRequiredProps.includes(item)) &&
                (!formData[item as keyof T] ||
                (Array.isArray(formData[item as keyof T]) && !formData[item as keyof T].length))
            ) {
                errorData[item] = fieldMustFilledText
                setError(prevState => ({
                    ...prevState,
                    [item]: fieldMustFilledText
                }))
            }
        })
        if(Object.values(errorData).some(item => item)) {
            return;
        }

        onSubmit(formData)
    }

    return {
        formData,
        setValue,
        error,
        onChange,
        onChangeMail,
        onResetForm,
        clearInputError,
        isInvalid,
        setFieldError,
        setFormData,
        handleSubmit,
    };
};
