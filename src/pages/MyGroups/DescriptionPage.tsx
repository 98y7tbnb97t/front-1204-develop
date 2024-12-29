import { FC, useState } from 'react'
import TopMenu from '../../components/UI/TopMenu/TopMenu';
import GroupInfo from '../../components/MyGroups/GroupInfo';
import { ITopMenu } from '../../models/ITopMenu';
import { useParams } from 'react-router-dom';
import Description from '../../components/MyGroups/Description/Description';
import {useAppSelector} from "../../hooks/redux.ts";
import {ITranslateItemString, translations} from "../../utils/translations.tsx";

const DescriptionPage: FC = () => {
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
        {id: 1, name: onlineLessonText[language], path: `/group/${groupId}/online-lesson`}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {id: 2, name: homeworkText[language], path: `/group/${groupId}/homework`}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {id: 3, name: participantsText[language]},
        {id: 4, name: groupDescriptionText[language]},
        {id: 5, name: historyText[language], path: `/group/${groupId}/history`}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
    ])

    return (
        <div className='w-full h-[calc(100vh-170px)] xl:h-screen overflow-y-scroll'>
            <TopMenu menu={menu}/>
            <GroupInfo />
            <Description/>

        </div>
    )
}

export default DescriptionPage;