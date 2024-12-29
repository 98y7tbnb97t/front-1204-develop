import {FC, useState} from 'react'
import TopMenu from '../../components/UI/TopMenu/TopMenu';
import GroupInfo from '../../components/MyGroups/GroupInfo';
import {ITopMenu} from '../../models/ITopMenu';
import {useParams} from 'react-router-dom';
import ModalChat from '../Lessons/ModalChat/ModalChat';
import {useAppSelector} from "../../hooks/redux.ts";
import {ITranslateItemString, translations} from "../../utils/translations.tsx";

const Group: FC = () => {
    const language = useAppSelector(state => state.TranslateSlice.language)
    const {groupId} = useParams();
    const [chat, openChat] = useState(false);

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
        {
            id: 0,
            name: programText[language],
            path: `/group/${groupId}/program`,
            excludeMob: ["TRANER",'ZDIRECTOR','DIRECTOR'],
            scope: ['DIRECTOR',
                'ZDIRECTOR',
                'TRANER',
                groupId === '653bb23a7575d7142fe229e7' ? 'ADMIN' : '']
        },
        // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {
            id: 1,
            name: onlineLessonText[language],
            path: `/group/${groupId}/online-lesson`,
            excludeMob: ["TRANER",'ZDIRECTOR','DIRECTOR'],
            scope: ['DIRECTOR',
                'ZDIRECTOR',
                'TRANER',
                groupId === '653bb23a7575d7142fe229e7' ? 'ADMIN' : '']
        },
        // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {
            id: 2,
            name: homeworkText[language],
            path: `/group/${groupId}/homework`,
            excludeMob: ["TRANER",'ZDIRECTOR','DIRECTOR'],
            scope: ['DIRECTOR',
                'ZDIRECTOR',
                'TRANER',
                groupId === '653bb23a7575d7142fe229e7' ? 'ADMIN' : '']
        },
        // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {
            id: 3,
            name: participantsText[language],
            scope: ['DIRECTROR',
                'ZDIRECTOR',
                'TRANER',
                groupId === '653bb23a7575d7142fe229e7' ? 'ADMIN' : '']
        },

        {
            id: 4,
            name: groupDescriptionText[language],
            path: `/group/${groupId}/description`
        },
        // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {
            id: 5,
            name: historyText[language],
            path: `/group/${groupId}/history`
        },
        // eslint-disable-line @typescript-eslint/restrict-template-expressions
    ]);


    return (
        <div className='w-full'>
            <TopMenu menu={menu}/>
            <GroupInfo openChat={openChat} chat={chat}/>
            {chat &&
                <div className="max-w-[900px] p-[10px] m-auto">
                    <ModalChat className='w-full 2xl:w-full' contentHeight={300}/>
                </div>
            }
        </div>
    )
}

export default Group;