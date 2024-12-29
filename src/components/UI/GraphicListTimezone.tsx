import { FC, useEffect, useState } from "react";

import copy from 'copy-to-clipboard';
import { translations } from "../../utils/translations";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userTimezones } from "../../models/ETimezones";
import convertScheduleWithDayChange from "../../utils/convertScheduleWithDayChange";
import { setTimeZone } from "../../store/reducers/UserSlice";
import Modal from "./Modal";
import { createSelectOptionsFromObj } from "../../utils/createSelectOptionsFromObj";
import Select from "./Main/Select";
import { ISelect } from "../../models/ISelect";
import Button from "./Button";
import SuccessModal from "../Modals/SuccessModal";
import ComboSelect from "./Main/ComboSelect";
import SelectSearch from "./Main/SelectSearch";

interface GraphicListTimezoneProps {
    dates: string[][];
}
const GraphicListTimezone: FC<GraphicListTimezoneProps> = ({ dates }) => {
    const dispatch = useAppDispatch();
    const language = useAppSelector(state => state.TranslateSlice.language);
    const {timeZone, browserTimeZone} = useAppSelector(state => state.UserSlice.user);
    const [timeZoneModal, setTimeZoneModal] = useState<boolean>(false);
    const [successModal, setSuccessModal] = useState<boolean>(false);
    const [selectedTimeZone, setSelectedTimeZone] = useState<ISelect>({
        id: timeZone || 'Europe/Moscow',
        name: userTimezones[timeZone || 'Europe/Moscow'].text[language],
        slug: timeZone || 'Europe/Moscow' 
    });
    
    const timezoneOptions = createSelectOptionsFromObj(userTimezones, language);
    let userTimezone = timeZone || 'Europe/Moscow';
    if (!userTimezones[userTimezone]) {
        userTimezone = 'Europe/Moscow';
    }
    const [copied, setCopied] = useState<boolean>(false);
    const onCopy = () => {
        copy(valuesText);
        setCopied(true);
    };
    const datesConverted = convertScheduleWithDayChange(dates, 'Europe/Moscow', userTimezone || '', language);
    const valuesText = userTimezones[userTimezone].text[language] + '\n' + datesConverted
        .map((item) => `${item[0]} - ${item[1]}`)
        .join(`,\n`);

    useEffect(() => {
        if (copied) setTimeout(() => setCopied(false), 1000);
        }, [copied]);
    const {
        copyText,
        copiedText,
      } = translations.profile;

    const onTimeZoneChange = (e: ISelect) => {
        setSelectedTimeZone(e);
    }

    const onTimeZoneSubmit = async () => {
        await dispatch(setTimeZone(selectedTimeZone.slug));
        setTimeZoneModal(false);
        setSuccessModal(true);
    }

    const setBrowserTimeZone = async () => {
        await dispatch(setTimeZone(browserTimeZone || 'Europe/Moscow'));
        setSuccessModal(true);
        setSelectedTimeZone({
            id: browserTimeZone || 'Europe/Moscow',
            name: userTimezones[browserTimeZone || 'Europe/Moscow'].text[language],
            slug: browserTimeZone || 'Europe/Moscow' 
        });
    }

    return (
        <div>
            {timeZone === browserTimeZone && <p className="text-sm text-gray-800">Ваше время, определенное по браузеру:</p>}
            <h2
                className={
                'text-center text-[20px] font-bold text-red-600'
                }
            >   
                {userTimezones[userTimezone || ''].text[language]}
            </h2>
            {timeZone === browserTimeZone && 
                <button
                    className="text-sm text-blue-500 mx-auto block"
                    onClick={() => setTimeZoneModal(true)}
                >
                    Выбрать другое время
                </button>
            }
            {timeZone !== browserTimeZone && 
                <button
                    className="text-sm text-blue-500 mx-auto block"
                    onClick={() => void setBrowserTimeZone()}
                >
                    Вернуть часовой пояс браузера
                </button>
            }
            <div
                className={
                'flex flex-col  mt-[10px] gap-3 min-w-[200px] w-full border-2 p-2 rounded-[20px] border-black'
                }
            >
                {datesConverted.map(([day, times], indx) => (
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
            <Modal className='p-5 !bg-white' active={timeZoneModal} setActive={setTimeZoneModal}>
                <h2 className="text-center text-xl font-medium mb-4">Выберите ваш часовой пояс</h2>
                <SelectSearch
                    className="select"
                    wrapperClass="w-full"
                    name={'timezone'}
                    options={timezoneOptions}
                    value={selectedTimeZone}
                    onChange={onTimeZoneChange}
                />
                <Button className="mt-2" onClick={onTimeZoneSubmit}>Сохранить</Button>
            </Modal>
            <SuccessModal modal={successModal} setModal={setSuccessModal} message={"Часовой пояс успешно изменен"} />
        </div>
    );
}

export default GraphicListTimezone;