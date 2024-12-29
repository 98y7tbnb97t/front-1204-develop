import { AiFillQuestionCircle } from '@react-icons/all-files/ai/AiFillQuestionCircle';
import { FC } from 'react'

interface TitleProps {
    name: string;
    isPassive?: boolean,
    className?: string,
    questionMark?: boolean
    onQuestionClick?: () => void
}

const Title: FC<TitleProps> = ({name,isPassive,className, onQuestionClick, questionMark = false}) => {
    return (
        <div className={`${isPassive ? 'bg-gradient-button' : 'bg-gradient-title'}    text-lg 2xl:text-xl flex justify-center items-center text-[#6D5733] rounded-full font-bold text-center  ${className || ""}`}>
            {name}
            {questionMark && onQuestionClick && <button onClick={onQuestionClick}  className="shrink-0">
                <AiFillQuestionCircle className="ml-1 text-xl text-blue-500" />
            </button>}
        </div>
    )
}

export default Title;