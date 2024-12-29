import { FC, useState } from "react"
import { ActionType, IBlockHistory } from "../../models/User"
import Modal from "../UI/Modal";

interface BlockHistoryProps {
    blockHistory: IBlockHistory[],
    trustLessonsDates: Date[]
}

interface TableItem {
    type: ActionType,
    date: Date,
    blockedBy?: string,
    num: number;
}

type TableData = TableItem[];

type ITypeCount = {
    [id in ActionType]: number;
};

export const BlockHistory: FC<BlockHistoryProps> = ({blockHistory, trustLessonsDates}) => {
    const [modal, setModal] = useState(false);
    const typeCount: ITypeCount = {
        close: 0,
        open: 0,
        closeTrust: 0,
        trustLesson: 0
    };
    const data: TableData = [
        ...blockHistory.map(block => ({
            num:  ++typeCount[block.type],
            type: block.type,
            date: new Date(block.blockedAt),
            blockedBy: block.blockedBy && (block.blockedBy.role + ' ' + block.blockedBy.name + ' ' + block.blockedBy.sname)
        }) as TableItem),
        ...trustLessonsDates.map(date => ({ num: ++typeCount['trustLesson'], type: 'trustLesson', date: new Date(date) }) as TableItem)
    ].sort((a, b) => Number(b.date) - Number(a.date));

    const openModal = () => {
        setModal(true);
    }

    const colorsMap: { [key in ActionType]: string } = {
        close: '#ededed',
        open: '#fff',
        closeTrust: '#ff938b',
        trustLesson: '#d7efff',
    }

    return (
        <>
            <p className="text-base sm:text-s font-medium text-white cursor-pointer" onClick={openModal}>История</p>
            <p className="text-base sm:text-s font-medium text-white">{data.filter(d => d.type === 'close' || d.type === 'closeTrust').at(0)?.date.toLocaleDateString()}</p>
            <Modal active={modal} setActive={setModal}>
                <table className="bg-white border-2">
                    <thead><tr><th>№</th><th>Дата</th><th>Действие</th></tr></thead>
                    <tbody>
                        {data.map(item => (
                            <tr className="border-2" style={{ backgroundColor: colorsMap[item.type] }} key={item.date.toString()+item.type}>
                                <td className="border-2 p-2">{item.num || ''}</td>
                                <td className="border-2 p-2">{item.date.toLocaleString()}</td>
                                <td className="border-2 p-2">
                                    {(item.type === 'close' && item.blockedBy) && item.blockedBy + ' закрыл доступ'}
                                    {(item.type === 'open' && item.blockedBy)  && item.blockedBy + ' открыл доступ'}
                                    {item.type === 'closeTrust' && 'Автоматом заблокировался после отправки дз'}
                                    {item.type === 'trustLesson' && 'Ученик взял доверительный'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal>
        </>
    ); 
}