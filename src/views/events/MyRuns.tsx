import { useEffect, useState } from 'react';
import { myRuns, URL } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { userIdSelector } from '../../store/userData/userDataSelectors';
import { myRunsSelector } from '../../store/eventsData/eventsDataSelectors';
import { setMyRuns } from '../../store/eventsData/eventsDataSlice';
import { EventData } from '../../interfaces/eventData';
import { dateFormatting, dateTorender } from '../../utils/functions';
import HeaderEvents from '../../components/headers/HeaderEvents';
import EventElement from './components/eventElement';

function MyRuns() {
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const myRunsArray = useSelector(myRunsSelector);
  const dates: string[] = [];

  useEffect(() => {
    setLoading(true);
    fetch(URL + 'myruns', {
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
        dispatch(setMyRuns(data));
        setLoading(false);
        if (data.length) {
          data.forEach((item: EventData) => {
            dateFormatting(dates, item);
          });
          const datesFiltered = dates.filter((value, index, array) => array.indexOf(value) === index);
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
        {myRunsArray.length ? (
          uniqueDates.map((item, key) => {
            function filter(data: EventData) {
              const dateFormat = new Date(data.time_start);
              if (
                `${dateFormat.getDate()}/${dateFormat.getMonth()}/${dateFormat.getFullYear()}` ===
                item
              ) {
                return true;
              } else {
                return false;
              }
            }
            const sortedEvents = myRunsArray.filter(filter);

            return (
              <div key={key}>
                <div className="col-12 rtl mt-4 mb-1 px-2 d-flex justify-content-start">
                  {dateTorender(item)}
                </div>
                {sortedEvents.map((event: EventData) => {
                  return <EventElement event={event} page={myRuns} key={event.event_id} />;
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

export default MyRuns;
