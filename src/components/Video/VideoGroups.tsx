import { FC, useState, useEffect } from 'react'
import { IGroup } from '../../models/response/IGroup';
import { useAppSelector } from '../../hooks/redux';
import VideoGroup from './VideoGroup';
import VideoService from '../../services/VideoService';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";
import Button from '../UI/Button.tsx';

interface VideoGroupsProps {
    groups: IGroup[];
}

const VideoGroups: FC<VideoGroupsProps> = ({groups}) => {
    const {user} = useAppSelector(state=> state.UserSlice);
    const [couners, setCounters] = useState<{my: number, learn: number}>({my: 0, learn: 0})
    const language = useAppSelector(state => state.TranslateSlice.language)
    const [showArchive, setShowArchive] = useState<boolean>(false);
    const [filteredGroups, setFilteredGroups] = useState<IGroup[]>([]);
    const {
        eduMaterialText
    }: {
        eduMaterialText: ITranslateItemString
    } = translations.videoLessons

    const {
        activeText,
        archivedText
    } = translations.groups

    useEffect(() => {
        setFilteredGroups(groups.filter(g => g.archive === showArchive))
    }, [showArchive, setFilteredGroups, groups])

    useEffect(() => {
        void VideoService.getCounters().then(resp => setCounters({my: resp.data.my, learn: resp.data.learn}));
    }, [])
    return (
        <div className="p-5">
                <div className="flex gap-2 mb-2">
                    <Button className={showArchive ? 'bg-slate-400' : ''} onClick={() => setShowArchive(false)}>{activeText[language]}</Button>
                    <Button className={!showArchive ? 'bg-slate-400' : ''} onClick={() => setShowArchive(true)}>{archivedText[language]}</Button>
                </div>
            <div className="w-full bg-[#f0f0f0] rounded-xl overflow-hidden border-collapse flex flex-wrap py-2 xl:py-10 p-2 xl:p-20">
                {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') &&
                    <div key={'653bb68d6188c50706d14f4a'} className="xl:basis-1/2 mb-3 w-full">
                        <VideoGroup group={{_id: '653bb68d6188c50706d14f4a', name: eduMaterialText[language], videocounter: couners.learn}}/>
                    </div>
                }
                {user.role === 'TRANERMETODIST' &&
                    <>
                        <div key={'653bb68d6188c50706d14f4a'} className="xl:basis-1/2 mb-3 w-full">
                            <VideoGroup group={{_id: '653bb68d6188c50706d14f4a', name: eduMaterialText[language], videocounter: couners.learn}}/>
                        </div>
                        <div key={user._id} className="xl:basis-1/2 mb-3 w-full">
                            <VideoGroup group={{_id: user._id, name: 'ПРОБНЫЕ УРОКИ ЛИЧНАЯ', videocounter: couners.my}}/>
                        </div>
                    </>
                }
                {filteredGroups.map(group=>
                    group._id !== '653bb23a7575d7142fe229e7' &&
                    <div key={group._id} className="xl:basis-1/2 mb-3 w-full">
                        <VideoGroup group={{_id: group._id, name: group.name, videocounter: group.videocounter}}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VideoGroups;