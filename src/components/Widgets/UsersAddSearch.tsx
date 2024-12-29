import {FC, useEffect, useRef, useState} from 'react';
import {User} from '../../models/User';
import {FieldErrors} from "react-hook-form";
import {translations} from "../../utils/translations.tsx";
import Input from '../UI/Input';
import {useAppSelector} from '../../hooks/redux';
import PermissionsService from '../../services/PermissionsService';
import {setRoleColor} from "../../utils/userRoles.ts";
import { Tag } from '../UI/Tag/Tag.tsx';
import { useDebounce } from '../../hooks/useDebounce.ts';

type Form = {
    emails: string,
};

interface UsersAddSearchProps {
    chatUsers?: User[],
    errors?: FieldErrors<Form>,
    dropdown: boolean,
    setDropDown: (dropdown: boolean) => void,
    onChangeUsers?: (users: User[]) => void,
}



const UsersAddSearch: FC<UsersAddSearchProps> = ({chatUsers = [], errors, dropdown, setDropDown, onChangeUsers}) => {
    const [users, setUsers] = useState<User[]>([]);
    const [usersAdded, setUsersAdded] = useState<User[]>([]);
    const [value, setValue] = useState<string>('');
    const {
        addUserText,
        archivedText,
        alreadyInGroupText
    } = translations.messenger
    const language = useAppSelector(state => state.TranslateSlice.language)

    const testdebounce = useDebounce(async (e: string) => {
        if (e.length > 0) {
            await PermissionsService.getUsers(
                undefined,
                e,
                undefined,
                undefined,
                undefined,
                undefined,
                true
            ).then(res => {
                    setUsers(res.data.users);
                    setDropDown(true);
                });
        } else {
            setDropDown(false)
        }
    }, 1000)

    useEffect(() => {
        if (usersAdded.length !== chatUsers.length) {
            setUsersAdded(chatUsers);
        }
    }, [chatUsers])

    const userRemove = (email: string) => {
        setUsersAdded(usersAdded.filter(u => u.email !== email))
    }

    const addUser = (user: User) => {
        const newUsers = [...usersAdded, user];
        setUsersAdded(newUsers);
        onChangeUsers?.(newUsers)
        setValue('')
        setDropDown(false)
    }

    return (
        <>
            {!!usersAdded.length &&
                <div className='flex gap-2 flex-wrap border-blue-600 border-2 rounded-sm p-2'>
                    {usersAdded.map(u => (<Tag key={u._id} value={u.email} removable onRemove={userRemove}/>))}
                </div>
            }
            <Input
                type="text" label={`${addUserText[language]}:`}
                placeholder={`${addUserText[language]}:`} error={errors && errors.emails?.message}
                onInput={e => void testdebounce(e.target.value)}
                value={value}
                onChange={e => setValue(e.target.value)}
                wrapperClasses='userinput'
                onBlur={() => setTimeout(() => setDropDown(false), 200)}
            />
            {(users.length > 0 && dropdown) &&
                <ul className="flex flex-col mt-5 shadow-lg bg-gray-100 border -mt-5 rounded-b-lg mb-5 max-h-[200px] overflow-auto">
                    {users.map(user => {
                        const isInGroup = !![...chatUsers, ...usersAdded].find(item => item._id === user._id)
                        const isArchive = user.archive
                            return (
                                <button
                                    key={user._id}
                                    disabled={isInGroup || isArchive}
                                    className={`hover:bg-apricot text-left disabled:cursor-default cursor-pointer py-2 px-4 border-b ${setRoleColor(user.role)} disabled:italic  disabled:text-gray-300`}
                                    onClick={() => {
                                        addUser(user)
                                    }}
                                >{user.email} ({user.name} {user.sname})
                                    <span className={'text-red-600 font-medium'}> {isInGroup && alreadyInGroupText[language]}</span>
                                    <span className={'text-red-600 font-medium'}> {isArchive && archivedText[language]}</span>
                                </button>
                            )
                        }
                    )}
                </ul>
            }
        </>
    )
}

export default UsersAddSearch;