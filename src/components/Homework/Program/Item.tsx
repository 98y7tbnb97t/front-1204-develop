import {FC} from 'react'
import {MdOutlineDeleteOutline} from '@react-icons/all-files/md/MdOutlineDeleteOutline'
import { useParams } from 'react-router-dom'
import GroupService from '../../../services/GroupService'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { getGroup } from '../../../store/reducers/GroupSlice'
import { GroupUpdateSocket } from '../../../sockets/GroupSockets'
import {isDeviceMobile} from "../../../utils/getDeviceType.ts";

import "./Item.css"
import {ITranslateItemString, translations} from "../../../utils/translations.tsx";

interface ItemProps {
    id: string,
    number: number;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    active?: string;
    status?: string;
    taskName?: string;
}

const Item: FC<ItemProps> = ({id, number, onClick, active , status, taskName}) => {
    const { groupId } = useParams();
    const dispatch = useAppDispatch();
    const {group} = useAppSelector(state=> state.GroupSlice);
    const {user} = useAppSelector(state=> state.UserSlice);
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        taskText
    }:{
        taskText: ITranslateItemString
    } = translations.homework

    
    const removeHandler = async () => {
        if(groupId) {
            const tmp = [] as string[];
            if(group) {
                if(group.program.length > 0) {
                    group.program.map(material=>{
                        tmp.push(material._id);
                    })
                    await GroupService.editGroup(groupId, {program: tmp.filter(item=> item !== id)} );
                    await dispatch(getGroup(groupId));
                    GroupUpdateSocket({room: groupId});
                }
            }
        }
    }

    return (
        <div className={`flex items-center px-4 font-medium text-l max-2xl:text-base border-b-2 border-b-[#CCC] last:border-b-0 py-1 ${isDeviceMobile() ? "item-text" : ""}`}>
            <button onClick={onClick} className={['w-full flex justify-start ', active === id && 'text-apricot'].join(' ')}>
                <span className='mr-5 text-red-500 font-semibold'>{number}</span> {taskName ? taskName : `${taskText[language]} ${number}`}
                <div className={[status === 'passed' && 'bg-green-500 w-3 h-3 rounded-full mt-2 ml-5', status === 'failed' && 'bg-red-500 w-3 h-3 rounded-full mt-2 ml-5'].join(' ')}></div>
                </button>
            {user.role !== 'STUDENT' &&
                <button onClick={()=> void removeHandler()} title='Удалить задачу' className="bg-red-500 cursor-pointer ml-3 w-6 h-6 p-1 mt-1 rounded-md flex justify-center items-center text-white"><MdOutlineDeleteOutline/></button>
            }
        </div>
    )
}

export default Item;