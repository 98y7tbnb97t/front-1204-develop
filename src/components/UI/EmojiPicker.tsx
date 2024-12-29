import { FC, useRef, useEffect } from 'react'
import  Picker, { EmojiStyle, Theme } from 'emoji-picker-react';
import { EmojiClickData } from 'emoji-picker-react';
import { clickOuter } from '../../utils/clickOuter';
import classNames from 'classnames';

interface EmojiPickerProps {
    active: boolean;
    setActive: (bool: boolean) => void;
    button: HTMLButtonElement | null;
    reactionsDefaultOpen?: boolean;
    className?: string;
    onEmojiClick: (emojiObject: EmojiClickData ) => void ;
}

const EmojiPicker: FC<EmojiPickerProps> = ({
    active,
    setActive,
    button,
    reactionsDefaultOpen = false,
    className,
    onEmojiClick
}) => {
    const pickerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if(pickerRef.current && button) {
            return clickOuter(pickerRef.current, ()=>setActive(false), button);
        }
    }, [active, setActive, button, onEmojiClick]);
    return (
        <>
            {active &&
                <div ref={pickerRef} className={classNames("absolute", {}, [className])}>
                    <Picker
                        reactionsDefaultOpen={reactionsDefaultOpen}
                        theme={Theme.DARK} 
                        emojiStyle={EmojiStyle.NATIVE}
                        onEmojiClick={onEmojiClick}
                        skinTonesDisabled={true}
                    />
                </div>
            }
        </>
    )
}

export default EmojiPicker;