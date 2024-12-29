import { FC, useEffect, useState } from "react";
import copy from 'copy-to-clipboard';
import { translations } from "../../utils/translations";
import { useAppSelector } from "../../hooks/redux";

interface GraphicListProps {
    dates: string[][];
}
const GraphicList: FC<GraphicListProps> = ({ dates }) => {
    const language = useAppSelector(state => state.TranslateSlice.language);
    const [copied, setCopied] = useState<boolean>(false);
    const onCopy = () => {
        copy(valuesText);
        setCopied(true);
    };

    const valuesText = 'Московское время \n' + dates
        .map((item) => `${item[0]} - ${item[1]}`)
        .join(`,\n`);

    useEffect(() => {
        if (copied) setTimeout(() => setCopied(false), 1000);
        }, [copied]);
    const {
        moscowTimeText,
        copyText,
        copiedText,
      } = translations.profile;
    return (
        <div>
            <h2
                className={
                'text-center text-[20px] font-bold text-red-600 mb-[10px]'
                }
            >
                {moscowTimeText[language]} GMT+3
            </h2>
            <div
                className={
                'flex flex-col gap-3 min-w-[200px] w-full border-2 p-2 rounded-[20px] border-black'
                }
            >
                {dates.map(([day, times], indx) => (
                <p key={indx} className={'text-[18px]'}>
                    <strong className={'font-extrabold text-red-600'}>
                    {day}:
                    </strong>{' '}
                    {times}
                </p>
                ))}
                { onCopy && (
                    <button
                        className={'font-bold text-blue-500'}
                        type={'button'}
                        onClick={onCopy}
                    >
                        {(copied ? copiedText : copyText)[language]}
                    </button>
                )}
            </div>
        </div>
    );
}

export default GraphicList;