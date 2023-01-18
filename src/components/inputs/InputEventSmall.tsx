import { useDispatch, useSelector } from 'react-redux';
import {
  currentEventSelector,
  eventsListSelector,
} from '../../store/eventsData/eventsDataSelectors';
import { dateSelector } from '../../store/createEventData/createEventDataSelectors';
import {
  setDate,
  setDateEnd,
  setMaxPlaces,
  setMinPlaces,
} from '../../store/createEventData/createEventDataSlice';
import { EventData, eventDataInitialState } from '../../interfaces/eventData';

interface InputEventSmallProps {
  type: string;
  explanation: string;
  content: string;
  name?: string;
  empty?: boolean;
}

function InputEventSmall({ type, name, explanation, content, empty }: InputEventSmallProps) {
  const dispatch = useDispatch();
  const eventsList = useSelector(eventsListSelector);
  const date = useSelector(dateSelector);
  const currentEvent = useSelector(currentEventSelector);
  let eventCurrent: EventData = eventDataInitialState;

  if (eventsList.length) {
    const filteredEvent = eventsList.find((value) => value.event_id === currentEvent);
    eventCurrent = filteredEvent ? filteredEvent : eventDataInitialState;
  }

  function setTime(event: string, start: boolean) {
    if (content === 'timeStartEdit' || content === 'timeEndEdit') {
      const timeArray = event.split(':');
      const newDate = new Date(eventCurrent.time_start);
      newDate.setHours(+timeArray[0]);
      newDate.setMinutes(+timeArray[1]);
      start ? dispatch(setDate(newDate)) : dispatch(setDateEnd(newDate));
    } else if (date) {
      const timeArray = event.split(':');
      const newDate = new Date(date);
      newDate.setHours(+timeArray[0]);
      newDate.setMinutes(+timeArray[1]);
      start ? dispatch(setDate(newDate)) : dispatch(setDateEnd(newDate));
    }
  }

  const typeDefinition = (event: string) => {
    if (content === 'maximum') {
      dispatch(setMaxPlaces(event));
    } else if (content === 'minimum') {
      dispatch(setMinPlaces(event));
    } else if (content === 'timeStart') {
      setTime(event, true);
    } else if (content === 'timeEnd') {
      setTime(event, false);
    } else if (content === 'timeStartEdit') {
      setTime(event, true);
    } else if (content === 'timeEndEdit') {
      setTime(event, false);
    }
  };

  return (
    <div className="col-6 d-flex flex-column align-items-center">
      <input
        className={`inputSignIn inputSmall text-end ltr ${empty ? 'inputWrong' : ''}`}
        type={type}
        placeholder={name}
        onChange={(event) => {
          typeDefinition(event.target.value);
        }}
      />
      <div className="smallText colorGrey text-end w-75">{explanation}</div>
    </div>
  );
}

export default InputEventSmall;
