/* eslint-disable @typescript-eslint/restrict-plus-operands */
import {FC, useEffect, useState} from 'react'
import {IGroup} from '../../models/response/IGroup';
import Groups from '../../assets/menu-icons/groups-black.png'
import {Link} from 'react-router-dom';
import format from 'date-fns/format';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus';
import CreateFullGroupModal from '../Modals/CreateFullGroupModal';
import { BiArchiveIn } from '@react-icons/all-files/bi/BiArchiveIn';
import { BiArchiveOut } from '@react-icons/all-files/bi/BiArchiveOut';
import { BsTrash } from '@react-icons/all-files/bs/BsTrash';
import ArchiveRemoveGroupModal from '../Modals/ArchiveRemoveGroupModal';
import { searchGroups } from '../../store/reducers/GroupSlice';
import debounce from 'lodash.debounce';
import Input from '../UI/Input';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";
import {groupCountries} from "../../utils/countries.ts";
import CheckBox from '../UI/Main/Checkbox/CheckBox.tsx';
import Button from '../UI/Button.tsx';
import { FaEdit } from '@react-icons/all-files/fa/FaEdit';

interface TableProps {
  table: IGroup[];
  fetchData: (archive: boolean, noStudents?: boolean) => void;
}

const Table: FC<TableProps> = ({table, fetchData}) => {
    const language = useAppSelector(state => state.TranslateSlice.language)
    const [modal, setModal] = useState<boolean>(false);
    const [modal2, setModal2] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [groupInfo, setGroupInfo] = useState<{ _id: string, name: string }>({_id: '', name: ''})
    const [action, setAction] = useState<string>('');
    const {user} = useAppSelector(state => state.UserSlice);
    const [during, setDuring] = useState<'current' | 'archived' | 'noStudents'>('current');
    const [sortedTable, setSortedTable] = useState<IGroup[]>([]);
    const [sortDir, setSortDir] = useState<boolean>(false);
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const searchHandler = (e: InputEvent) => {
        dispatch(searchGroups(e?.target?.value));
    }
    const {
        addGroupText,
        currentText,
        searchText,
        levelText,
        groupNameText,
        numOfStudentsText,
        creationDateText,
        startText,
        statusText,
        editText
    }: {
        addGroupText: ITranslateItemString,
        currentText: ITranslateItemString,
        searchText: ITranslateItemString,
        levelText: ITranslateItemString,
        groupNameText: ITranslateItemString,
        numOfStudentsText: ITranslateItemString,
        creationDateText: ITranslateItemString,
        startText: ITranslateItemString,
        statusText: ITranslateItemString,
        editText: ITranslateItemString,
    } = translations.groups

    useEffect(() => {
        if (table) {
            setSortedTable(table);
        }
    }, [table]);

    const sortBy = (field: string) => {
        setSortDir(!sortDir);
        switch(field) {
            case 'name':
                setSortedTable([...sortedTable].sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? (sortDir ? -1 : 1) : (sortDir ? 1 : -1)));
                break;
            case 'level':
                setSortedTable([...sortedTable].sort((a, b) => a.level.toLowerCase() > b.level.toLowerCase() ? (sortDir ? -1 : 1) : (sortDir ? 1 : -1)));
                break;
            case 'students':
                setSortedTable([...sortedTable].sort((a, b) => 
                    a.users.filter(user => user.role === 'STUDENT').length > b.users.filter(user => user.role === 'STUDENT').length ? 
                    (sortDir ? -1 : 1) :
                    (sortDir ? 1 : -1)
                ));
                break;
            case 'start':
                setSortedTable([...sortedTable].sort((a, b) => 
                    (new Date(a?.start || '') >= new Date(b?.start || '')) ? 
                    (sortDir ? -1 : 1) :
                    (sortDir ? 1 : -1)
                ));
                break;
            case 'createdAt':
                setSortedTable([...sortedTable].sort((a, b) => 
                    (new Date(a?.createdAt || '') >= new Date(b?.createdAt || '')) ? 
                    (sortDir ? -1 : 1) :
                    (sortDir ? 1 : -1)
                ));
                break;
        }
    }

    return (
        <div className="p-5 overflow-auto max-h-[calc(100vh-100px)]">
            <Button onClick={() => setEditModal(true)} className='max-w-xs mb-4'>{editText[language]} <FaEdit className='ml-2'/></Button>
            <table className='w-full bg-[#f0f0f0] rounded-xl overflow-hidden border-collapse'>
                <tbody>
                {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR' || user.role === 'ADMIN') &&
                    <tr className='border-b-4 border-b-red-500 relative flex items-center flex-wrap lg:flex-nowrap'>
                        <td className=" relative">
                            <button onClick={() => setModal(true)}
                                    className='p-3 flex items-center text-lg whitespace-nowrap'><span
                                className='mr-2 bg-gradient-button w-8 h-8 flex justify-center items-center rounded-full shadow-lg text-xl'><AiOutlinePlus/></span>{addGroupText[language]}
                            </button>
                        </td>
                        <td>
                            <div className="flex flex-1 items-center  bottom-[2px] px-3 flex-wrap md:flex-nowrap">
                                <Input type="text" className='!py-1' wrapperClasses='mr-4'
                                       placeholder={searchText[language]} onChange={debounce(e => searchHandler(e), 500)}/>
                                <button onClick={() => {
                                    fetchData(false, false), setDuring('current')
                                }}
                                        className={['mr-10 text-xl font-medium hover:text-[rgb(240,195,177)]', during === 'current' && 'text-[rgb(240,195,177)]'].join(' ')}>{currentText[language]}</button>
                                <button onClick={() => {
                                    fetchData(true), setDuring('archived')
                                }}
                                        className={['mr-10 text-xl font-medium hover:text-[rgb(240,195,177)]', during === 'archived' && 'text-[rgb(240,195,177)]'].join(' ')}>{translations.messenger.archivedText[language]}</button>
                                <button onClick={() => {
                                    fetchData(false, true), setDuring('noStudents')
                                }}
                                        className={['text-xl font-medium hover:text-[rgb(240,195,177)]', during === 'noStudents' && 'text-[rgb(240,195,177)]'].join(' ')}>{translations.groups.noStudentsText[language]}</button>
                            </div>
                        </td>
                    </tr>
                }
                {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') &&
                    <tr 
                        style={{gridTemplateColumns: '3fr 2fr 2fr 2fr 2fr 2fr'}}
                        className='border-b-2 border-b-[#C4C4C4] grid  items-center'
                    >
                        <td onClick={() => sortBy('name')} className='2xl:w-[592px] pl-4'><button className='text-[18px] font-medium'>{groupNameText[language]}</button></td>
                        <td onClick={() => sortBy('level')}><button className='text-[18px] font-medium'>{levelText[language]}</button></td>
                        <td onClick={() => sortBy('students')}><button className='text-[18px] font-medium'>{numOfStudentsText[language]}</button></td>
                        <td onClick={() => sortBy('start')}><button className='text-[18px] font-medium'>{startText[language]}</button></td>
                        <td onClick={() => sortBy('createdAt')}><button className='text-[18px] font-medium'>{creationDateText[language]}</button></td>
                        <td><button className='text-[18px] font-medium'>{statusText[language]}</button></td>
                    </tr>
                }
                {sortedTable.length > 0 &&
                    sortedTable.map(item => {
                        // логика для удаления undefined в name
                        const nameWithoutUndefined = item.name.replace(/undefined/g, '');

              const imgPath = item.country
                ? groupCountries.find(
                    (country) => country.slug === item.country,
                  )?.img
                : Groups;

                        return (
                            <tr
                                style={{gridTemplateColumns: '3fr 2fr 2fr 2fr 2fr 2fr'}}
                                key={item._id}
                                className='border-b-2 border-b-[#C4C4C4] grid  items-center'>
                                <div className='flex items-center'>
                                    <div className='pl-1'>
                                        <CheckBox checked={selectedGroup === item._id} onChange={e => setSelectedGroup(item._id)}/>
                                    </div>
                                    <td className='w-14 py-5 hidden sm:block'>
                                        <div className="w-11">
                                            <img
                                                className='w-full rounded-full'
                                                src={imgPath}
                                                alt="ico"
                                            />
                                        </div>
                                    </td>
                                    <td className='2xl:w-[500px]'>
                                        <Link
                                            to={'/group/' + item._id}
                                            className='font-bold text-[12px] sm:text-[16px]'
                                        >{nameWithoutUndefined}</Link>
                                    </td>
                                </div>
                                <td className='whitespace-nowrap'>
                                    <p>{item.level.replace(levelText.ru, levelText[language])}</p></td>
                                <td className=' whitespace-nowrap'><p
                                    className='text-bold'>{item.users.filter(user => user.role === 'STUDENT').length} /
                                    6</p></td>
                                <td className=' whitespace-nowrap'>
                                <p
                                        className='text-bold'>{item?.start && format(new Date(item?.start), 'd MMM H:mm')}</p>
                                </td>
                                <td className=' whitespace-nowrap'>
                                <p
                                        className='text-bold'>{item?.createdAt ? format(new Date(item?.createdAt), 'd MMM yyyy') : ''}</p>
                                <p
                                        className='text-bold'>{item?.createdBy?.name || ''}</p>
                                </td>
                                <div className='flex items-center gap-1'>
                                    <div>
                                        <p
                                                className='text-bold'>{item?.archivedAt ? format(new Date(item?.archivedAt), 'd MMM yyyy') : ''}</p>
                                        <p
                                                className='text-bold'>{item?.archivedBy?.name || ''}</p>
                                    </div>
                                    {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') &&
                                        <>
                                            <button title={item.archive ? 'Unarchive' : 'Archive'} onClick={() => {
                                                setAction(item.archive ? 'unarchive' : 'archive');
                                                setModal2(true);
                                                setGroupInfo({_id: item._id, name: item.name})
                                            }} className='text-red-600 text-xl'>{item.archive ? <BiArchiveOut/> :
                                                <BiArchiveIn/>}</button>
                                            {(item.archive) &&
                                                <button onClick={() => {
                                                    setAction('remove');
                                                    setModal2(true);
                                                    setGroupInfo({_id: item._id, name: item.name})
                                                }} title='Remove' className='ml-5 text-red-600 text-xl'><BsTrash/>
                                                </button>
                                            }
                                        </>
                                    }
                                </div>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <CreateFullGroupModal modal={modal} setModal={setModal}/>
            {selectedGroup && <CreateFullGroupModal modal={editModal} setModal={setEditModal} group_id={selectedGroup} edit={true}/> }
            {modal2 &&
                <ArchiveRemoveGroupModal modal={modal2} setModal={setModal2} groupInfo={groupInfo} action={action}/>
            }
        </div>
    )
}

export default Table;
