import {FC, useState} from 'react';
import {User} from '../../models/User';
import {FieldErrors} from "react-hook-form";
import {translations} from "../../utils/translations.tsx";
import Input from '../UI/Input';
import {useAppSelector} from '../../hooks/redux';
import PermissionsService from '../../services/PermissionsService';
import {setRoleColor, UserRoles} from "../../utils/userRoles.ts";
import { Tag } from '../UI/Tag/Tag.tsx';
import { useDebounce } from '../../hooks/useDebounce.ts';

type Form = {
    emails: string,
};

interface UsersSearchProps {
    errors?: FieldErrors<Form>,
    dropdown: boolean,
    setDropDown: (dropdown: boolean) => void,
    onChangeUser?: (users: User | undefined) => void,
    role?: UserRoles;
    placeholder?: string;
}



const UsersSearch: FC<UsersSearchProps> = ({errors, dropdown, setDropDown, onChangeUser, role, placeholder }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [userAdded, setUserAdded] = useState<User>();
    const [value, setValue] = useState<string>('');
    const {
        archivedText,
        alreadyInGroupText
    } = translations.messenger

    const language = useAppSelector(state => state.TranslateSlice.language)

    const testdebounce = useDebounce(async (e: string) => {
        if (e.length > 0) {
            await PermissionsService.getUsers(
                role,
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

    const userRemove = () => {
        setUserAdded(undefined)
        onChangeUser?.(undefined);
    }

    const addUser = (user: User) => {
        setUserAdded(user);
        onChangeUser?.(user)
        setValue('')
        setDropDown(false)
    }

    return (
        <div>
            <Input
                wrapperClasses='mb-2' type="text"
                placeholder={placeholder || ''} error={errors && errors.emails?.message}
                onInput={e => void testdebounce(e.target.value)}
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            {(users.length > 0 && dropdown) &&
                <ul className="flex flex-col shadow-lg bg-gray-100 border -mt-5 rounded-b-lg mb-5 max-h-[200px] overflow-auto">
                    {users.map(user => {
                        const isInGroup = userAdded?._id === user._id
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
            {!!userAdded &&
                <div className='flex gap-2 flex-wrap rounded-sm p-2'>
                    {<Tag key={userAdded._id} value={userAdded.email} removable onRemove={userRemove}/>}
                </div>
            }
        </div>
    )
}

export default UsersSearch;