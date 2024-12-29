import {ChangeEvent, FC, useEffect, useState} from 'react';
import Modal from "../UI/Modal.tsx";
import {EditRequest} from "../../models/User.ts";
import Checkbox from "../UI/Main/Checkbox/CheckBox.tsx";
import Button from "../UI/Button.tsx";
import {translations} from "../../utils/translations.tsx";
import {useAppSelector} from "../../hooks/redux.ts";
import {getValueAndFieldText} from "../../utils/getValueAndFieldText.tsx";
import {UserRoles} from "../../utils/userRoles.ts";

interface EditRequestsModalProps {
    modalOpenedId: string,
    editRequests: EditRequest[],
    onlyRejected: boolean,
    closeEditRequests: () => void
    onAcceptUserEdits: (id: string, data: { [key in string]: boolean },newRole?: UserRoles) => void
}

type TValue = {
    [key in string]: boolean
}


const {
    editRequestsText,
    selectAllText,
    acceptText,
    rejectAllText,
    rejectedRequestsText
} = translations.access
const {
    rejectedText
} = translations.editRequestResults

const EditRequestsModal: FC<EditRequestsModalProps> = ({
                                                           modalOpenedId,
                                                           closeEditRequests,
                                                           editRequests,
                                                           onAcceptUserEdits,
                                                           onlyRejected,

                                                       }) => {
    const language = useAppSelector(state => state.TranslateSlice.language)

    const mainRequests =  editRequests.filter(item => item.field !== 'requizits' )
    const rejectedRequests = mainRequests.filter(item => item.rejectedAt)
    const openRequests = mainRequests.filter(item => !item.rejectedAt && !item.acceptedAt)

    const initialValueState = openRequests.reduce((acc: TValue, cur) => {
        acc[cur.field] = false
        return acc
    }, {})
    const [values, setValues] = useState<TValue>(initialValueState)

    useEffect(() => {
        if (mainRequests?.length) {
            setValues(initialValueState)
        }
    }, [editRequests]);


    const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>, field: string) => {
        const copy: TValue = {...values}
        copy[field] = e.target.checked
        setValues(copy)
    }

    const onSubmit = (isReject?: boolean) => {
        const reqValues = isReject ? initialValueState : values
        const newRole = editRequests.find(item => item.field === 'role')?.value as UserRoles | undefined
        onAcceptUserEdits(modalOpenedId, reqValues,newRole)
        closeEditRequests()
    }


    const onSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const val = openRequests.reduce((acc: { [key in string]: boolean }, cur) => {
                acc[cur.field] = true
                return acc;
            }, {})
            setValues(val as TValue)
        } else {
            setValues(initialValueState)
        }
    }
    return (
        <Modal active={!!(modalOpenedId)} setActive={closeEditRequests} className={'max-w-[800px] w-full'}>
            <h1 className='text-2xl mb-5 font-semibold tracking-wider text-gray-800 capitalize text-center'>{(!onlyRejected ? editRequestsText : rejectedRequestsText)[language]}</h1>

            <div className='flex flex-col gap-[10px] items-center py-[20px] px-[16px]'>
                {
                    onlyRejected && rejectedRequests.map((item,index) => {
                        const {name, value} = getValueAndFieldText(item,language)
                        const rejectedAt = item?.rejectedAt
                            ? new Date(item?.rejectedAt).toLocaleDateString()
                            : ""
                        return (
                            <p className={'dark:text-white w-full'} key={index}>{name} - <strong
                                className={'text-blue-500'}>{value}</strong> <span
                                className={'text-red-600 font-medium'}>({rejectedText[language]} - {rejectedAt})</span></p>
                        )
                    })
                }
                {
                    !!(openRequests.length && !onlyRejected)  &&
                    <>
                        <div className={'flex items-center gap-[6px] w-full'}>
                            <Checkbox
                                labelClass={'dark:text-white'}
                                label={selectAllText[language]}
                                onChange={onSelectAll}
                                checked={Object.values(values).every(item => item)}/>
                        </div>


                        {
                            openRequests.map((item,index) => {
                                const {name, value} = getValueAndFieldText(item,language)

                                return (
                                    <div className={'flex items-center gap-[6px] w-full'} key={index}>
                                        <Checkbox
                                            checked={!!(values[item.field])}
                                            onChange={(e) => onChangeCheckbox(e, item.field)}
                                            className={'w-full px-[6px] py-[4px] rounded-[4px] bg-[#ccc] flex items-center gap-[4px]'}
                                            labelClass={'dark:text-white text-[16px]'}
                                            label={<>
                                                <span>{name} - </span>
                                                <span className={'text-blue-500 font-medium'}>{value}</span>
                                            </>}
                                        />
                                    </div>
                                )
                            })
                        }

                        <div className={'flex justify-center items-center gap-[10px]'}>
                            <Button onClick={() => onSubmit()}
                                    className={'bg-green-600'}>{acceptText[language]}</Button>
                            <Button onClick={() => onSubmit(true)}
                                    className={'bg-red-600 whitespace-nowrap'}>{rejectAllText[language]}</Button>
                        </div>
                    </>
                }
            </div>
        </Modal>
    );
}

export default EditRequestsModal;