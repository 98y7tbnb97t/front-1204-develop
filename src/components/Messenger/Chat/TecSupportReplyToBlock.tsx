import {FC, useState} from 'react';
import {useAppSelector} from "../../../hooks/redux.ts";
import {translations} from "../../../utils/translations.tsx";
import {isUserDirector} from "../../../utils/userRoles.ts";

interface TecSupportReplyToBlockProps {
    setReplyUserEmail: (id: string) => void
}

const TecSupportReplyToBlock: FC<TecSupportReplyToBlockProps> = ({setReplyUserEmail}) => {
    const language = useAppSelector(state => state.TranslateSlice.language)
    const users = useAppSelector(state => state.MessengerSlice.chat.users)
    const {user} = useAppSelector(state => state.UserSlice)


    const [isUserListOpened, setIsUserListOpened] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')


    const onReply = (email: string) => {
        setReplyUserEmail(email)
    }

    const onOpenUserList = (): void => setIsUserListOpened(true)
    const onCloseUserList = (): void => {
        setTimeout(() => setIsUserListOpened(false), 300)
    }

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const {
        replyDescriptionText,
    } = translations.messenger


    return (
        <div className='relative'>


            {
                isUserListOpened && users &&
                <div
                    className='absolute top-0 left-0 translate-y-[-100%] rounded-[10px] bg-[#ccc] flex w-full z-10 max-h-[400px] overflow-y-auto flex flex-wrap'>
                    {
                        users
                            .filter(item => (
                                user._id !== item._id &&
                                !isUserDirector(item.role) &&
                                (
                                    item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                                    item.sname.toLowerCase().includes(searchValue.toLowerCase()))
                            ))
                            .map(({_id, name, sname, email}) => {

                                return (
                                    <button
                                        key={_id}
                                        onClick={() => onReply(email)}
                                        className='w-2/6 p-[4px] border-0 border-b-[1px] hover:bg-blue-500 border-b-black bg-transparent text-[16px]'>{name} {sname}</button>
                                )
                            })
                    }
                </div>
            }
            <input
                onBlur={onCloseUserList}
                onFocus={onOpenUserList}
                onChange={onSearch}
                value={searchValue}
                placeholder={replyDescriptionText[language]}
                className="px-1 xl:px-5 py-1 xl:py-2 w-full rounded-lg shadow-sm text-[15px] resize-none custom-scroll focus:outline-none bg-white text-black h-[30px] max-h-[80px]"
            />
        </div>
    );
}

export default TecSupportReplyToBlock;
