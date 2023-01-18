import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { unsubscribeSuccess, URL } from '../../utils/constants';
import { userIdSelector } from '../../store/userData/userDataSelectors';
import { currentEventSelector } from '../../store/eventsData/eventsDataSelectors';

interface ModalUnsubscribeEventProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalUnsubscribe({ active, setActive }: ModalUnsubscribeEventProps) {
  const navigate = useNavigate();
  const userId = useSelector(userIdSelector);
  const currentEvent = useSelector(currentEventSelector);

  const unsubscribe = () => {
    fetch(URL + 'leave_event', {
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
          navigate(`/${unsubscribeSuccess}`);
        } else if (data.status === -1) {
          console.error('Data Base Error');
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
          אתה בטוח שתרצה לבטל מקום שלך בהקפצה?
        </div>
        <div className="d-flex flex-row justify-content-around mt-5">
          <button className="buttonSmall" onClick={() => unsubscribe()}>
            כן
          </button>
          <button
            className="backgroundBlue buttonSmall"
            onClick={() => {
              setActive(false);
            }}
          >
            לא
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalUnsubscribe;
