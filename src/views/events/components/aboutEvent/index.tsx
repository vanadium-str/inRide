import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TbCaravan, TbCheck, TbTrash } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { userAdminSelector, userIdSelector } from '../../../../store/userData/userDataSelectors';
import {
  currentEventSelector,
  eventsListSelector,
  myEventsSelector,
  myRunsSelector,
} from '../../../../store/eventsData/eventsDataSelectors';
import { currentPageSelector } from '../../../../store/currentPage/currentPageSelectors';
import {
  aboutEvent,
  alreadyJoin,
  errorPage,
  events,
  joinFailure,
  joinSuccess,
  myEvents,
  myRuns,
} from '../../../../utils/constants';
import { EventData, eventDataInitialState } from '../../../../interfaces/eventData';
import ButtonEvents from '../../../../components/buttons/ButtonEvents';
import { dateFormatting, dateTorender, timeToRender } from '../../../../utils/functions';
import HeaderEvents from '../../../../components/headers/HeaderEvents';
import AboutEventBlock from './AboutEventBlock';
import RidersList from './RidersList';
import ModalDeleteEvent from '../../../../components/modalWindows/ModalDeleteEvent';
import ModalUnsubscribe from '../../../../components/modalWindows/ModalUnsubscribe';
import ModalEditEvent from '../../../../components/modalWindows/ModalEditEvent';

function AboutEvent() {
  const [activeModalDeleteEvent, setActiveModalDeleteEvent] = useState(false);
  const [activeModalEditEvent, setActiveModalEditEvent] = useState(false);
  const [activeModalUnsubscribeEvent, setActiveModalUnsubscribeEvent] = useState(false);
  const [event, setEvent] = useState<EventData>(eventDataInitialState);
  const { idEvent } = useParams();
  const navigate = useNavigate();
  const admin = useSelector(userAdminSelector);
  const userId = useSelector(userIdSelector);
  const eventsList = useSelector(eventsListSelector);
  const myRunsList = useSelector(myRunsSelector);
  const myEventsList = useSelector(myEventsSelector);
  const currentPage = useSelector(currentPageSelector);
  const currentEvent = useSelector(currentEventSelector);

  let date: string[] = [];
  const vacancy = event.max_participants - event.booked;
  dateFormatting(date, event);

  useEffect(() => {
    let filteredEvent: EventData | undefined;
    if (currentPage === myEvents) {
      filteredEvent = filter(myEventsList);
    } else if (currentPage === myRuns) {
      filteredEvent = filter(myRunsList);
    } else if (currentPage === events) {
      filteredEvent = filter(eventsList);
    }
    setEvent(filteredEvent ? filteredEvent : eventDataInitialState);
  }, [currentPage]);

  const filter = (array: EventData[]) => {
    if (idEvent) {
      let id = parseInt(idEvent);
      let res = array.find((value) => value.event_id === id);
      return res;
    }
  };

  const joinEvent = () => {
    fetch(URL + 'join_event', {
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
          navigate(`/${joinSuccess}`);
        } else if (data.status === 1) {
          navigate(`/${joinFailure}`);
        } else if (data.status === 2) {
          navigate(`/${alreadyJoin}`);
        } else if (data.status === 3) {
          console.error('No such event');
          navigate(`/${errorPage}`);
        } else if (data.status === -1) {
          console.error('Data Base Error');
          navigate(`/${errorPage}`);
        }
      });
  };

  const handleModalEditEvent = () => {
    setActiveModalEditEvent(true);
  }

  const handleModalUnsubscribeEvent = () => {
    setActiveModalEditEvent(true);
  }

  return event.levels ? (
    <div className="container pe-3 minHeight position-relative">
      <HeaderEvents name={event.spot} back={true} page={aboutEvent} />
      <div className="row text-end fontSizeMedium">
        <div className="col-6">
          <div className="colorGrey smallText">מקפיצן</div>
          <div className="">
            {event.driver} <TbCaravan />
          </div>
          <div
            className={`smallText ${vacancy < 4 ? 'colorOrange' : ''} ${
              vacancy === 0 ? 'colorRed' : ''
            }`}
          >
            {vacancy === 0 ? event.waiting : vacancy} {vacancy === 0 ? 'בהמתנה' : 'מקומות פנוים'}
          </div>
        </div>
        <div className="col-6">
          <div className="rtl mediumTitle">{dateTorender(date[0])}</div>
          <div>
            {timeToRender(event.time_start)} - {timeToRender(event.time_end)}
          </div>
        </div>
        <AboutEventBlock
          top={'מוביל'}
          middle={event.admin}
          bottom={'055 271-8504'}
          coordinates={event.coordinates}
          levels={[]}
        />
        <AboutEventBlock top={'מסלול'} levels={event.levels} coordinates={''} />

        {event.min_participants <= event.booked ? (
          <div className="col-12 row tripDone mt-3">
            <div className="col-10">אירוע יתקיים בוודעות. מספיק רוכבים נרשמו</div>
            <div className="col-2 iconDoneBig">
              <TbCheck />
            </div>
          </div>
        ) : (
          <></>
        )}

        {event.booked && admin && currentPage === 'myEvents' ? (
          <RidersList booked={event.booked} max={event.max_participants} eventId={event.event_id} />
        ) : (
          <></>
        )}

        {currentPage === events ? (
          <ButtonEvents name={'הזמן'} handleClick={joinEvent} />
        ) : currentPage === myRuns ? (
          <ButtonEvents name={'בטל'} handleClick={handleModalUnsubscribeEvent} />
        ) : (
          <div>
            <div>
              <ButtonEvents name={'שינוי זמן'} handleClick={handleModalEditEvent} />
            </div>
            <div
              className="buttonBottom deleteButton"
              onClick={() => setActiveModalDeleteEvent(true)}
            >
              <TbTrash />
            </div>
          </div>
        )}

        <ModalDeleteEvent
          active={activeModalDeleteEvent}
          setActive={setActiveModalDeleteEvent}
          event={event}
          date={date[0]}
        />
        <ModalEditEvent active={activeModalEditEvent} setActive={setActiveModalEditEvent}/>
        <ModalUnsubscribe active={activeModalUnsubscribeEvent} setActive={setActiveModalUnsubscribeEvent}/>
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border" role="status" />
    </div>
  );
}

export default AboutEvent;
