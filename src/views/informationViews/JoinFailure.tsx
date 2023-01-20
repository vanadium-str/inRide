import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  currentEventSelector,
  eventsListSelector,
} from '../../store/eventsData/eventsDataSelectors';
import ButtonEvents from '../../components/buttons/ButtonEvents';
import { setCurrentPage } from '../../store/currentPage/currentPageSlice';
import { URL, errorPage, events, waitingList } from '../../utils/constants';
import { eventDataInitialState } from '../../interfaces/eventData';
import { userIdSelector } from '../../store/userData/userDataSelectors';

function JoinFailure() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const eventsList = useSelector(eventsListSelector);
  const currentEvent = useSelector(currentEventSelector);
  const userId = useSelector(userIdSelector);

  const filteredEvent = eventsList.find((value) => value.event_id === currentEvent);
  const event = filteredEvent ? filteredEvent : eventDataInitialState;

  const joinWaiting = () => {
    fetch(URL + 'join_waiting', {
      method: 'POST',
      body: JSON.stringify({
        event_id: currentEvent,
        user_id: userId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 0) {
          navigate(`/${waitingList}`);
        } else if (data.status === 1) {
          // no free places
        } else if (data.status === -1) {
          console.error('Data Base Error');
          navigate(`/${errorPage}`);
        }
      });
  };

  return (
    <div className="container pe-3 mt-2">
      <div className="row">
        <div className="col-12 pageTitle mb-1">Oops</div>
        <div className="col-12 pageTitle mb-5">נגמרו מקומות בהקפצה</div>
        <div className="text-end ps-4">
          <p>את(ה) מוזמנ(ת) להירשם להמתנה. אם מישהו</p>
          <p>יבטל תקבלו מקום והודעה לנייד ולמייל</p>
          <p>נכון לעכשיו - {event.waiting} אנשים ברשימת המתנה</p>
        </div>
        <ButtonEvents name={'להירשם להמתנה'} handleClick={joinWaiting} />
        <div
          className="col-12 d-flex justify-content-center colorBlue cursor bottom"
          onClick={() => {
            dispatch(setCurrentPage(events));
            navigate(`/${events}`);
          }}
        >
          לבטל
        </div>
      </div>
    </div>
  );
}

export default JoinFailure;
