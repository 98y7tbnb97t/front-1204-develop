import { FC, useState, useEffect } from 'react'
import TopMenu from '../../components/UI/TopMenu/TopMenu';
import { ITopMenu } from '../../models/ITopMenu';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getHomeworks } from '../../store/reducers/HomeworkSlice';
import { useParams } from 'react-router-dom';
import { getGroup } from '../../store/reducers/GroupSlice';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";

const HomeworksCheckPage: FC = () => {
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        viewStudentAnswersText,
        viewHomeworkText,
        homeworkText,
        programText,
        groupDescriptionText,
        historyText,
        onlineLessonText,
        participantsText,
        lessonDateText,
        deadlineText,
    }: {
        viewStudentAnswersText: ITranslateItemString,
        viewHomeworkText: ITranslateItemString,
        homeworkText: ITranslateItemString,
        programText: ITranslateItemString,
        groupDescriptionText: ITranslateItemString,
        historyText: ITranslateItemString,
        onlineLessonText: ITranslateItemString,
        participantsText: ITranslateItemString,
        lessonDateText: ITranslateItemString,
        deadlineText: ITranslateItemString,
    } = translations.groups

    const {groupId} = useParams();
    const [menu] = useState<ITopMenu[]>([
        {id: 0, name: programText[language], path: `/group/${groupId}/program`}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {id: 1, name: onlineLessonText[language], path: `/group/${groupId}/online-lesson`}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {id: 2, name: homeworkText[language], path: `/group/${groupId}/homework`}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {id: 3, name: participantsText[language]},
        {id: 4, name: groupDescriptionText[language], path: `/group/${groupId}/description`}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {id: 5, name: historyText[language], path: `/group/${groupId}/history`}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
    ]);
    const dispatch = useAppDispatch();
    const { homeworks } = useAppSelector(state=> state.HomeworkSlice);
    useEffect(() => {
        const fetchData = async() => {
            await dispatch(getHomeworks({group_id: groupId}))
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
                <div className="flex flex-col w-full overflow-auto max-h-[calc(100vh-180px)]">
                    {homeworks &&
                        homeworks.map(item=>
                            <div key={item._id} className={['w-full rounded-xl p-3 flex justify-between mb-5', new Date() >= new Date(item.end) ? 'bg-green-600' : 'bg-gradient-top-menu'].join(' ')}>
                                <div className="flex">
                                    {item.lesson &&
                                        <div className="flex text-xl font-bold flex-col items-center justify-center bg-gradient-button rounded-xl px-3 mr-10">
                                            <p className='text-[#8A6E3E]'>{lessonDateText[language]} {format(new Date(item.lesson), 'd MMM')}</p>
                                        </div>
                                    }
                                    <div className="flex text-xl font-bold flex-col items-center justify-center bg-gradient-button rounded-xl px-3 mr-10">
                                        <p className='text-[#8A6E3E]'>{deadlineText[language]} {format(new Date(item.end), 'd MMM')}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className='text-2xl text-white mb-3'>{homeworkText[language]}</p>
                                        <div className="flex">
                                            {groupId &&
                                                <>
                                                    <Link to={'/group/'+groupId+'/homework/'+item._id} className='bg-gradient-button mr-5 rounded-full px-4 text-lg font-semibold'>{viewStudentAnswersText[language]}</Link>
                                                    <Link to={'/group/'+groupId+'/homework/edit/'+item._id} className='bg-gradient-button rounded-full px-4 text-lg font-semibold'>{viewHomeworkText[language]}</Link>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center max-w-[300px] border-l-4 border-l-[#B7975A] pl-5">
                                    
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeworksCheckPage;