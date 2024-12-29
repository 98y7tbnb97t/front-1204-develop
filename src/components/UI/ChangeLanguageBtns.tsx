import { FC } from "react";
import { languages } from "../../constants"
import { Elanguages } from "../../store/reducers/TranslateSlice"
import classNames from "classnames";

interface ChangeLanguageBtnsProps {
    onLangChange: (lang: Elanguages) => void;
    language: Elanguages;
    className?: string;
}

const ChangeLanguageBtns: FC<ChangeLanguageBtnsProps> = ({ onLangChange, language, className }) => (
    <div className={classNames("flex gap-[6px]", {}, [className])}>
        {Object.values(languages).map((item) => (
            <button
            key={item.text}
            type="button"
            onClick={() => onLangChange(item.text)}
            className={`flex gap-[2px] p-[4px] items-center ${
                language === item.text
                ? 'bg-[#ccc] rounded-full'
                : ''
            }`}
            >
            <img
                src={item.img}
                alt="language"
                key={item.text}
                className="rounded-full w-[20px]"
            />
            <span>{item.shortName}</span>
            </button>
        ))}
    </div>
);


export default ChangeLanguageBtns;