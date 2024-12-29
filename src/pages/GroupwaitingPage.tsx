import { FC, useEffect, useState } from 'react'
import Table from '../components/GroupWaiting/Table';
import PermissionsService from '../services/PermissionsService';
import { User } from '../models/User';
import { ITopMenu } from '../models/ITopMenu';
import {useAppSelector} from "../hooks/redux.ts";
import {ITranslateItemString, translations} from "../utils/translations.tsx";
import TopMenuGroupWaiting from '../components/UI/TopMenu/TopMenuGroupWaiting.tsx';

const GroupwaitingPage: FC = () => {
    const [users, setUsers] = useState<User[]>();

    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        listText,
        archiveText,
    }: {
        listText: ITranslateItemString,
        archiveText: ITranslateItemString,
    } = translations.waitGroup


    useEffect(() => {
        setMenu([
            {id: 0, name: listText[language], path: `/groupwaiting`},
            {id: 1, name: archiveText[language], path: `/groupwaiting/archive`}
        ])
    }, [archiveText, language, listText]);

    const [menu,setMenu] = useState<ITopMenu[]>([
        {id: 0, name: listText[language], path: `/groupwaiting`},
        {id: 1, name: archiveText[language], path: `/groupwaiting/archive`}
    ]);
    const fetchData = async(searchQuery?: string) => {
        const response = await PermissionsService.getUsers('STUDENT', searchQuery, undefined, false, undefined, true);
        setUsers(response.data.users);
    }
    useEffect(() => {
        void fetchData();
    }, [])
    
    return (
        <div className='w-full'>
            <TopMenuGroupWaiting menu={menu} fetchData={fetchData}/>
            {users &&
                <Table table={users}/>
            }
        </div>
    )
}

export default GroupwaitingPage;