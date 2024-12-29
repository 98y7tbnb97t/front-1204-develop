import {FC,  useState} from 'react';
import {useAppSelector} from "../../../hooks/redux.ts";
import {translations} from "../../../utils/translations.tsx";
import Button from "../../UI/Button.tsx";
import AddEditBalanceModal from "./AddEditBalanceModal.tsx";
import {Link} from "react-router-dom";
import {IRequisite} from "../../../models/IRequisite.ts";
import RemoveRequisiteModal from "./RemoveRequisiteModal.tsx";
import {userCountries} from "../../../constants.ts";


const {
    requisitesText,
    bicText,
    accountNumberText,
} = translations.requisites

const {
    addText
} = translations.groups
const {
    deleteText,
    usersText
} = translations.messenger
const {
    countryText,
    editText
} = translations.profile

const BalanceControl: FC = () => {
    const language = useAppSelector(state => state.TranslateSlice.language)
    const requisits = useAppSelector(state => state.BalanceSlice.requisites)

    const [addModalOpened,setAddModalOpened] = useState<boolean>(false)
    const [editData,setEditData] = useState<IRequisite | null>(null)
    const [deleteId,setDeleteId] = useState<string>("")



    const onOpenAddModal = () => setAddModalOpened(true)
    const onOpenEditModal = (data: IRequisite) => {
        setAddModalOpened(true)
        setEditData(data)
    }

    const onCloseDeleteModal = () => {
        setDeleteId("")
    }


    return (
        <>
        <div className={'w-full bg-white flex flex-col gap-2 p-2 mb-2'}>
            <h2 className={'text-red-600 text-[36px] text-center font-bold'}>{requisitesText[language]}</h2>
            <Button className={'max-w-[300px] mb-2'} onClick={onOpenAddModal}>{addText[language]}</Button>
            {
                requisits.map((item) => {
                    const {
                        _id,
                        cardType,
                        ownerEn,
                        bic,
                        accountNumber,
                        card,
                        countries,
                        users,
                        usersTotal,
                        usersArchived,
                        requisiteID
                    } = item

                    const countriesText = countries.map(country => (
                        userCountries?.[country]?.text[language] || country
                    )).join(', ')

                    return (
                        <div key={_id} className={'bg-gray-200 w-full flex gap-1 font-medium rounded-[16px] px-2 py-1 flex-col lg:flex-row'}>
                            <div className={'flex flex-col justify-between gap-2 flex-1'}>
                                <h4 className={'text-[24px] '}>{ownerEn}</h4>
                                <h4 className={'text-[24px]  text-blue-600'}>{cardType} ({card})</h4>

                            </div>
                            <div className={'flex flex-col justify-between gap-2 flex-1'}>
                                <p className={'text-[20px] '}>
                                    {countryText[language]}: {countriesText}
                                </p>

                                <p className={'text-[20px] '}>{(bic ? bicText : accountNumberText)[language]} {bic || accountNumber}</p>
                            </div>
                            <div className={'flex flex-col sm:flex-row justify-between gap-2 lg:flex-col'}>
                                <p className={'text-[20px] '}>
                                    {usersText[language]} - <span className={'text-blue-500'}>
                                        <Link title='Активные пользователи' target='_blank' to={`/permissions?req=${requisiteID}&archived=0`}>{users || 0}</Link> - 
                                        <Link title='Архивные пользователи' target='_blank' to={`/permissions?req=${requisiteID}&archived=1`}><del>{usersArchived || 0}</del></Link>, 
                                        <Link title='Архивные и активные пользователи' target='_blank' to={`/permissions?req=${requisiteID}&archived=all`}>{usersTotal || 0}</Link>
                                    </span>
                                </p>
                                <div className={'flex gap-1 w-full'}>
                                    <button
                                        className={'rounded-full w-full text-white hover:bg-blue-600 disabled:cursor-default px-4 py-2 bg-blue-400 '}
                                        onClick={() => onOpenEditModal(item)}
                                    >{editText[language]}</button>
                                    <button
                                        className={'rounded-full w-full text-white hover:bg-red-600 disabled:cursor-default px-4 py-2 bg-red-500 '}
                                        onClick={() => setDeleteId(_id)}
                                    >{deleteText[language]}</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className={'bg-gray-200 w-full flex gap-1 font-medium rounded-[16px] px-4 py-1 flex-col lg:flex-row justify-end'}>
                <div className={'flex flex-col'}>
                    <p className={'text-[24px]'}>
                        Итого - 
                        <span className={'text-blue-500'}>
                            {(() => {
                                const totals = requisits.reduce(
                                    (prev, curr) => 
                                        [prev[0] + (curr.users || 0), prev[1] + (curr.usersArchived || 0), prev[2] + (curr.usersTotal || 0)],
                                    [0, 0, 0]
                                );
                                return (
                                    <>
                                        <span> <Link title='Активные пользователи' target='_blank' to={`/permissions?archived=0&req=true`}>{totals[0]}</Link></span>
                                        <span> -  <Link title='Архивные пользователи' target='_blank' to={`/permissions?archived=1&req=true`}><del>{totals[1]}</del></Link>, </span>
                                        <span> <Link title='Архивные и активные пользователи' target='_blank' to={`/permissions?archived=all&req=true`}>{totals[2]}</Link></span>
                                    </>
                                );
                            })()}
                        </span>
                    </p> 
                    
                </div>
            </div>
        </div>
            <AddEditBalanceModal opened={addModalOpened} onClose={setAddModalOpened} editData={editData}/>
            <RemoveRequisiteModal setModal={onCloseDeleteModal} _id={deleteId}/>
        </>
    );
}

export default BalanceControl;