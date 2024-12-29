import { FC, useEffect, useState } from 'react';
import AppDownloadModal from '../../components/Modals/AppDownloadModal.tsx';
import Table from '../../components/MyGroups/Table';
import TopMenu from '../../components/UI/TopMenu/TopMenu';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ITopMenu } from '../../models/ITopMenu';
import { getGroups } from '../../store/reducers/GroupSlice';
import {
  ITranslateItemString,
  translations,
} from '../../utils/translations.tsx';

import './MyGroups.css';

const MyGroups: FC = () => {
  const language = useAppSelector((state) => state.TranslateSlice.language);

  const {
    nameText,
    knowledgeLevelText,
    studentNumberText,
    startDateText,
  }: {
    nameText: ITranslateItemString;
    knowledgeLevelText: ITranslateItemString;
    studentNumberText: ITranslateItemString;
    startDateText: ITranslateItemString;
  } = translations.groups;

  const [menu] = useState<ITopMenu[]>([
    { id: 0, name: nameText[language] },
    { id: 1, name: knowledgeLevelText[language] },
    { id: 2, name: studentNumberText[language] },
    { id: 3, name: startDateText[language] },
    { id: 4, name: 'Дата создания' },
    { id: 5, name: 'Дата архивации' },
  ]);
  const [isAppDownloadModalOpened, setIsAppDownloadModalOpened] =
    useState<boolean>(false);
  const user = useAppSelector((state) => state.UserSlice.user);
  const dispatch = useAppDispatch();
  const { groups } = useAppSelector((state) => state.GroupSlice);

  const fetchData = async (archive?: boolean, noStudents?: boolean) => {
    // const response = await PermissionsService.getUsers(role, search, archive);
    // setUsers(response.data.users);
    await dispatch(getGroups({ archive, noStudents }));
  };
  useEffect(() => {
    void fetchData();
  }, [dispatch]);

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
    <div className="w-full h-full">
      <TopMenu menu={menu} className={'topbar'} />
      <Table fetchData={fetchData} table={groups} />
      <AppDownloadModal
        active={isAppDownloadModalOpened}
        onClose={setIsAppDownloadModalOpened}
      />
    </div>
  );
};

export default MyGroups;
