import { useDispatch, useSelector } from 'react-redux';
import { currentEventSelector, eventsListSelector } from '../../store/eventsData/eventsDataSelectors';
import { eventDataInitialState } from '../../interfaces/eventData';
import ButtonEvents from '../../components/buttons/ButtonEvents';
import { useNavigate } from 'react-router-dom';
import { events, myRuns } from '../../utils/constants';
import { setCurrentPage } from '../../store/currentPage/currentPageSlice';

function WaitingSuccess() {

    const eventsList = useSelector(eventsListSelector);
    const currentEvent = useSelector(currentEventSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const filteredEvent = eventsList.find((value) => value.event_id === currentEvent);
    const event = filteredEvent ? filteredEvent : eventDataInitialState;

    const toEventsPage = () => {
        dispatch(setCurrentPage(myRuns));
        navigate(`/${events}`);
    }

    return (
        <div className='container pe-3 mt-2'>
            <div className='row'>
                <div className='col-12 pageTitle mb-5'>
                    נרשמת להמתנה להקפמה ב{event.spot}
                </div>
                <div className='text-end ps-4'>
                    <p>
                        אם מישהו
                    </p>
                    <p>
                        יבטל תקבלו מקום והודעה לנייד ולמייל
                    </p>
                    <p>
                        נכון לעכשיו - {event.waiting} אנשים ברשימת המתנה
                    </p>
                </div>
                <ButtonEvents name={'הקפצות שלי'} handleClick={toEventsPage} />
            </div>
        </div>
    );
}
    
export default WaitingSuccess;