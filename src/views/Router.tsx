import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { setUserId } from '../store/userData/userDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { userAdminSelector, userIdSelector } from '../store/userData/userDataSelectors';
import SignIn from './auth/SignIn';
import { aboutEvent, events, registration } from '../utils/constants';
import Registration from './auth/Registration';
import Footer from '../components/footer/Footer';
import PageConstructor from './PageConstructor';
import AboutEvent from './events/components/aboutEvent';

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
    </Routes>
  );
}

export default Router;
