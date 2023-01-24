import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { errorPage, events, myEvents, URL } from '../../utils/constants';
import { currentEventSelector } from '../../store/eventsData/eventsDataSelectors';
import { setCurrentPage } from '../../store/currentPage/currentPageSlice';
import { timeToRender } from '../../utils/functions';
import { EventData } from '../../interfaces/eventData';

interface ModalDeleteEventProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  event: EventData;
  date: string;
}

function ModalDeleteEvent({ active, setActive, event, date }: ModalDeleteEventProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentEvent = useSelector(currentEventSelector);

  const deleteEvent = () => {
    fetch(URL + 'delete_event', {
      method: 'POST',
      body: JSON.stringify({
        event_id: currentEvent,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === -1) {
          console.error('Data Base Error');
          navigate(`/${errorPage}`);
        } else if (data) {
          dispatch(setCurrentPage(myEvents));
          navigate(`/${events}`);
        }
      });
  };

  return (
    <div className={`modal ${active ? 'active' : ''}`} onClick={() => setActive(false)}>
      <div
        className={`modalContent ${
          active ? 'active' : ''
        } d-flex flex-column justify-content-center`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-center rtl">
          האם אתה בודאות רוצה לבטל את מקומך בהקפצה {event.spot} {date}{' '}
          {timeToRender(event.time_start)} ?
        </div>
        <div className="d-flex flex-row justify-content-around mt-5">
          <button className="buttonSmall" onClick={() => deleteEvent()}>
            בטל
          </button>
          <button
            className="backgroundBlue buttonSmall"
            onClick={() => {
              setActive(false);
            }}
          >
            חזור
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteEvent;
