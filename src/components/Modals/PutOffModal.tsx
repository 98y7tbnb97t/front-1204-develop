import { ChangeEvent, FC, useState } from "react";
import classNames from "classnames";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import GroupService from "../../services/GroupService";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setGroup } from "../../store/reducers/GroupSlice";
import { IProgramActionsHistory } from "../../models/response/IGroup";

interface PutOffModalProps {
  className?: string;
  active: boolean;
  setActive: (active: boolean) => void;
  materialIds?: string[];
  themeIds?: string[];
  groupId?: string;
  onSubmit?: () => void;
  setHistory: (history: IProgramActionsHistory) => void;
}

const PutOffModal:FC<PutOffModalProps> = ({
    className,
    materialIds,
    themeIds,
    groupId,
    active,
    setActive,
    onSubmit,
    setHistory
}) => {
    const [date, setDate] = useState<string | null>(null);
    const [confirmModal, setConfirmModal] = useState(false);
    const dispatch = useAppDispatch();
    const tomorrowDate = new Date();
    // tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const allThemes = useAppSelector(state => state.ProgramSlice.allThemes);

    const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    }

    const submitHandler = () => {
        if (materialIds && themeIds && groupId && date) {
            setConfirmModal(true);
        }
    }

    const confirm = async () => {
        if (materialIds && themeIds && groupId && date) {
            try {
                const res = await GroupService.putOffMaterial(groupId, themeIds, materialIds, date);
                dispatch(setGroup(res.data.group));
                setHistory(res.data.programActionsHistory);
                setActive(false);
                onSubmit?.();
            } catch(e) {
                console.log(e);
            } finally {
                setConfirmModal(false);
            }
        }
    }

    const close = () => {
        setConfirmModal(false);
        setActive(false);
    }

    return (
        <>
            <Modal active={active} setActive={setActive} className={classNames('!bg-white p-5', {}, [className])}>
                <h3 className="text-center text-xl font-bold mb-5">Отложить на потом</h3>
                <div>
                    Выбрать дату
                    <input 
                        onChange={onChangeDate}
                        className="ml-2 bg-slate-200 p-1 rounded-md"
                        min={tomorrowDate.toISOString().split('T')[0]}
                        type="date"
                        onClick={(e) => (e as unknown as React.FocusEvent<HTMLInputElement, Element>).target.showPicker()}
                    />
                </div>
                <Button onClick={submitHandler} disabled={date === null} className="mt-4">Сохранить</Button>
            </Modal>
            <Modal
                className={classNames("p-5 !bg-white", {}, [className])}
                active={confirmModal}
                setActive={setConfirmModal}
                >
                <div className="flex flex-col gap-2">
                    <p className="text-2xl font-bold">Вы откладываете данные студии на {new Date(date || '').toLocaleDateString()}</p>
                    <ol className="list-disc pl-4">
                    {allThemes.filter(theme => themeIds?.includes(theme._id)).map(theme => <li key={theme._id}>{theme.name}</li>)}
                    </ol>
                    <div className="flex gap-2 mt-2">
                    <Button className="bg-red-500" onClick={close}>Отмена</Button>
                    <Button className="!bg-blue-500" onClick={confirm}>Подтверждаю</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default PutOffModal;
