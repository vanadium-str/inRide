import { useDispatch, useSelector } from 'react-redux';
import {
  currentEventSelector,
  eventsListSelector,
} from '../../store/eventsData/eventsDataSelectors';
import ButtonEvents from '../../components/buttons/ButtonEvents';
import { joinSuccessDate } from '../../utils/functions';
import { eventDataInitialState } from '../../interfaces/eventData';
import { useNavigate } from 'react-router-dom';
import { events, myRuns } from '../../utils/constants';
import { setCurrentPage } from '../../store/currentPage/currentPageSlice';

function JoinSuccess() {
  const eventsList = useSelector(eventsListSelector);
  const currentEvent = useSelector(currentEventSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredEvent = eventsList.find((value) => value.event_id === currentEvent);
  const event = filteredEvent ? filteredEvent : eventDataInitialState;

  const toEventsPage = () => {
    dispatch(setCurrentPage(myRuns));
    navigate(`/${events}`);
  };

  return (
    <div className="container pe-3 mt-2">
      <div className="row">
        <div className="col-12 pageTitle mb-5">נרשמת להקפצה ב{event.spot} בהצלחה</div>
        <div className="text-end ps-4">
          <p>ההקפצה יתקיים ביום {joinSuccessDate(event.time_start)}</p>
          <p>במקרה מתקיים שינוי תקבלו הודעה למייל ולנייד</p>
          <p>מומלץ להגיע למקום רבע שעה לפני זמן התחלה. אם אתם מאחרים צרו קשר עם המוביל מראש</p>
        </div>
        <ButtonEvents name={'הקפצות שלי'} handleClick={toEventsPage} />
      </div>
    </div>
  );
}

export default JoinSuccess;
