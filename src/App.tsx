import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import OnlyUnauthorized from './components/Auth/OnlyUnauthorized';
import RequireAuth from './components/Auth/RequireAuth';
import RequireNotArchivedStudent from './components/Auth/RequireNotArchivedStudent.tsx';
import RequireRole from './components/Auth/RequireRole';
import FAQAdaptive from './components/FAQ/FAQAdaptive.tsx';
import LayoutAdaptive from './components/Layouts/LayoutAdaptive.jsx';
import LayoutTournament from './components/Layouts/LayoutTournament.jsx';
import LayoutMessenger from './components/Layouts/MessengerAdaptive.tsx';
import EditRequestsResults from './components/Modals/EditRequestsResults.tsx';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import BalancePage from './pages/BalancePage';
import CabinetPage from './pages/CabinetPage/CabinetPage.tsx';
import Comments from './pages/Comments/Comments.tsx';
import ForbiddenPage from './pages/ForbiddenPage.tsx';
import Lesson from './pages/Lessons/Lesson';
import LoginPage from './pages/LoginPage';
import Lessons from './pages/Lessons/Lessons';
import Tournament from './pages/Tournament/Tournament.tsx';
import CreateTournament from './pages/Tournament/CreateTournament.tsx';
import CreateTournamentArea from './pages/Tournament/CreateTournamentArea.tsx';
import CreateTournamentSwiss from './pages/Tournament/CreateTournamentSwiss.tsx';
import TouranamentStart from './pages/Tournament/TouranamentStart.tsx';
import TournamentBeginning from './pages/Tournament/TournamentBeginning.tsx';
import TournamentDuring from './pages/Tournament/TournamentDuring.tsx';
import TournamentFinish from './pages/Tournament/TournamentFinish.tsx';
import CreateTournamentInterGroup from './pages/Tournament/CreateTournamentInterGroup.tsx';
import CreateTournamentInterSchool from './pages/Tournament/CreateTournamentInterSchool.tsx';
import TournamentPlayersList from './pages/Tournament/TournamentPlayersList.tsx';
import ChatPage from './pages/Messenger/ChatPage';
import MessengerPage from './pages/Messenger/MessengerPage';
import DescriptionPage from './pages/MyGroups/DescriptionPage';
import Group from './pages/MyGroups/Group';
import HistoryPage from './pages/MyGroups/HistoryPage';
import MyGroups from './pages/MyGroups/MyGroups';
import OnlineLesson from './pages/MyGroups/OnlineLesson';
import CreatNewSessionPage from './pages/MyGroups/Sessions/CreatNewSessionPage.tsx';
import CreateSeansDirectorPage from './pages/MyGroups/Sessions/CreateSeansDirectorPage.tsx';
import CreateSessionPage from './pages/MyGroups/Sessions/CreateSessionPage.tsx';
import SeansToStartPage from './pages/MyGroups/Sessions/SeansToStartPage.tsx';
import SessionGamePage from './pages/MyGroups/Sessions/SessionGamePage.tsx';
import SessionGamesPage from './pages/MyGroups/Sessions/SessionGamesPage.tsx';
import SessionTablePage from './pages/MyGroups/Sessions/SessionTablePage.tsx';
import PermissionsPage from './pages/PermissionsPage';
import PolicyPage from './pages/PolicyPage.tsx';
import ProgramPage from './pages/ProgramPage';
import RegisterPage from './pages/RegisterPage';
import Room from './pages/Room';
import TermsPage from './pages/TermsPage.tsx';
import { ChatRoomNotificationSocket } from './sockets/MessengerSockets';
import { socket } from './sockets/socket';
import {
  delMessage,
  incUnreaded,
  pushMessage,
  removeReaction,
  setMessageReaded,
  setReaction,
  setUserOnlineStatus,
} from './store/reducers/MessengerSlice';
import { getCounters } from './store/reducers/PermissionsSlice.ts';
import { initLanguage } from './store/reducers/TranslateSlice.ts';
import { checkAuth, userSlice } from './store/reducers/UserSlice';
import { saveTokenFCM } from './utils/fcms.ts';
import { isUserDirector } from './utils/userRoles.ts';
import RequireNotDebtorStudent from './components/Auth/RequireNotDebtorStudent.tsx';
import { IMessage, IMessageUpdate } from './models/IMessage.ts';
import TextsPage from './pages/TextsPage/TextsPage.tsx';
import MyNotificationsPage from './pages/MyNotificationsPage/MyNotificationsPage.tsx';
import MyEstimatesPage from './pages/MyEstimatesPage/MyEstimatesPage.tsx';

const IndexPage = React.lazy(() => import('./pages/IndexPage'));

const UserCabinetPage = React.lazy(() => import('./pages/UserCabinetPage'));
const AddHomeworkPage = React.lazy(
  () => import('./pages/Homework/AddHomeworkPage'),
);
const HomeworksPage = React.lazy(
  () => import('./pages/Homework/HomeworksPage'),
);
const HomeworkPage = React.lazy(() => import('./pages/Homework/HomeworkPage'));
const HomeworksCheckPage = React.lazy(
  () => import('./pages/MyGroups/HomeworksCheckPage'),
);
const HomeworkCheckPage = React.lazy(
  () => import('./pages/MyGroups/HomeworkCheckPage'),
);
const VideoPage = React.lazy(() => import('./pages/Video/VideoPage'));
const VideoListPage = React.lazy(() => import('./pages/Video/VideoListPage'));
const FAQTrainersPage = React.lazy(() => import('./pages/FAQTrainersPage'));
const CreateTestLesson = React.lazy(
  () => import('./pages/TestLesson/CreateTestLesson'),
);
const TestLesson = React.lazy(() => import('./pages/TestLesson/TestLesson'));
const GroupwaitingPage = React.lazy(() => import('./pages/GroupwaitingPage'));
const GroupwaitingArchivePage = React.lazy(
  () => import('./pages/GroupwaitingArchivePage'),
);

function App() {
  const { isLoading, user, isAuth } = useAppSelector(
    (state) => state.UserSlice,
  );
  const countersRecived = useAppSelector(
    (state) => state.PermissionsSlice.countersRecived,
  );
  const { storeLoad } = userSlice.actions;
  const dispatch = useAppDispatch();
  const searchParams = new URLSearchParams(window.location.search);
  const tokenFCM = searchParams.get('token_fcm') || searchParams.get('fcm_token');

  useEffect(() => {
    dispatch(initLanguage());
  }, [isAuth, dispatch]);

  useEffect(() => {
    if (tokenFCM) {
      localStorage.setItem('tokenFCM', tokenFCM);
      saveTokenFCM(tokenFCM).catch((error) => console.error(error));
    }
  }, [tokenFCM]);

  useEffect(() => {
    const CheckLogin = async () => {
      if (localStorage.getItem('token')) {
        await dispatch(checkAuth());
      } else {
        dispatch(storeLoad());
      }
    };
    CheckLogin().catch(console.error);
  }, [dispatch, storeLoad]);

  useEffect(() => {
    if (user && isUserDirector(user.role) && !countersRecived) {
      void dispatch(getCounters());
    }
  }, [user, countersRecived]);

  useEffect(() => {
    if (user._id) {
      ChatRoomNotificationSocket(user._id);
    }
  }, [user._id])

  useEffect(() => {
    if (user._id) {
      const reciveHandler = async (data: { to: { _id: string } }) => {
        dispatch(incUnreaded());
        // dispatch(updateChat(data));
  
        const audio = new Audio('/message.wav');
        if (
          !user.dialog_types?.find(
            (type) => type.dialog === data.to._id && type.name === 'archive',
          )
        ) {
          await audio.play();
        }
      };
  
      socket.on('message:recive', (data: IMessageUpdate) => {
        if (!data.usersToSend || data.usersToSend.length === 0 || data.usersToSend.includes(user._id)) {
          dispatch(pushMessage({ msg: data }));
        }
      });
      socket.on('notification:recive', reciveHandler);
      socket.on('message:delete_recive', (data) => {
        dispatch(delMessage(data));
      });
      socket.on('message:set_reaction', ({ msg, reaction }: {msg: IMessage, reaction: { from: string, emoji: string}}) => {
        if (user._id !== reaction.from) {
          void dispatch(setReaction({
            msgId: msg._id,
            from: reaction.from,
            reaction: reaction.emoji
          }));
        }
      });
      socket.on('message:remove_reaction', ({ msg, reaction }: {msg: IMessage, reaction: { from: string, emoji: string}}) => {
        if (user._id !== reaction.from) {
          void dispatch(removeReaction({
            msgId: msg._id,
            from: reaction.from,
            emoji: reaction.emoji
          }));
        }
      });
      socket.on('user:close_access', () => {
        window.location.reload();
      });
      socket.on('user:connected', (id: string) => {
        dispatch(setUserOnlineStatus({ id, isOnline: true }));
      });
      socket.on('user:disconnected', (id: string) => {
        dispatch(setUserOnlineStatus({ id, isOnline: false }));
      });
      socket.on('chat:message_readed', ({ msgId, userid}: { msgId: string, userid:string}) => {
        dispatch(setMessageReaded({userid, msgId}));
      })
      return () => {
        socket.off('notification:recive', reciveHandler);
      };
    }
  }, [user._id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isLoading) {
    return (
      <>
        <Routes>
          <Route
            path="/фффф"
            element={
              <RequireAuth>
                <LayoutAdaptive>
                  <Suspense>
                    <IndexPage />
                  </Suspense>
                </LayoutAdaptive>
              </RequireAuth>
            }
          />
          <Route
            path="/mygroups"
            element={
              <RequireRole roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'TRANER', 'ADMIN']}>
                <LayoutAdaptive>
                  <MyGroups />
                </LayoutAdaptive>
              </RequireRole>
            }
          />
          {/* <Route
            path="/mycomments"
            element={
              <RequireRole roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'TRANER', 'ADMIN']}>
                <LayoutAdaptive>
                  <MyComments />
                </LayoutAdaptive>
              </RequireRole>
            }
          /> */}
          <Route
            path="/comments"
            element={
              <RequireRole
                roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'TRANERMETODIST', 'ADMIN']}
              >
                <LayoutAdaptive>
                  <Comments />
                </LayoutAdaptive>
              </RequireRole>
            }
          />
          <Route
            path="/group/:groupId"
            element={
              <RequireAuth>
                <LayoutAdaptive>
                  <Group />
                </LayoutAdaptive>
              </RequireAuth>
            }
          />
          <Route
            path="/group/:groupId/program"
            element={
              <RequireRole roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'ADMIN', 'TRANER']}>
                <LayoutAdaptive>
                  <ProgramPage />
                </LayoutAdaptive>
              </RequireRole>
            }
          />
          <Route
            path="/group/:groupId/online-lesson"
            element={
              <RequireAuth>
                <LayoutMessenger>
                  <OnlineLesson />
                </LayoutMessenger>
              </RequireAuth>
            }
          />
          
          <Route
            path="/group/:groupId/history"
            element={
              <RequireRole roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'ADMIN', 'TRANER']}>
                <LayoutAdaptive>
                  <HistoryPage />
                </LayoutAdaptive>
              </RequireRole>
            }
          />
          <Route
            path="/group/:groupId/description"
            element={
              <RequireRole roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'ADMIN', 'TRANER']}>
                <LayoutAdaptive>
                  <DescriptionPage />
                </LayoutAdaptive>
              </RequireRole>
            }
          />
          <Route
            path="/group/:groupId/homework/add"
            element={
              <RequireRole roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'TRANER']}>
                <LayoutAdaptive>
                  <Suspense>
                    <AddHomeworkPage />
                  </Suspense>
                </LayoutAdaptive>
              </RequireRole>
            }
          />
          <Route
            path="/group/:groupId/homework/edit/:homeworkId"
            element={
              <RequireRole roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'TRANER']}>
                <LayoutAdaptive>
                  <Suspense>
                    <AddHomeworkPage />
                  </Suspense>
                </LayoutAdaptive>
              </RequireRole>
            }
          />
          <Route
            path="/texts"
            element={
              <RequireRole roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR']}>
                <LayoutAdaptive>
                  <Suspense>
                    <TextsPage />
                  </Suspense>
                </LayoutAdaptive>
              </RequireRole>
            }
          />
          <Route
            path="/group/:groupId/homework"
            element={
              <RequireRole roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'TRANER']}>
                <LayoutAdaptive>
                  <Suspense>
                    <HomeworksCheckPage />
                  </Suspense>
                </LayoutAdaptive>
              </RequireRole>
            }
          />
          <Route
            path="/group/:groupId/homework/:homeworkId"
            element={
              <RequireRole roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'TRANER']}>
                <LayoutAdaptive>
                  <Suspense>
                    <HomeworkCheckPage />
                  </Suspense>
                </LayoutAdaptive>
              </RequireRole>
            }
          />
          <Route
            path="/homework"
            element={
              <RequireNotDebtorStudent>
                <RequireRole
                  roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'TRANERMETODIST', 'STUDENT', 'TESTUSER']}
                >
                  <LayoutAdaptive>
                    <Suspense>
                      <HomeworksPage />
                    </Suspense>
                  </LayoutAdaptive>
                </RequireRole>
              </RequireNotDebtorStudent>
            }
          />
          <Route
            path="/homework/:groupId"
            element={
              <RequireNotDebtorStudent>
                <RequireRole
                  roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'TRANERMETODIST', 'STUDENT', 'TESTUSER']}
                >
                  <LayoutAdaptive closedmenu={true}>
                    <Suspense>
                      <HomeworkPage />
                    </Suspense>
                  </LayoutAdaptive>
                </RequireRole>
              </RequireNotDebtorStudent>
            }
          />
          <Route
            path="/video"
            element={
              <RequireRole
                roles={['NEWUSER', 
                  'STUDENT',
                  'DIRECTOR',
                  'ZDIRECTOR',
                  'TRANER',
                  'TRANERMETODIST',
                ]}
              >
                <RequireNotDebtorStudent>
                  <RequireNotArchivedStudent>
                    <LayoutAdaptive>
                      <Suspense>
                        <VideoPage />
                      </Suspense>
                    </LayoutAdaptive>
                  </RequireNotArchivedStudent>
                </RequireNotDebtorStudent>
              </RequireRole>
            }
          />
          <Route
            path="/video/:groupId"
            element={
              <RequireRole
                roles={['NEWUSER', 
                  'STUDENT',
                  'DIRECTOR',
                  'ZDIRECTOR',
                  'TRANER',
                  'TRANERMETODIST',
                ]}
              >
                <RequireNotArchivedStudent>
                  <LayoutAdaptive>
                    <Suspense>
                      <VideoListPage />
                    </Suspense>
                  </LayoutAdaptive>
                </RequireNotArchivedStudent>
              </RequireRole>
            }
          />

          <Route
            path="/lessons"
            element={
              <RequireRole
                roles={['NEWUSER', 'STUDENT', 'DIRECTOR', 'ZDIRECTOR', 'TRANERMETODIST']}
              >
                <RequireNotDebtorStudent>
                  <RequireNotArchivedStudent>
                    <LayoutAdaptive>
                      <Lessons />
                    </LayoutAdaptive>
                  </RequireNotArchivedStudent>
                </RequireNotDebtorStudent>
              </RequireRole>
            }
          />
          <Route
            path="/lesson/:groupId"
            element={
              <RequireRole
                roles={['NEWUSER', 'STUDENT', 'DIRECTOR', 'ZDIRECTOR', 'TRANERMETODIST']}
              >
                <RequireNotDebtorStudent>
                  <RequireNotArchivedStudent>
                    <LayoutAdaptive closedmenu={true}>
                      <Lesson />
                    </LayoutAdaptive>
                  </RequireNotArchivedStudent>
                </RequireNotDebtorStudent>
              </RequireRole>
            }
          />
          <Route
            path="/permissions"
            element={
              <RequireRole roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'ADMIN']}>
                <LayoutAdaptive>
                  <PermissionsPage />
                </LayoutAdaptive>
              </RequireRole>
            }
          />
          <Route
            path="/program"
            element={
              <RequireRole roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR']}>
                <LayoutAdaptive>
                  <ProgramPage />
                </LayoutAdaptive>
              </RequireRole>
            }
          />
          <Route
            path="/login"
            element={
              <OnlyUnauthorized>
                <LoginPage />
              </OnlyUnauthorized>
            }
          />
          <Route
            path="/register"
            element={
              <OnlyUnauthorized>
                <RegisterPage />
              </OnlyUnauthorized>
            }
          />
          <Route
            path="/messenger"
            element={
              <RequireAuth>
                <RequireNotArchivedStudent>
                  <LayoutMessenger>
                    <MessengerPage />
                  </LayoutMessenger>
                </RequireNotArchivedStudent>
              </RequireAuth>
            }
          />
          <Route
            path="/messenger/chat/:userid"
            element={
              <RequireAuth>
                <RequireNotArchivedStudent>
                  <LayoutMessenger>
                    <ChatPage />
                  </LayoutMessenger>
                </RequireNotArchivedStudent>
              </RequireAuth>
            }
          />
          <Route path="/room/:roomID" element={<Room />} />
          <Route
            path="/balance"
            element={
              <RequireRole roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutAdaptive>
                  <BalancePage />
                </LayoutAdaptive>
              </RequireRole>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <LayoutAdaptive>
                  <CabinetPage />
                </LayoutAdaptive>
              </RequireAuth>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <RequireAuth>
                <LayoutAdaptive>
                  <Suspense>
                    <UserCabinetPage />
                  </Suspense>
                </LayoutAdaptive>
              </RequireAuth>
            }
          />

          <Route
            path="/testlesson"
            element={
              <RequireRole roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'TRANERMETODIST']}>
                <LayoutAdaptive>
                  <Suspense>
                    <CreateTestLesson />
                  </Suspense>
                </LayoutAdaptive>
              </RequireRole>
            }
          />
          <Route
            path="/testlesson/:groupId"
            element={
              <LayoutAdaptive>
                <Suspense>
                  <TestLesson />
                </Suspense>
              </LayoutAdaptive>
            }
          />

          <Route
            path="/session/:groupId"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST']}>
                  <LayoutAdaptive>
                    <CreateSessionPage />
                  </LayoutAdaptive>
                </RequireRole>
              </RequireAuth>
            }
          />
          <Route
            path="/session"
            element={
              <RequireAuth>
                <LayoutAdaptive>
                  <CreateSeansDirectorPage />
                </LayoutAdaptive>
              </RequireAuth>
            }
          />
           <Route
            path="/Tournament/"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <Tournament/>
                </LayoutTournament>
                </RequireRole>
              </RequireAuth>
            }
          /><Route
          path="/TournamentPlayersList/"
          element={
            <RequireAuth>
              <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
              <LayoutTournament>
                <TournamentPlayersList  />
              </LayoutTournament>
              </RequireRole>
            </RequireAuth>
          }
        />
        <Route
            path="/Tournament/:groupId/Swiss"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <CreateTournamentSwiss/>
                </LayoutTournament></RequireRole>
              </RequireAuth>
            }
          />
           <Route
            path="/Tournament/:groupId/intergroup"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <CreateTournamentInterGroup/>
                </LayoutTournament></RequireRole>
              </RequireAuth>
            }
          />
          <Route
            path="/Tournament/:groupId/interschool"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <CreateTournamentInterSchool/>
                </LayoutTournament></RequireRole>
              </RequireAuth>
            }
          />
                            <Route
            path="/Tournament/:groupId/area/Finish"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <TournamentFinish/>
                </LayoutTournament></RequireRole>
              </RequireAuth>
            }
          />
            <Route
            path="/Tournament/:groupId/area/tostart"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <TouranamentStart/>
                </LayoutTournament></RequireRole>
              </RequireAuth>
            }
          />
                      <Route
            path="/Tournament/:groupId/area/during"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <TournamentDuring/>
                </LayoutTournament></RequireRole>
              </RequireAuth>
            }
          />
                      <Route
            path="/Tournament/:groupId/area/beginning"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <TournamentBeginning/>
                </LayoutTournament></RequireRole>
              </RequireAuth>
            }
          />
                   <Route
            path="/Tournament/:groupId/interschool/Finish"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <TournamentFinish/>
                </LayoutTournament></RequireRole>
              </RequireAuth>
            }
          />
            <Route
            path="/Tournament/:groupId/interschool/tostart"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <TouranamentStart/>
                </LayoutTournament></RequireRole>
              </RequireAuth>
            }
          />
                      <Route
            path="/Tournament/:groupId/interschool/during"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <TournamentDuring/>
                </LayoutTournament></RequireRole>
              </RequireAuth>
            }
          />
                      <Route
            path="/Tournament/:groupId/interschool/beginning"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <TournamentBeginning/>
                </LayoutTournament></RequireRole>
              </RequireAuth>
            }
          />
          <Route
            path="/Tournament/:groupId/intergroup/Finish"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <TournamentFinish/>
                </LayoutTournament></RequireRole>
              </RequireAuth>
            }
          />
            <Route
            path="/Tournament/:groupId/intergroup/tostart"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <TouranamentStart/>
                </LayoutTournament></RequireRole>
              </RequireAuth>
            }
          />
                      <Route
            path="/Tournament/:groupId/intergroup/during"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <TournamentDuring/>
                </LayoutTournament></RequireRole>
              </RequireAuth>
            }
          />
                      <Route
            path="/Tournament/:groupId/intergroup/beginning"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <TournamentBeginning/>
                </LayoutTournament></RequireRole>
              </RequireAuth>
            }
          />
                  <Route
            path="/Tournament/:groupId/Swiss/Finish"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <TournamentFinish/>
                </LayoutTournament></RequireRole>
              </RequireAuth>
            }
          />
            <Route
            path="/Tournament/:groupId/Swiss/tostart"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <TouranamentStart/>
                </LayoutTournament>
                </RequireRole>
              </RequireAuth>
            }
          />
                      <Route
            path="/Tournament/:groupId/Swiss/during"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <TournamentDuring/>
                </LayoutTournament></RequireRole>
              </RequireAuth>
            }
          />
                      <Route
            path="/Tournament/:groupId/Swiss/beginning"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                <LayoutTournament>
                  <TournamentBeginning/>
                </LayoutTournament>
                </RequireRole>
              </RequireAuth>
            }
          />
           <Route
            path="/Tournament/:groupId"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                  <LayoutTournament>
                    <CreateTournament />
                  </LayoutTournament>
                </RequireRole>
              </RequireAuth>
            }
          />
          <Route
            path="/Tournament/:groupId/area"
            element={
              <RequireAuth>
                <RequireRole roles={['NEWUSER', 'TRANER', 'TRANERMETODIST', 'DIRECTOR', 'ZDIRECTOR', 'STUDENT']}>
                  <LayoutTournament>
                    <CreateTournamentArea />
                  </LayoutTournament>
                </RequireRole>
              </RequireAuth>
            }
          />
          <Route
            path="/session/:groupId/create"
            element={
              <RequireAuth>
                <RequireRole
                  roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'TRANERMETODIST', 'TRANER']}
                >
                  <LayoutAdaptive>
                    <CreatNewSessionPage />
                  </LayoutAdaptive>
                </RequireRole>
              </RequireAuth>
            }
          />
          <Route
            path="/session/create"
            element={
              <RequireAuth>
                <RequireRole
                  roles={['NEWUSER', 'TRANERMETODIST', 'TRANER', 'DIRECTOR', 'ZDIRECTOR']}
                >
                  <LayoutAdaptive>
                    <CreatNewSessionPage />
                  </LayoutAdaptive>
                </RequireRole>
              </RequireAuth>
            }
          />
          <Route
            path="/session/table"
            element={
              <RequireAuth>
                <RequireRole
                  roles={['NEWUSER', 
                    'DIRECTOR',
                    'ZDIRECTOR',
                    'TRANERMETODIST',
                    'TRANER',
                    'STUDENT',
                  ]}
                >
                  <LayoutAdaptive>
                    <SessionTablePage />
                  </LayoutAdaptive>
                </RequireRole>
              </RequireAuth>
            }
          />
          <Route
            path="/session/tostart/:seansId"
            element={
              <RequireAuth>
                <RequireRole
                  roles={['NEWUSER', 
                    'DIRECTOR',
                    'ZDIRECTOR',
                    'TRANERMETODIST',
                    'TRANER',
                    'STUDENT',
                  ]}
                >
                  <LayoutAdaptive>
                    <SeansToStartPage />
                  </LayoutAdaptive>
                </RequireRole>
              </RequireAuth>
            }
          />
          <Route
            path="/session/:seansId/game/:userId"
            element={
              <RequireAuth>
                <RequireRole
                  roles={['NEWUSER', 
                    'DIRECTOR',
                    'ZDIRECTOR',
                    'TRANERMETODIST',
                    'TRANER',
                    'STUDENT',
                  ]}
                >
                  <LayoutAdaptive>
                    <SessionGamePage />
                  </LayoutAdaptive>
                </RequireRole>
              </RequireAuth>
            }
          />
          <Route
            path="/session/:seansId/game/s"
            element={
              <RequireAuth>
                <RequireRole
                  roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'TRANERMETODIST', 'TRANER', 'STUDENT']}
                >
                  <LayoutAdaptive>
                    <SessionGamesPage />
                  </LayoutAdaptive>
                </RequireRole>
              </RequireAuth>
            }
          />

          <Route
            path="/faq"
            element={
              <RequireRole
                roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'TRANERMETODIST', 'STUDENT']}
              >
                <LayoutAdaptive>
                  <Suspense>
                    <FAQAdaptive />
                  </Suspense>
                </LayoutAdaptive>
              </RequireRole>
            }
          />
          <Route
            path="/faqtrainers"
            element={
              <RequireRole roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'TRANER']}>
                <LayoutAdaptive>
                  <Suspense>
                    <FAQTrainersPage />
                  </Suspense>
                </LayoutAdaptive>
              </RequireRole>
            }
          />
          <Route
            path="/groupwaiting"
            element={
              <RequireRole roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'ADMIN']}>
                <LayoutAdaptive>
                  <Suspense>
                    <GroupwaitingPage />
                  </Suspense>
                </LayoutAdaptive>
              </RequireRole>
            }
          />
          <Route
            path="/groupwaiting/archive"
            element={
              <RequireRole roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'ADMIN']}>
                <LayoutAdaptive>
                  <Suspense>
                    <GroupwaitingArchivePage />
                  </Suspense>
                </LayoutAdaptive>
              </RequireRole>
            }
          />
          <Route
            path="/mynotifications"
            element={
              <LayoutAdaptive>
                <Suspense>
                  <MyNotificationsPage />
                </Suspense>
              </LayoutAdaptive>
            }
          />
          <Route
            path="/myestimates"
            element={
              <RequireRole roles={['NEWUSER', 'DIRECTOR', 'ZDIRECTOR', 'ADMIN', 'TRANERMETODIST', 'TRANER', 'STUDENT']}>
                <LayoutAdaptive>
                  <Suspense>
                    <MyEstimatesPage />
                  </Suspense>
                </LayoutAdaptive>
              </RequireRole>
            }
          />
          <Route
            path="/policy"
            element={
              <Suspense>
                <PolicyPage />
              </Suspense>
            }
          />
          <Route
            path="/terms"
            element={
              <Suspense>
                <TermsPage />
              </Suspense>
            }
          />
          <Route
            path="/forbidden"
            element={
              <Suspense>
                <ForbiddenPage />
              </Suspense>
            }
          />
        </Routes>
        <EditRequestsResults />
        {/* <TeamsGameInfoModal active={true} setActive={() => {}}/> */}
      </>
    );
  }
}

export default App;
