import {FC} from 'react'
import { ILog } from '../../models/response/Ilog.ts';
import { useAppSelector } from '../../hooks/redux';
import format from 'date-fns/format';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";

interface TableArchiveProps {
    table: ILog[];
}

const TableArchive: FC<TableArchiveProps> = ({table}) => {    
const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        actionText,
        executorText,
        targetText,
        dateText,
        addingUserText
    }: {
        actionText: ITranslateItemString,
        executorText: ITranslateItemString,
        targetText: ITranslateItemString,
        dateText: ITranslateItemString,
        addingUserText: ITranslateItemString
    } = translations.waitGroup

    return (
        <>
            <div className="md:p-5 p-[10px] h-[calc(100vh-110px)] overflow-auto">
                <div className="w-full bg-gradient-top-menu rounded-xl p-3 flex justify-between mb-5">
                    <div className="flex items-center w-full text-center font-bold flex-col md:flex-row">
                        <div className="flex flex-col basis-[30%]">
                            <p className='md:text-xl text-[14px] text-white'>{executorText[language]}</p>
                        </div>
                        <div className="flex flex-col basis-[40%]">
                            <p className='md:text-xl text-[14px] text-white'>{targetText[language]}</p>
                        </div>
                        <div className="flex flex-col basis-[30%]">
                            <p className='md:text-xl text-[14px] text-white'>{actionText[language]}</p>
                        </div>
                        <div className="flex flex-col basis-[30%]">
                            <p className='md:text-xl text-[14px] text-white'>{dateText[language]}</p>
                        </div>
                    </div>
                </div>
                {table.map(item=>
                    <div key={item._id} className="w-full bg-gradient-top-menu rounded-xl p-3 flex justify-between mb-5">
                        <div className="flex items-center w-full text-center flex-col sm:flex-row justify-center sm:justify-start">
                            <div className="flex flex-col basis-[30%]">
                                <p className='text-xl text-white'>{item.executer.name} {item.executer.sname}</p>
                            </div>
                            <div className="flex flex-col basis-[40%]">
                                <p className='text-xl text-white'>{item.to.name} {item.to.sname}</p>
                            </div>
                            <div className="flex flex-col basis-[30%]">
                                <p className='text-xl text-white'>{item.type === 'adduser' && addingUserText[language]}</p>
                            </div>
                            <div className="flex flex-col basis-[30%]">
                                <p className='text-xl text-white'>{format(new Date(item.date), 'dd.MM.Y')}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default TableArchive;