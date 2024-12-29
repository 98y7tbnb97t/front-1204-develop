import { FC } from 'react'
import Title from '../../UI/Title';
import { IMaterial } from '../../../models/Program/IMaterial';
import ProgramMain from "./ProgramMain.tsx";
import {useAppSelector} from "../../../hooks/redux.ts";
import {ITranslateItemString, translations} from "../../../utils/translations.tsx";

interface ProgramProps {
    program: IMaterial[];
    setMaterial: (material: IMaterial) => void;
    setMaterialName?: (name: string) => void;
    active?: string;
    homework?: boolean;
    setTranersCommentsModal: ((active: boolean) => void);
}


const Program: FC<ProgramProps> = ({program, setMaterial, setMaterialName, active, homework, setTranersCommentsModal}) => {
    const language = useAppSelector(state => state.TranslateSlice.language)
    const { homework: hm } = useAppSelector(state=> state.HomeworkSlice);
    const {
        chapterText
    }: {
        chapterText: ITranslateItemString
    } = translations.homework

    return (    
        <div className='flex flex-col h-full max-h-[calc(100%-60px)]'>
            <Title name={chapterText[language]} className={'py-[6px]'}/>
            <div className="border-2 border-[#CCC] -mt-6 pt-6 h-full rounded-b-2xl border-t-0">
            {hm && hm.tranersComment &&
                <div className="mx-1">
                    <button 
                        onClick={() => setTranersCommentsModal(true)}
                        className='mr-3 w-full bg-gradient-button rounded-full my-1 text-lg font-semibold py-2'
                    >
                        Комментарии тренера
                    </button>
                </div>
            }
                <ProgramMain
                    program={program}
                    setMaterial={setMaterial}
                    setMaterialName={setMaterialName}
                    active={active}
                    homework={homework}
                />
            </div>
        </div>
    )
}
export default Program;
