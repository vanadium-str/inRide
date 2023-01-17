import { useEffect, useState } from 'react';
import { events, URL } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { eventsListSelector } from '../../store/eventsData/eventsDataSelectors';
import { setEventsList } from '../../store/eventsData/eventsDataSlice';
import { EventData } from '../../interfaces/eventData';
import { dateFormatting, dateTorender } from '../../utils/functions';
import HeaderEvents from '../../components/headers/HeaderEvents';
import EventElement from './components/eventElement';

function AllEvents() {
  const dispatch = useDispatch();
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const eventsList = useSelector(eventsListSelector);
  let dates: string[] = [];

  useEffect(() => {
    setLoading(true);
    fetch(URL + 'runs')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(setEventsList(data));
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
    <div className="container py-3 minHeight">
      <HeaderEvents name={'הקפצות'} back={false} />

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status" />
        </div>
      ) : (
        <></>
      )}

      <div className="row-reverse">
        {eventsList.length ? (
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
            let sortedEvents = eventsList.filter(filter);
            return (
              <div key={key}>
                <div className="col-12 rtl mt-4 mb-1 px-2 d-flex justify-content-start">
                  {dateTorender(item)}
                </div>
                {sortedEvents.map((event, key) => {
                  return <EventElement event={event} page={events} key={key} />;
                })}
              </div>
            );
          })
        ) : (
          <div className="text-end">אין הקפצות נפתחות</div>
        )}
      </div>
    </div>
  );
}

export default AllEvents;
