import { FC, useEffect, useState } from 'react';

import Chats from '../../components/Messenger/Chats/Chats';
import StartMessaging from '../../components/Messenger/StartMessaging';

import { useAppSelector } from '../../hooks/redux.ts';
import AppDownloadModal from '../../components/Modals/AppDownloadModal.tsx';

const MessengerPage: FC = () => {
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
    <div className="flex h-full w-full">
      <Chats />
      <StartMessaging />
      <AppDownloadModal
        active={isAppDownloadModalOpened}
        onClose={setIsAppDownloadModalOpened}
      />
    </div>
  );
};

export default MessengerPage;
