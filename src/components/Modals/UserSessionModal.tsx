import { FC } from 'react';
import AccountSwitcher from '../../components/AccountSwitcher/AccountSwitcher.tsx';
import Modal from '../UI/Modal.tsx';

interface UserSessionModalProps {
  active: boolean;
  onClose: (val: boolean) => void;
}

const UserSessionModal: FC<UserSessionModalProps> = ({ active, onClose }) => {
  return (
    <Modal active={active} setActive={onClose} closeBtnStyle={'!text-black'}>
      <AccountSwitcher />
    </Modal>
  );
};

export default UserSessionModal;
