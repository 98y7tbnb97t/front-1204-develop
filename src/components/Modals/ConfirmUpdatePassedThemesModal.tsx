import { FC } from "react";
import classNames from "classnames";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { useAppSelector } from "../../hooks/redux";

interface ConfirmUpdatePassedThemesModalProps {
  className?: string;
  selectedThemes: string[];
  active: boolean;
  setActive: (active: boolean) => void;
  handleConfirm: (type: 'add' | 'restore') => void;
  type: 'add' | 'restore';
}

const ConfirmUpdatePassedThemesModal:FC<ConfirmUpdatePassedThemesModalProps> = ({ className, active, setActive, selectedThemes, handleConfirm, type }) => {
  const allThemes = useAppSelector(state => state.ProgramSlice.allThemes);

  const close = () => setActive(false);

  const confirm = () => {
    handleConfirm(type);
    close();
  }

  return (
    <Modal
      className={classNames("p-5 !bg-white", {}, [className])}
      active={active}
      setActive={setActive}
    >
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold">Вы отмечаете данные студии как {type === 'add' ? '' : 'не'}пройденные</p>
        <ol className="list-disc pl-4">
          {allThemes.filter(theme => selectedThemes.includes(theme._id)).map(theme => <li key={theme._id}>{theme.name}</li>)}
        </ol>
        <div className="flex gap-2 mt-2">
          <Button className="bg-red-500" onClick={close}>Отмена</Button>
          <Button className="!bg-blue-500" onClick={confirm}>Подтверждаю</Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmUpdatePassedThemesModal;
