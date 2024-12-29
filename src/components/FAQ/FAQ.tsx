import { FC, useEffect, useState } from 'react'
import Item from './Item';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { getAdvicesForParents } from '../../store/reducers/InfoTextsSlice';
import AppDownloadModal from '../Modals/AppDownloadModal';

const FAQ: FC = () => {
    const dispatch = useAppDispatch();
    const advicesForParents = useAppSelector(state => state.InfoTextsSlice.advicesForParents);
    const language = useAppSelector(state => state.TranslateSlice.language);
    const user = useAppSelector((state) => state.UserSlice.user);
    const [isAppDownloadModalOpened, setIsAppDownloadModalOpened] =
    useState<boolean>(false);

    useEffect(() => {
        function checkFCM() {
        setIsAppDownloadModalOpened(true);
        }
        (!user.fcm || user.fcm.length === 0) &&
        user.born &&
        user.role !== 'DIRECTOR' &&
        user.role !== 'ZDIRECTOR' &&
        user.role !== 'ADMIN' &&
        checkFCM();
    }, []);

    useEffect(() => {
        void dispatch(getAdvicesForParents()).unwrap();
    }, [dispatch]);

    return (
        <div className='w-full flex flex-col items-center p-2 md:p-5 py-3 md:py-10 bg-[#f0f0f0] rounded-xl overflow-auto max-h-[calc(100vh-155px)] md:max-h-[calc(100vh-190px)] xl:max-h-[calc(100vh-130px)]'>
            {advicesForParents.redTextAbove && (
                <p className='text-red-500 mb-5 text-lg font-bold'>{advicesForParents.redTextAbove[language]}</p>
            )}
            {advicesForParents.textBlocks &&
                advicesForParents.textBlocks.map(block =>
                    <Item key={block.id} item={{
                        _id: block._id?.toString() || '',
                        name: block.title[language],
                        description: block.content[language]
                    }} />    
                )
            }
            <ul className='self-start justify-self-start text-xl mt-10 font-semibold max-2xl:text-lg leading-normal'>
                <li>Раздел дополнительные задачи - до 01.12.2023</li>
                <li>Раздел лиги/турниры - до 01.12.2023</li>
                <li>Перевод всего портала на армянском и на английском - до 01.01.2024</li>
                <li>Мобильное приложение - до 01.01.2024</li>
                <li>Сеансы - до 01.02.2024</li>
                <li>Викторины по задачам - до 01.03.2024</li>
            </ul>
            <AppDownloadModal
                active={isAppDownloadModalOpened}
                onClose={setIsAppDownloadModalOpened}
            />
        </div>
    )
}

export default FAQ;