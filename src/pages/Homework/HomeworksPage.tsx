import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import TopMenu from '../../components/UI/TopMenu/TopMenu';
import Table from '../../components/Homework/Table';
import HomeworkService from '../../services/HomeworkService';
import { IHomework } from '../../models/IHomwork';
import AppDownloadModal from '../../components/Modals/AppDownloadModal.tsx';
import { useAppSelector } from '../../hooks/redux.ts';
import TrustLessonWarning from '../../components/TrustLessonWarning/TrustLessonWarning.tsx';

const Homeworks: FC = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoadingState] = useState(false);
  const [homeworks, setHomeworks] = useState<IHomework[]>([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [isAppDownloadModalOpened, setIsAppDownloadModalOpened] =
    useState<boolean>(false);
  const user = useAppSelector((state) => state.UserSlice.user);
  const testUser = useAppSelector((state) => state.UserSlice.testUser);

  let loadingLocal = false;
  const setLoading = (value: boolean) => {
    loadingLocal = value;
    setLoadingState(value);
  };

  const ref = useRef<HTMLDivElement>(null);
  const fetchData = async () => {
    if (loadingLocal || allLoaded) return;
    setLoading(true);
    let homeworks = [] as IHomework[];
    let test_homeworks = [] as IHomework[];
    if (user._id) {
      const response = await HomeworkService.getHomeworks(undefined, page);
      homeworks = homeworks.concat(response.data.homeworks);
    }
    if (testUser._id || user.test_user_id) {
      const response = await HomeworkService.getTestHomeworks(testUser._id || user.test_user_id || '', page);
      test_homeworks = test_homeworks.concat(response.data.homeworks);
    }
    if (homeworks.length === 0 && test_homeworks.length === 0) {
      setAllLoaded(true);
      setLoading(false);
      return;
    }
    setHomeworks((prev) => [...prev, ...homeworks, ...test_homeworks]);
    setLoading(false);
  };

  useEffect(() => {
    void fetchData();
  }, [page]);


  const handleScroll = (e: any) => {
    if (allLoaded || !ref.current) return;
    if (
      // @ts-ignore
      window.innerHeight + (ref.current.parentNode?.scrollTop || 0) !==
        ref.current?.parentNode?.scrollHeight ||
      loadingLocal
    )
      return;
    setPage((prevPage) => prevPage + 1);
  };

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <div className="w-full relative" ref={ref}>
      <TopMenu />
      <TrustLessonWarning />
      <Table table={homeworks} />
      <AppDownloadModal
        active={isAppDownloadModalOpened}
        onClose={setIsAppDownloadModalOpened}
      />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Homeworks;
