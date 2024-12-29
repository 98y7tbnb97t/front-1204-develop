import { FC, useEffect, useState } from 'react';
import Balance from '../components/Balance/Balance';
import AppDownloadModal from '../components/Modals/AppDownloadModal.tsx';
import { useAppSelector } from '../hooks/redux.ts';
import TrustLessonWarning from '../components/TrustLessonWarning/TrustLessonWarning.tsx';

const BalancePage: FC = () => {
  const [isAppDownloadModalOpened, setIsAppDownloadModalOpened] =
    useState<boolean>(false);
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
  return (
    <div className="w-full relative">
      <div>
        <TrustLessonWarning payBtn={false}/>
        <Balance />
      </div>
      <AppDownloadModal
        active={isAppDownloadModalOpened}
        onClose={setIsAppDownloadModalOpened}
      />
    </div>
  );
};

export default BalancePage;
