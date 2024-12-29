import {FC, useState} from 'react';
import {FieldErrors} from "react-hook-form";
import {translations} from "../../utils/translations.tsx";
import Input from '../UI/Input';
import {useAppSelector} from '../../hooks/redux';
import { Tag } from '../UI/Tag/Tag.tsx';
import { useDebounce } from '../../hooks/useDebounce.ts';
import GroupService from '../../services/GroupService.ts';
import { IGroup } from '../../models/response/IGroup.ts';

type Form = {
    emails: string,
};

interface GroupsSearchProps {
    errors?: FieldErrors<Form>,
    dropdown: boolean,
    setDropDown: (dropdown: boolean) => void,
    onChangeGroup?: (groups: IGroup | undefined) => void,
    placeholder?: string;
    className?: string;
}



const GroupsSearch: FC<GroupsSearchProps> = ({errors, dropdown, setDropDown, onChangeGroup, placeholder, className }) => {
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [groupAdded, setGroupAdded] = useState<IGroup>();
    const [value, setValue] = useState<string>('');
    const {
        archivedText,
        alreadyInGroupText
    } = translations.messenger

    const language = useAppSelector(state => state.TranslateSlice.language)

    const testdebounce = useDebounce(async (e: string) => {
        if (e.length > 0) {
            await GroupService.getGroups(undefined, e).then(res => {
                setGroups(res.data.groups);
                    setDropDown(true);
                });
        } else {
            setDropDown(false)
        }
    }, 1000)

    const groupRemove = () => {
        setGroupAdded(undefined)
        onChangeGroup?.(undefined);
    }

    const addGroup = (group: IGroup) => {
        setGroupAdded(group);
        onChangeGroup?.(group)
        setValue('')
        setDropDown(false)
    }

    return (
        <div className={className}>
            <Input
                wrapperClasses='mb-2' type="text"
                placeholder={placeholder || ''} error={errors && errors.emails?.message}
                onInput={e => void testdebounce(e.target.value)}
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            {(groups.length > 0 && dropdown) &&
                <ul className="flex flex-col shadow-lg bg-gray-100 border -mt-5 rounded-b-lg mb-5 max-h-[200px] overflow-auto">
                    {groups.map(group => {
                        const isInGroup = groupAdded?._id === group._id
                        const isArchive = group.archive
                            return (
                                <button
                                    key={group._id}
                                    disabled={isInGroup || isArchive}
                                    className={`hover:bg-apricot text-left disabled:cursor-default cursor-pointer py-2 px-4 border-b disabled:italic  disabled:text-gray-300`}
                                    onClick={() => {
                                        addGroup(group)
                                    }}
                                >{group.name}
                                    <span className={'text-red-600 font-medium'}> {isInGroup && alreadyInGroupText[language]}</span>
                                    <span className={'text-red-600 font-medium'}> {isArchive && archivedText[language]}</span>
                                </button>
                            )
                        }
                    )}
                </ul>
            }
            {!!groupAdded &&
                <div className='flex gap-2 flex-wrap rounded-sm p-2'>
                    {<Tag key={groupAdded._id} value={groupAdded.name} removable onRemove={groupRemove}/>}
                </div>
            }
        </div>
    )
}

export default GroupsSearch;