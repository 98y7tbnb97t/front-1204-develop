import { FC, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { getAdvicesForParents } from '../../store/reducers/InfoTextsSlice';
import Item from './Item';
import AppDownloadModal from '../Modals/AppDownloadModal';
import TrustLessonWarning from '../TrustLessonWarning/TrustLessonWarning';

const FAQAdaptive: FC = () => {
	const dispatch = useAppDispatch();
  const [isAppDownloadModalOpened, setIsAppDownloadModalOpened] =
    useState<boolean>(false);
	const advicesForParents = useAppSelector(state => state.InfoTextsSlice.advicesForParents);
	const language = useAppSelector(state => state.TranslateSlice.language);

  const user = useAppSelector((state) => state.UserSlice.user);

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
		<div className='w-full max-h-full flex flex-col items-center bg-[#f0f0f0] rounded-xl overflow-auto p-2'>
			<TrustLessonWarning />
      {advicesForParents.redTextAbove && (
				<p className='text-red-500 mb-5 text-lg font-bold'>{advicesForParents.redTextAbove[language]}</p>
			)}
			{advicesForParents.textBlocks &&
				advicesForParents.textBlocks.map(block =>
					<Item
						key={block._id}
						item={{
							_id: block._id?.toString() || '',
							name: block.title[language],
							description: block.content[language],
							videos: block.videos
						}}
					/>    
				)
			}
			<AppDownloadModal
          active={isAppDownloadModalOpened}
          onClose={setIsAppDownloadModalOpened}
        />
		</div>
	);
};

export default FAQAdaptive;
