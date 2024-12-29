import { FC, useState, useEffect } from 'react'
import TopMenu from '../../components/UI/TopMenu/TopMenu';
import { ITopMenu } from '../../models/ITopMenu';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import { getGroups } from '../../store/reducers/GroupSlice';
import AddHomework from '../../components/Homework/AddHomework';
import { useParams } from 'react-router-dom';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";

const AddHomeworkPage: FC = () => {
    const { groupId } = useParams();
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
        {id: 1, name: participantsText[language]},
        {id: 2, name: onlineLessonText[language], path: `/group/${groupId}/online-lesson`}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {id: 3, name: homeworkText[language]},
        {id: 4, name: groupDescriptionText[language], path: `/group/${groupId}/description`}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {id: 5, name: historyText[language], path: `/group/${groupId}/history`}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
    ]);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchData = async() => {
            await dispatch(getGroups({}))
        }
        void fetchData();
    }, [dispatch])
    
    return (
        <div className='w-full'>
            <TopMenu menu={menu}/>
            <AddHomework />
        </div>
    )
}

export default AddHomeworkPage;