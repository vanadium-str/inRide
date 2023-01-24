import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorPage, events, myEvents, URL } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentEventSelector,
  eventsListSelector,
} from '../../store/eventsData/eventsDataSelectors';
import { setCurrentPage } from '../../store/currentPage/currentPageSlice';
import InputEventSmall from '../inputs/InputEventSmall';
import { EditEventFormElement } from '../../interfaces/editEventInterface';
import { editEventSchema } from '../../validation/EditEventValidation';
import { createDate } from '../../utils/functions';
import { EventData, eventDataInitialState } from '../../interfaces/eventData';

interface ModalEditEventProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalEditEvent({ active, setActive }: ModalEditEventProps) {
  const [isNotValid, setIsNotValid] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentEvent = useSelector(currentEventSelector);
  const eventsList = useSelector(eventsListSelector);
  let eventCurrent: EventData = eventDataInitialState;

  if (eventsList.length) {
    const filteredEvent = eventsList.find((value) => value.event_id === currentEvent);
    eventCurrent = filteredEvent ? filteredEvent : eventDataInitialState;
  }

  const handleEditEvent = (event: React.FormEvent<EditEventFormElement>) => {
    event.preventDefault();
    const formData = {
      timeStartEdit: event.currentTarget.elements.timeStartEdit.value,
      timeEndEdit: event.currentTarget.elements.timeEndEdit.value,
    };

    editEventSchema
      .validate(formData)
      .then((result) => {
        setIsNotValid('');
        editTime(
          createDate(eventCurrent.time_start, result.timeStartEdit),
          createDate(eventCurrent.time_start, result.timeEndEdit)
        );
      })
      .catch((error) => {
        setIsNotValid(error.errors[0]);
      });
  };

  const editTime = (dateStart: Date, dateEnd: Date) => {
    fetch(URL + 'time_update', {
      method: 'PUT',
      body: JSON.stringify({
        event_id: currentEvent,
        time_start: dateStart,
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
          navigate(`/${events}`);
        } else if (data.status === -1) {
          console.error('Data Base error');
          setActive(false);
          navigate(`/${errorPage}`);
        }
      });
  };

  return (
    <div className={`modal ${active ? 'active' : ''}`} onClick={() => setActive(false)}>
      <form
        className={`modalContent ${
          active ? 'active' : ''
        } d-flex flex-column justify-content-center`}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleEditEvent}
      >
        <div className="d-flex justify-content-center mb-3">:בחרו זמן חדש</div>
        <div className="d-flex mb-5">
          <InputEventSmall type={'time'} explanation={'זמן סיום'} id={'timeEndEdit'} left={true} />
          <InputEventSmall type={'time'} explanation={'זמן התחלה'} id={'timeStartEdit'} />
        </div>

        {isNotValid !== '' ? <p className="inputMessage">{isNotValid}</p> : <></>}
        <div className="d-flex flex-row justify-content-around">
          <button className="buttonSmall" type="submit">
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
      </form>
    </div>
  );
}

export default ModalEditEvent;
