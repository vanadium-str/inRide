import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { URL } from '../../../../utils/constants';
import { ridersListSelector } from '../../../../store/eventsData/eventsDataSelectors';
import { setRidersList } from '../../../../store/eventsData/eventsDataSlice';

interface RidersListProps {
    booked: number;
    max: number;
    eventId: number;
}
function RidersList({ booked, max, eventId }: RidersListProps) {
  const ridersList = useSelector(ridersListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(URL + 'participants_list', {
      method: 'POST',
      body: JSON.stringify({
        event_id: eventId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setRidersList(data));
        console.log(data);
      });
  }, []);

  return (
    <div className="row">
      <div className="col-12 mt-4 mb-2 d-flex justify-context-end rtl">
        <div className="fw-bold">נרשמים</div>
        <div className="colorGrey me-2">
          {booked} / {max}
        </div>
      </div>
      {ridersList.map((item, key) => {
        return (
          <div className="d-flex flex-row justify-content-end mb-2" key={key}>
            <div>{item.phone}</div>
            <div className="ms-5">{item.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default RidersList;
