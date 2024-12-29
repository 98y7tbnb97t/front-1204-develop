import { FC, useEffect, useState } from 'react'
import TopMenu from '../components/UI/TopMenu/TopMenu';
import TableArchive from '../components/GroupWaiting/TableArchive';
import GroupService from '../services/GroupService';
import { ITopMenu } from '../models/ITopMenu';
import { ILog } from '../models/response/Ilog.ts';
import {useAppSelector} from "../hooks/redux.ts";
import {ITranslateItemString, translations} from "../utils/translations.tsx";

const GroupwaitingArchivePage: FC = () => {
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        listText,
        archiveText,
    }: {
        listText: ITranslateItemString,
        archiveText: ITranslateItemString,
    } = translations.waitGroup

    const [logs, setLogs] = useState<ILog[]>();
    const [menu] = useState<ITopMenu[]>([
        {id: 0, name: listText[language], path: `/groupwaiting`},
        {id: 1, name: archiveText[language], path: `/groupwaiting/archive`}
    ]);


    const fetchData = async() => {
        const response = await GroupService.getLogs('adduser')
        setLogs(response.data.logs);
    }
    useEffect(() => {
        void fetchData();
    }, [])
    return (
        <div className='w-full'>
            <TopMenu menu={menu}/>
            {logs &&
                <TableArchive table={logs}/>
            }
        </div>
    )
}

export default GroupwaitingArchivePage;