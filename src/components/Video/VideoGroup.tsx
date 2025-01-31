import {FC} from 'react'
import Folder from '../../assets/icons/folder-black.png'
import { Link } from 'react-router-dom';

interface VideoGroupProps {
    group: {
        _id: string,
        name: string,
        videocounter?: number
    },
}

const VideoGroup: FC<VideoGroupProps> = ({group}) => {
    return (
        <Link to={'/video/'+group._id} className='flex items-center w-full px-3 xl:px-10'>
            <div className="mr-2"><img src={Folder} alt="folder"/></div>
            <p className={['w-full rounded-full py-2 px-4 flex bg-white items-center justify-center font-bold text-sm border-2'].join(' ')}>{group.name} <span className='text-red-500 ml-3 text-lg font-bold'>{group?.videocounter}</span></p>
        </Link>
    )
}

export default VideoGroup;