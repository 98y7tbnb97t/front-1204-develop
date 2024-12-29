import { FC, useEffect } from "react";
import classNames from "classnames";
import Modal from "../UI/Modal";
import { IProgramActionsHistory, ProgramActionType } from "../../models/response/IGroup";
import GroupService from "../../services/GroupService";
import { ITranslateItemString } from "../../utils/translations";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ITheme } from "../../models/Program/ITheme";
import { setGroup } from "../../store/reducers/GroupSlice";

interface ProgramActionsHistoryModalProps {
  className?: string;
  active: boolean;
  setActive: (active: boolean) => void;
  group_id: string;
  history?: IProgramActionsHistory;
  setHistory: (history: IProgramActionsHistory) => void;
  section: 'homework' | 'program';
  themeId?: string;
}

const actionsTranslations: { [key in ProgramActionType]: ITranslateItemString } = {
  add: {
    ru: 'Вы отметили как пройдено',
    en: 'You marked as completed',
    am: 'Դուք նշել եք որպես անցած'
  },
  restore: {
    ru: 'Вы отметили как не пройдено',
    en: 'You marked as not completed',
    am: 'Դուք նշել եք որպես չանցած'
  },
  putoff: {
    ru: 'Вы отложили на потом',
    en: 'You postponed it for later',
    am: 'Դուք հետաձգել եք ավելի ուշ'
  },
  removepostponed: {
    ru: 'Вы убрали темы из "отложить на потом"',
    en: 'You removed themes from "postpone for later"',
    am: 'Դուք հեռացրել եք թեմաները «հետաձգել ավելի ուշ»-ից'
  }
}

const ProgramActionsHistoryModal:FC<ProgramActionsHistoryModalProps> = ({
  className,
  active,
  setActive,
  group_id,
  history,
  setHistory,
  section,
  themeId
}) => {
  const language = useAppSelector(state => state.TranslateSlice.language);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await GroupService.getProgramActionsHistory(group_id);
      setHistory(res.data.programActionsHistory);
    }
    void fetchData();
  }, [group_id, setHistory]);

  const cancelAction = async (actionId: string) => {
    const res = await GroupService.cancelProgramAction(group_id, actionId, section);
    setHistory(res.data.programActionsHistory);
    dispatch(setGroup(res.data.group));
  }

  return (
    <Modal maxWidth={1000} className={classNames(className)} active={active} setActive={setActive}>
        <table className="bg-white border-2">
            <thead><tr><th>№</th><th>Дата</th><th>Действие</th><th>Раздел</th><th>Темы</th></tr></thead>
            <tbody>
                {history && [...history.actions]
                  .filter(action => 'program' === section || action.section === 'homework')
                  .filter(action => themeId ? action.themes.some(theme => (theme as ITheme)._id === themeId) : true)
                  .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
                  .map((item, idx) => (
                    <tr className="border-2" key={item._id || Number(new Date(item.date))}>
                        <td className="border-2 p-2">{idx+1}</td>
                        <td className="border-2 p-2">{new Date(item.date).toLocaleString()}</td>
                        <td className="border-2 p-2">
                            {actionsTranslations[item.type][language]}
                        </td>
                        <td className="border-2 p-2">{item.section === 'homework' ? 'Из раздела дз' : 'Из программы'}</td>
                        <td className="border-2 p-2">
                            {item.themes.map(theme => (
                              <p key={(theme as ITheme)._id}>{(theme as ITheme).name}</p>
                            ))}
                        </td>
                        <td className="border-2 p-2">
                            <button
                              className="text-blue-500 font-bold"
                              onClick={() => item._id && void cancelAction(item._id)}
                            >
                              Отменить
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Modal>
  );
}

export default ProgramActionsHistoryModal;