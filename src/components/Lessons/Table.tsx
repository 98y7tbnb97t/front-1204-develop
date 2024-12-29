import {FC} from 'react'
import { IGroup } from '../../models/response/IGroup';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import { shortestDate } from '../../utils/shortestDate';
import {useAppSelector} from "../../hooks/redux.ts";
import {ITranslateItemString, translations} from "../../utils/translations.tsx";

interface TableProps {
    table: IGroup[];
}

const Table: FC<TableProps> = ({table}) => {
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        participantsText,
        goToLessonText,
    }: {
        participantsText: ITranslateItemString,
        goToLessonText: ITranslateItemString,
    }  = translations.lessons
    
    return (
        <div className="p-2 lg:p-5 flex justify-between md:block flex-wrap">
            {table.map((item, index)=> {
                index++;
                
                return (
                    <div key={index} className={["relative w-full  md:w-full rounded-xl pb-10 md:pb-2 p-2 lg:p-3 flex gap-3 flex-col-reverse md:flex-row justify-between mb-3 lg:mb-5", index === 1 ? 'bg-green-600': 'bg-gradient-top-menu'].join(' ')}>
                        <div className="flex h-full">
                            <div className="flex shrink-0 text-sm lg:text-xl font-bold flex-col items-center justify-center bg-gradient-button rounded-xl lg:min-w-[100px] px-1 md:px-2 lg:px-3 mr-3 lg:mr-10">
                                {item.date &&
                                    <>
                                        <p className='text-[#8A6E3E]'>{format(shortestDate(item.date), 'd MMM')}</p>
                                        <p className='text-[#624e2c]'>{item.time}</p>
                                    </>
                                }
                            </div>
                            <div className="flex flex-col">
                                <p className='text-md md:text-lg lg:text-1xl text-white mb-3'>{item.name}</p>
                                <div className="flex">
                                    <p className='text-xl text-white mr-5'>{participantsText[language]}: {item.users.length}</p>
                                    <Link to={'/lesson/'+item._id} className='absolute bottom-[7px] left-2 w-[95%] md:w-auto md:static text-center bg-gradient-button rounded-full px-2 lg:px-4 text-lg font-semibold'>{goToLessonText[language]}</Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center max-w-full md:max-w-[300px] border-b-4 border-b-[#B7975A] md:border-b-0 md:border-l-4 md:border-l-[#B7975A] md:pl-5">
                            <p className='text-white text-md md:text-lg lg:text-1xl font-bold'>{item.name} {item.level}</p>
                        </div>
                    </div>
                )
                
            })}
        </div>
    )
}

export default Table;