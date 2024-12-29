import {FC, useEffect, useState} from 'react';
import Modal from "../UI/Modal.tsx";

import {translations} from "../../utils/translations.tsx";
import {useAppSelector} from "../../hooks/redux.ts";

import { User } from '../../models/User.ts';
import { setRoleColor } from '../../utils/userRoles.ts';
import Button from '../UI/Button.tsx';

interface FormerChatParticipantsModalProps {
    active: boolean,
    onClose: (bool: boolean) => void,
    archivedUsers: User[];
    deletedUsers: User[];
}

const FormerChatParticipantsModal: FC<FormerChatParticipantsModalProps> = ({active, onClose, archivedUsers, deletedUsers}) => {
    const language = useAppSelector(state => state.TranslateSlice.language);
    const [categoryToShow, setCategoryToShow] = useState<'archived' | 'deleted'>('archived'); 
    const users = categoryToShow === 'archived' ? archivedUsers : deletedUsers;
    const user = useAppSelector(state => state.UserSlice.user);
    const {
        archivedText,
        deletedText
    } = translations.messenger

    useEffect(() => {
        if (deletedUsers.length && !archivedUsers.length) {
            setCategoryToShow('deleted');
        }
    }, [deletedUsers, archivedUsers, setCategoryToShow]);

    return (
        <Modal
            active={active}
            setActive={onClose}
            closeBtnStyle={'!text-black'}
            padding={0}
            paddingMd={0}
        >
            <div>
                <div className='md:p-2 p-1 flex justify-center gap-2'>
                    <Button 
                        className={categoryToShow === 'archived' ? 'bg-slate-400' : ''}
                        onClick={() => setCategoryToShow('archived')}
                    >
                            {archivedText[language]}
                        </Button>
                    <Button
                        className={categoryToShow === 'deleted' ? 'bg-slate-400' : ''}
                        onClick={() => setCategoryToShow('deleted')}
                    >
                        {deletedText[language]}
                    </Button>
                </div>
                <div className='md:p-4 p-1'>
                    {
                    users.map((useritm) => (
                        <div 
                            key={useritm._id}
                            className='flex items-center justify-between mb-2 md:mb-5'
                        >
                            <div className="flex items-center">
                                <div className='w-8 md:w-12 mr-3'>
                                    <img 
                                        className='w-full'
                                        src={useritm.avatar}
                                        alt="avatar"
                                    />
                                </div>
                                <div className="flex flex-col ">
                                    <p className={`font-medium ${setRoleColor(useritm.role)}`}>{useritm.name} {useritm.sname}</p>
                                    {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') &&
                                        <>
                                            <p className={'text-gray-700'}>{useritm.email}</p>
                                            {useritm.lichess &&
                                                <a 
                                                    className='text-blue-400'
                                                    href={useritm.lichess}
                                                    target='_blank'>@{useritm.lichess.split('@/').pop()}
                                                </a>
                                            }
                                        </>
                                    }
                                </div>
                            </div>                       
                        </div>
                        ))
                    }
                </div>
            </div>
        </Modal>
    );
}

export default FormerChatParticipantsModal;