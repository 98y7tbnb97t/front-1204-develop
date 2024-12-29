import { FC } from "react";
import { IMessage } from "../../../models/IMessage";
import { User } from "../../../models/User";
import { removeReaction, removeReactionThunk, setReaction, setReactionThunk } from "../../../store/reducers/MessengerSlice";
import { useAppDispatch } from "../../../hooks/redux";
import classNames from "classnames";

interface MessageReactionsProps {
    msg: IMessage;
    user: User
}

const MessageReactions: FC<MessageReactionsProps> = ({msg, user}) => {
    const dispatch = useAppDispatch();
    const reactionClickHandler = (msgId: string, from: string[], emoji: string) => {
        if (from.includes(user._id)) {
            dispatch(removeReaction({msgId, from: user._id, emoji}));
            void dispatch(removeReactionThunk({ msgId, reaction: { from: user._id, emoji }}))
        } else {
            dispatch(setReaction({ msgId, reaction: emoji, from: user._id }));
            void dispatch(setReactionThunk({ msgId, reaction: { from: user._id, emoji }}));
        }
    }
    
    return (
        <>
        {msg.reactions && (
            <>
                {
                    msg.reactions.map(reaction => (
                        <div
                            key={reaction.emoji}
                            className={classNames(
                                'cursor-pointer px-1 shadow-[0_0_7px_0_rgba(0,0,0,0.3)] rounded-full',
                                {
                                    'bg-teal-100': reaction.from.includes(user._id),
                                    'bg-apricot': msg.from?._id === user._id && !reaction.from.includes(user._id),
                                    'bg-white': msg.from?._id !== user._id && !reaction.from.includes(user._id),
                                }
                            )}
                            onClick={() => reactionClickHandler(msg._id, reaction?.from || [], reaction.emoji)}
                        >
                            {reaction.emoji}
                            {reaction.from.length > 1 && reaction.from.length}
                        </div>
                    ))
                }
            </>
        )}
        </>
    )
}

export default MessageReactions;