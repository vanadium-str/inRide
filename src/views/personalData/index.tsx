import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from '../../assets/images/Back.svg';
import { editPersonalData, events, URL } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { userDataSelector, userIdSelector } from '../../store/userData/userDataSelectors';
import { setUserData, setUserId } from '../../store/userData/userDataSlice';

function PersonalData() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const userData = useSelector(userDataSelector);

  useEffect(() => {
    fetch(URL + 'user_info', {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(setUserData(data));
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mediumTitle mt-2">
          {userData.name}{' '}
          <img
            src={arrow}
            className="cursor"
            onClick={() => {
              navigate(`/${events}`);
            }}
          />
        </div>
        <div className="col-12 mt-2 pe-4 text-end fontSizeMedium">{userData.phone}</div>
        <div className="col-12 mt-2 mb-5 pe-4 text-end fontSizeMedium">{userData.email}</div>
        <div className="col-12 mt-2 mb-2 pe-4 text-end fontSizeMedium">
          <b> כניסה אחרונה</b> {userData.last_login}
        </div>
        <div className="col-12 mt-2 mb-5 pe-4 text-end fontSizeMedium">
          <b>הקפצות שביקרתי</b> {userData.runs_visited}
        </div>
      </div>
      <div className="row pe-4">
        <div
          className="col-12 text-end colorBlue mb-2 cursor fontSizeMedium"
          onClick={() => navigate(`/${editPersonalData}`)}
        >
          שינוי סיסמה
        </div>
        <div
          className="col-12 text-end colorRed cursor fontSizeMedium"
          onClick={() => {
            dispatch(setUserId(-1));
            window.localStorage.setItem('userId', '-1');
            navigate(`/`);
          }}
        >
          יציאה
        </div>
      </div>
    </div>
  );
}

export default PersonalData;
