import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TbCaravan, TbCheck, TbTrash } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { userAdminSelector } from '../../../../store/userData/userDataSelectors';
import {
  eventsListSelector,
  myEventsSelector,
  myRunsSelector,
} from '../../../../store/eventsData/eventsDataSelectors';
import { currentPageSelector } from '../../../../store/currentPage/currentPageSelectors';
import { aboutEvent, events, myEvents, myRuns } from '../../../../utils/constants';
import { EventData, eventDataInitialState } from '../../../../interfaces/eventData';
import ButtonEvents from '../../../../components/buttons/ButtonEvents';
import { dateFormatting, dateTorender, timeToRender } from '../../../../utils/functions';
import HeaderEvents from '../../../../components/headers/HeaderEvents';
import AboutEventBlock from './AboutEventBlock';
import RidersList from './RidersList';

function AboutEvent() {
  const [activeModalDeleteEvent, setActiveModalDeleteEvent] = useState(false);
  const [event, setEvent] = useState<EventData>(eventDataInitialState);
  let { idEvent } = useParams();
  const admin = useSelector(userAdminSelector);
  const eventsList = useSelector(eventsListSelector);
  const myRunsList = useSelector(myRunsSelector);
  const myEventsList = useSelector(myEventsSelector);
  const currentPage = useSelector(currentPageSelector);

  let date: string[] = [];
  const vacancy = event.max_participants - event.booked;
  dateFormatting(date, event);

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
          <ButtonEvents name={'הזמן'} event={'join'} />
        ) : currentPage === myRuns ? (
          <ButtonEvents name={'בטל'} event={'unsubscribe'} />
        ) : (
          <div>
            <div>
              <ButtonEvents name={'שינוי זמן'} event={'edit'} />
            </div>
            <div
              className="buttonBottom deleteButton"
              onClick={() => setActiveModalDeleteEvent(true)}
            >
              <TbTrash />
            </div>
          </div>
        )}

        {/* <ModalDeleteEvent
          active={activeModalDeleteEvent}
          setActive={setActiveModalDeleteEvent}
          event={event}
          date={date}
        /> */}
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border" role="status" />
    </div>
  );
}

export default AboutEvent;
