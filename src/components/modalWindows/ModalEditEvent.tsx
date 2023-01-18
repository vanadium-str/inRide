import React from 'react';
import { useNavigate } from 'react-router-dom';
import { errorPage, myEvents, URL } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  dateEndSelector,
  dateSelector,
} from '../../store/createEventData/createEventDataSelectors';
import { currentEventSelector } from '../../store/eventsData/eventsDataSelectors';
import { setCurrentPage } from '../../store/currentPage/currentPageSlice';
import InputEventSmall from '../inputs/InputEventSmall';

interface ModalEditEventProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalEditEvent({ active, setActive }: ModalEditEventProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const date = useSelector(dateSelector);
  const dateEnd = useSelector(dateEndSelector);
  const currentEvent = useSelector(currentEventSelector);

  const editTime = () => {
    fetch(URL + 'time_update', {
      method: 'PUT',
      body: JSON.stringify({
        event_id: currentEvent,
        time_start: date,
        time_end: dateEnd,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 0) {
          setActive(false);
          dispatch(setCurrentPage(myEvents));
        } else if (data.status === 1) {
          console.error('Data Base error');
          setActive(false);
          navigate(`/${errorPage}`);
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
        <div className="d-flex justify-content-center mb-3">:בחרו זמן חדש</div>
        <div className="d-flex flex-row justify-content-between mb-5">
          <InputEventSmall type={'time'} explanation={'זמן סיום'} content={'timeEndEdit'} />
          <InputEventSmall type={'time'} explanation={'זמן התחלה'} content={'timeStartEdit'} />
        </div>
        <div className="d-flex flex-row justify-content-around">
          <button className="buttonSmall" onClick={() => editTime()}>
            שמור
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

export default ModalEditEvent;
