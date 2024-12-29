import {FC, useState} from 'react'
import Modal from '../UI/Modal';
import { IAttachment } from '../../models/IAttachment';

interface AttachmentModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
    attachment: IAttachment
}

const AttachmentModal: FC<AttachmentModalProps> = ({ modal, setModal, attachment }) => {
    const [zoomed,setZoomed] = useState<boolean>(false)
    return (
        <Modal active={modal} setActive={setModal} className='items-center !max-w-[1600px] max-2xl:!max-w-[1300px] w-auto'>
            {attachment.type === 'image' &&
                <img
                    src={attachment.url}
                    alt="image"
                    onClick={() => setZoomed(prevState => !prevState)}
                    className={`max-h-[calc(100vh-100px)] transition ${zoomed ? 'scale-[2] cursor-zoom-out' : "scale-1 cursor-zoom-in"}`}
                />
            }
            {attachment.type === 'video' &&
                <video src={attachment.url} controls />
            }
        </Modal>
    )
}

export default AttachmentModal;