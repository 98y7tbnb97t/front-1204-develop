import { FC, useEffect } from 'react'
import Item from './Item';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { getAdvicesForTraners } from '../../store/reducers/InfoTextsSlice';

const FAQTraners: FC = () => {
    const dispatch = useAppDispatch();
    const advicesForTraners = useAppSelector(state => state.InfoTextsSlice.advicesForTraners);
    const language = useAppSelector(state => state.TranslateSlice.language);

    useEffect(() => {
        void dispatch(getAdvicesForTraners()).unwrap();
    }, [dispatch]);

    return (
        <div className='w-full flex flex-col items-center p-5 py-10 bg-[#f0f0f0] rounded-xl overflow-auto max-h-[calc(100vh-130px)]'>
            {advicesForTraners.redTextAbove && (
                <p className='text-red-500 mb-5 text-lg font-bold'>{advicesForTraners.redTextAbove[language]}</p>
            )}
            {advicesForTraners.textBlocks &&
                advicesForTraners.textBlocks.map(block =>
                    <Item key={block._id} item={{
                        _id: block._id?.toString() || '',
                        name: block.title[language],
                        description: block.content[language],
                        videos: block.videos
                    }} />    
                )
            }
        </div>
    )
}

export default FAQTraners;