import classNames from "classnames";
import { FC } from "react";

interface OnlineIndicatorProps {
    className?: string;
    isOnline?: boolean;
}

const OnlineIndicator: FC<OnlineIndicatorProps> = ({ className, isOnline = false }) => {
    return (
        <>
            {isOnline && (<div className={classNames('bg-red-500 w-[6px] h-[6px] rounded-full', {}, [className])}></div>) }
        </>
    );
}

export default OnlineIndicator