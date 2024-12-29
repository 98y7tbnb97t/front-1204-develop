import { FC } from 'react'
import { IMaterial } from '../../../models/Program/IMaterial';
import Item from './Item';
import { useAppSelector } from '../../../hooks/redux';
import {useParams} from "react-router-dom";
import {GroupChangeMaterialSocket} from "../../../sockets/GroupSockets.ts";

import "./ProgramMain.css"

interface ProgramProps {
    program: IMaterial[];
    setMaterial: (material: IMaterial) => void;
    setMaterialName?: (name: string) => void;
    active?: string;
    homework?: boolean;
}

const ProgramMain: FC<ProgramProps> = ({program, setMaterial, setMaterialName, active, homework}) => {
    const {groupId} = useParams();
    const { user } = useAppSelector(state => state.UserSlice);
    const { homework: HM  } = useAppSelector(state => state.HomeworkSlice);
    const setMaterialHandler = (item: IMaterial) => {
        if(!homework) {
            if((user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR' || user.role === 'TRANER') && groupId) {
                setMaterial(item);
                GroupChangeMaterialSocket({room: groupId, material: item});
            }
        } else {
            setMaterial(item);
            if(setMaterialName) {
                setMaterialName(item.theme_id.name);
            }
        }
    }
    return (
                <div className={["flex flex-col overflow-auto program h-full", homework ? 'h-[calc(100vh-300px)]': 'max-h-[250px] max-2xl:max-h-[150px]'].join(' ')}>
                    {program.length > 0 &&
                        program.map((item, id)=>
                            <>
                                <Item 
                                    status={HM.results?.find(item=> item.user_id === user._id)?.results.find(itm=> itm.material === item._id)?.result}
                                    active={active}
                                    onClick={()=> setMaterialHandler(item)} key={item._id}
                                    id={item._id}
                                    number={id + 1}
                                    taskName={item.data.tags.Event}
                                />
                            </>
                        )
                    }

                </div>
    )
}

export default ProgramMain;