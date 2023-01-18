import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, myEvents, URL } from '../../utils/constants';
import { userIdSelector } from '../../store/userData/userDataSelectors';
import { myEventsSelector } from '../../store/eventsData/eventsDataSelectors';
import { setMyEvents } from '../../store/eventsData/eventsDataSlice';
import { EventData } from '../../interfaces/eventData';
import { dateFormatting, dateTorender } from '../../utils/functions';
import HeaderEvents from '../../components/headers/HeaderEvents';
import EventElement from './components/eventElement';
import ButtonEvents from '../../components/buttons/ButtonEvents';

function MyEvents() {
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const myEventsArray = useSelector(myEventsSelector);
  let dates: string[] = [];

  useEffect(() => {
    setLoading(true);
    fetch(URL + 'mycreated', {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(setMyEvents(data));
        setLoading(false);
        if (data.length) {
          data.forEach((item: EventData) => {
            dateFormatting(dates, item);
          });
          let datesFiltered = dates.filter((value, index, array) => array.indexOf(value) === index);
          setUniqueDates(datesFiltered);
        }
      });
  }, []);

  return (
    <div className="container py-3 minHeight position-relative">
      <HeaderEvents name={'הקפצות שפתחתי'} back={false} />

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status" />
        </div>
      ) : (
        <></>
      )}

      <div className="row">
        {myEventsArray.length ? (
          uniqueDates.map((item, key) => {
            function filter(data: EventData) {
              let dateFormat = new Date(data.time_start);
              if (
                `${dateFormat.getDate()}/${dateFormat.getMonth()}/${dateFormat.getFullYear()}` ===
                item
              ) {
                return true;
              } else {
                return false;
              }
            }
            let sortedEvents = myEventsArray.filter(filter);
            return (
              <div key={key}>
                <div className="col-12 rtl mt-4 mb-1 px-2 d-flex justify-content-start">
                  {dateTorender(item)}
                </div>
                {sortedEvents.map((event) => {
                  return <EventElement event={event} page={myEvents} key={event.event_id} />;
                })}
              </div>
            );
          })
        ) : (
          <div className="col-12 text-end">לא נמצאים הקפצות</div>
        )}
        {/* <ButtonEvents name={'+'} event={createEvent} /> */}
      </div>
    </div>
  );
}

export default MyEvents;
