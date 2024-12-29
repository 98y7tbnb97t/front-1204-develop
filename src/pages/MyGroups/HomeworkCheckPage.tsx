import { FC, useState, useEffect } from 'react'
import TopMenu from '../../components/UI/TopMenu/TopMenu';
import { ITopMenu } from '../../models/ITopMenu';
import Table from '../../components/Homework/CheckPacge/Table';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useParams } from 'react-router-dom';
import { getGroup } from '../../store/reducers/GroupSlice';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";

const HomeworkCheckPage: FC = () => {
    const {groupId} = useParams();
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        programText,
        homeworkText,
        groupDescriptionText,
        historyText,
        onlineLessonText,
        participantsText
    }: {
        programText: ITranslateItemString,
        homeworkText: ITranslateItemString,
        groupDescriptionText: ITranslateItemString,
        historyText: ITranslateItemString,
        onlineLessonText: ITranslateItemString,
        participantsText: ITranslateItemString
    } = translations.groups

    const [menu] = useState<ITopMenu[]>([
        {id: 0, name: programText[language], path: `/group/${groupId}/program`}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {id: 1, name: onlineLessonText[language], path: `/group/${groupId}/online-lesson`}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {id: 2, name: homeworkText[language], path: `/group/${groupId}/homework`}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {id: 3, name: participantsText[language]},
        {id: 4, name: groupDescriptionText[language], path: `/group/${groupId}/description`}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {id: 5, name: historyText[language], path: `/group/${groupId}/history`}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
    ]);
    const dispatch = useAppDispatch();
    const { group } = useAppSelector(state=> state.GroupSlice)
    useEffect(() => {
        const fetchData = async() => {
            if(groupId) {
                await dispatch(getGroup(groupId));
            }
        }
        void fetchData();
    }, [dispatch])
    
    return (
        <div className='w-full'>
            <TopMenu menu={menu}/>
            <div className='m-5 p-5 bg-[#f0f0f0] rounded-xl flex justify-between'>
                <div className="flex flex-col w-full">
                    {group &&
                        <Table table={group}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeworkCheckPage;