import { FC, useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import { IMessage } from '../../../../models/IMessage'
import { IAttachment } from '../../../../models/IAttachment'
import Attachment from '../Attachments/Attachment'
import Message from '../Message'
import {useAppSelector} from "../../../../hooks/redux.ts";
import {ITranslateItemString, translations} from "../../../../utils/translations.tsx";

interface GroupMediaProps {
    messages: IMessage[];
}

const GroupMedia: FC<GroupMediaProps> = ({ messages }) => {
const languages = useAppSelector(state => state.TranslateSlice.language)
    const [attachments, setAttachments] = useState<IAttachment[]>([]);
    const [linkMessages, setLinkMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        const tempAttachments = [] as IAttachment[];
        const tempMessages = [] as IMessage[];
        const urlPattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\z`!()\[\]{};:'".,<>?«»“”‘’]))/ig; // eslint-disable-line no-useless-escape 
        messages.map(message => {
            if(message.attachments.length > 0) {
                message.attachments.map(attachment=> {
                    tempAttachments.push(attachment);
                })
            }
            if(message.msg.match(urlPattern)) {
                tempMessages.push(message);
            }
        })
        setAttachments(tempAttachments);
        setLinkMessages(tempMessages);
    }, [messages])


    const {
        mediaText,
        filesText,
        linksText
    }: {
        mediaText: ITranslateItemString,
        filesText: ITranslateItemString,
        linksText: ITranslateItemString
    } = translations.messenger
    
    return (
        <div className='px-1 h-full overflow-y-scroll'>
            <Tab.Group>
                <Tab.List className='flex justify-between px-4 mb-1 md:mb-4'>
                    <Tab>
                        {({ selected }) => (
                            <button className={ selected ? 'border-b-2 border-gray-900 font-medium text-lg p-0.5 md:p-2' : 'font-medium text-lg p-0.5 md:p-2'}>{mediaText[languages]}</button>
                        )}
                    </Tab>
                    <Tab>
                        {({ selected }) => (
                            <button className={ selected ? 'border-b-2 border-gray-900 font-medium text-lg p-0.5 md:p-2' : 'font-medium text-lg p-0.5 md:p-2'}>{filesText[languages]}</button>
                        )}
                    </Tab>
                    <Tab>
                        {({ selected }) => (
                            <button className={ selected ? 'border-b-2 border-gray-900 font-medium text-lg p-0.5 md:p-2' : 'font-medium text-lg p-0.5 md:p-2'}>{linksText[languages]}</button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <div className="flex flex-wrap h-full overflow-auto">
                            {attachments.map((attachment, id)=>
                                attachment.type !== 'file' &&
                                <Attachment key={id} className='flex-grow-0' attachment={attachment}/>
                            )}
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <div className="flex flex-wrap  h-full overflow-y-scroll">
                            {attachments.map((attachment, id)=>
                                attachment.type === 'file' &&
                                <Attachment key={id} className='flex-grow-0' attachment={attachment}/>
                            )}
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <div className="flex flex-wrap  h-full overflow-y-scroll">
                            {linkMessages.map((message,id)=>
                                <div className='pb-5'><Message key={id} className='w-full' msg={message} isMe={false}/></div>
                            )}
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default GroupMedia;