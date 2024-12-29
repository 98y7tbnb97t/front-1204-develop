import { FC } from "react";
import classNames from "classnames";
import Modal from "../UI/Modal";
import { IHomeworkHistory, IPassedHistory } from "../../models/response/IGroup";

interface ThemeHistoryModalProps {
  className?: string;
  active: boolean;
  setActive: (active: boolean) => void;
  passedHistory?: IPassedHistory;
  homeworkHistory?: IHomeworkHistory;
  materialsCount: number;
}

const ThemeHistoryModal:FC<ThemeHistoryModalProps> = ({ className, active, setActive, passedHistory, homeworkHistory, materialsCount }) => {
  return (
    <Modal active={active} setActive={setActive} className={classNames('!bg-white p-5', {}, [className])}>
        <div className="flex gap-2">
            {passedHistory?.history?.length && <div className="flex-grow">
                <table className="border-2 w-full">
                  <thead><tr className="border-2"><th>Дата</th><th>Пройдено</th></tr></thead>
                  <tbody>
                    {[...passedHistory.history].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date))).map(h => (
                        <tr className="border-2" key={Number(new Date(h.date))}>
                            <td className="border-2 text-center">{new Date(h.date).toLocaleDateString()}</td>
                            <td className="border-2 text-center">{h.passedCount}/{materialsCount}</td>
                        </tr>
                    ))}
                </tbody>
              </table>
            </div>}
            {homeworkHistory?.history?.length && <div className="flex-grow">
                <table className="border-2 w-full">
                  <thead><tr className="border-2"><th>Дата</th><th>Дз отправлено</th></tr></thead>
                  <tbody>
                    {[...homeworkHistory.history].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date))).map((h) => {
                      return (
                        <tr className="border-2" key={Number(new Date(h.date))}>
                            <td className="border-2 text-center">{new Date(h.date).toLocaleDateString()}</td>
                            <td className="border-2 text-center">{h.materials.length}/{materialsCount}</td>
                        </tr>
                      )
                  })}
                </tbody>
              </table>
            </div>}
        </div>
    </Modal>
  );
}

export default ThemeHistoryModal;