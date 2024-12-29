import { FC } from "react";
import classNames from "classnames";
import Modal from "../UI/Modal";

interface PassedThemesHelpModalProps {
  className?: string;
  active: boolean;
  setActive: (bool: boolean) => void
}

const PassedThemesHelpModal:FC<PassedThemesHelpModalProps> = ({ className, active, setActive }) => {
  return (
    <Modal active={active} setActive={setActive} className={classNames('!bg-white p-5', {}, [className])}>
        Если ученик не сделает ход на доске,
        автоматически глава не отметится пройденной.
        Но если вы хотите отметить эту главу или все главы данной темы как пройденные,
        просто выберите главу или тему и отметьте как пройденные - и главы темы станут зелеными.
    </Modal>
  );
}

export default PassedThemesHelpModal;