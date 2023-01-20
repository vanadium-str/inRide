import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { setUserId } from '../store/userData/userDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { userAdminSelector, userIdSelector } from '../store/userData/userDataSelectors';
import SignIn from './auth/SignIn';
import {
  aboutEvent,
  alreadyJoin,
  editPersonalData,
  errorPage,
  events,
  joinFailure,
  joinSuccess,
  personalArea,
  registration,
  unsubscribeSuccess,
  waitingList,
} from '../utils/constants';
import Registration from './auth/Registration';
import Footer from '../components/footer/Footer';
import PageConstructor from './PageConstructor';
import AboutEvent from './events/components/aboutEvent';
import JoinSuccess from './informationViews/JoinSucess';
import JoinFailure from './informationViews/JoinFailure';
import WaitingSuccess from './informationViews/WaitingSuccess';
import UnsubscribeSuccess from './informationViews/UnsubscribeSuccess';
import AlreadyJoin from './informationViews/AlreadyJoin';
import ErrorPage from './informationViews/ErrorPage';
import PersonalData from './personalData';
import EditPersonalData from './personalData/EditPersonalData';

function Router() {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const admin = useSelector(userAdminSelector);

  useEffect(() => {
    dispatch(setUserId(window.localStorage.getItem('userId')));
    console.log(userId);
  }, []);

  return (
    <Routes>
      <Route path={`/`} element={<SignIn />} />
      <Route path={`/${registration}`} element={<Registration />} />
      <Route path={`/${personalArea}`} element={userId === -1 ? <SignIn/> : <PersonalData/>} />
      <Route path={`/${editPersonalData}`} element={userId === -1 ? <SignIn/> : <EditPersonalData/>} />
      <Route
        path={`/${events}`}
        element={
          userId === -1 ? (
            <SignIn />
          ) : (
            <div>
              <PageConstructor />
              <Footer isAdmin={admin} />
            </div>
          )
        }
      />
      <Route path={`/${aboutEvent}/:idEvent`} element={<AboutEvent />} />
      <Route path={`/${joinSuccess}`} element={<JoinSuccess />} />
      <Route path={`/${joinFailure}`} element={<JoinFailure />} />
      <Route path={`/${waitingList}`} element={<WaitingSuccess />} />
      <Route path={`/${unsubscribeSuccess}`} element={<UnsubscribeSuccess />} />
      <Route path={`/${alreadyJoin}`} element={<AlreadyJoin />} />
      <Route path={`/${errorPage}`} element={<ErrorPage />} />
    </Routes>
  );
}

export default Router;
