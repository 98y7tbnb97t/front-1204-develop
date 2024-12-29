import {FC, ReactNode, useEffect, useState} from "react";
import {useAppSelector} from "../../hooks/redux.ts";
import copy from "copy-to-clipboard";
import {translations} from "../../utils/translations.tsx";
import {FaRegCopy} from "@react-icons/all-files/fa/FaRegCopy";
import {isUserDirector} from "../../utils/userRoles.ts";


const {
    copiedText
} = translations.requisites

interface CopyWrapperProps {
    value: string | undefined,
    children: ReactNode,
    isStatic?: boolean
    btnClass?: string
}

const CopyWrapper: FC<CopyWrapperProps> = ({value, children,isStatic,btnClass}) => {
    const user = useAppSelector(state => state.UserSlice.user)
    const [copied, setCopied] = useState<boolean>(false)
    const language = useAppSelector(state => state.TranslateSlice.language)

    useEffect(() => {
        if (copied) setTimeout(() => setCopied(false), 1000)
    }, [copied]);

    const onCopy = () => {
        if(value) copy(value)
        setCopied(true)
    }
    return (
        <div className={`flex ${isStatic ? 'items-center' : ""} relative w-full gap-[4px]`}>
            {children}
            {
                isUserDirector(user.role) &&
                 <>
                     <button
                         type={'button'}
                         className={`${btnClass || ""} ${!isStatic ? 'absolute right-[16px] top-[50%] translate-y-[-50%] bg-white' : "bg-transparent"} text-[24px] text-blue-900 `}
                         onClick={onCopy}
                         disabled={!value}
                     >
                         <FaRegCopy/>
                     </button>
                     {
                         !!(copied) &&
                         <span
                             className={'bg-black p-[4px] rounded-[4px] text-white absolute right-[10px] top-0 translate-y-[-100%]'}>{copiedText[language]}</span>
                     }
                 </>
            }

        </div>
    )
}


export default CopyWrapper