import {FC, useState} from 'react'
import { User } from '../../models/User';
import { useAppSelector } from '../../hooks/redux';
import AddUserToGroupModal2 from '../Modals/AddUserToGroupModal2';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";
import RemoveUserModal from '../Modals/RemoveUserModal.tsx';

interface TableProps {
    table: User[];
}

const Table: FC<TableProps> = ({table}) => {
    const [modal, setModal] = useState<boolean>(false);
    const {user} = useAppSelector(state=> state.UserSlice);
    const [userdata, setUserdata] = useState<{user_id: string; email: string}>({user_id: '', email: ''});
    const language = useAppSelector(state => state.TranslateSlice.language)
    const [archiveModal, setArchiveModal] = useState<boolean>(false);

    const {
        assignGroupText
    }: {
        assignGroupText: ITranslateItemString
    } = translations.waitGroup

    const {
        toArchiveText
    }: {
        toArchiveText: ITranslateItemString
    } = translations.access

    const editHandler = (user: User) => {
        setUserdata({user_id: user._id, email: user.email});
        setModal(true);
    }

    const archiveHandler = (user: User) => {
        setUserdata({user_id: user._id, email: user.email});
        setArchiveModal(true);
    }
    // const removeHandler = (user) => {
    //     setUserdata({_id: user._id, name: user.name, sname: user.sname, role: user.role, requizits: user.requizits, email: user.email, archive: user.archive});
    //     setModal2(true);
    // }
    return (
        <>
            <div className="p-2 md:p-5 pb-0 xl:pb-5 h-[calc(100vh-172px)] xl:h-[calc(100vh-110px)] overflow-auto">
                {table.map(item=>
                    ((item.role === 'DIRECTOR' || user.role === 'ZDIRECTOR' || item.role === 'ADMIN' || item.role === 'TRANER') && user.role === 'ADMIN') ?
                    <>
                    </>
                    :
                    <div key={item._id} className="w-full bg-gradient-top-menu rounded-xl p-3 flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between mb-5">
                        <div className="flex flex-col sm:flex-row  items-center ">
                            <div className="w-12 min-w-[48px] mr-5"><img className='w-full' src={item.avatar} alt="avatar" /></div>
                            <div className="flex flex-col xl:basis-[400px]">
                                <p className='text-xl flex gap-3 sm:gap-0 flex-col sm:flex-row text-white break-all'>{item.name} {item.sname} <span className=' max-w-[90px] sm:w-[100px] sm:ml-1 text-base bg-white px-2 shadow-lg rounded-full text-red-500'>{item.role}</span></p>
                                <p className='text-xl text-white break-all'>{item.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center flex-wrap">
                            <button className='bg-gradient-button mb-2 text-lg font-semibold rounded-full w-full py-2 px-2 shrink-0 md:px-5 sm:mr-4' onClick={()=> editHandler(item)}>{assignGroupText[language]}</button>
                            <button className='bg-gradient-button text-lg font-semibold rounded-full w-full py-2 px-2 shrink-0 md:px-5 sm:mr-4' onClick={()=> archiveHandler(item)}>{toArchiveText[language]}</button>
                        </div>
                    </div>
                    
                )}
            </div>
            <AddUserToGroupModal2 modal={modal} setModal={setModal} email={userdata.email} user_id={userdata.user_id}/>
            <RemoveUserModal
                modal={archiveModal}
                setModal={setArchiveModal}
                email={userdata.email}
                _id={userdata.user_id}
                archive={false}
            />
        </>
    )
}

export default Table;