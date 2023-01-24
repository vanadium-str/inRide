import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  driverSelector,
  privacySelector,
  spotIdSelector,
  spotsListSelector,
} from '../../../../store/createEventData/createEventDataSelectors';
import { resetAll, setSpotsList } from '../../../../store/createEventData/createEventDataSlice';
import HeaderEvents from '../../../../components/headers/HeaderEvents';
import { URL, aboutEvent, createSpot, errorPage, events } from '../../../../utils/constants';
import Location from './Location';
import InputEvent from '../../../../components/inputs/InputEvent';
import InputEventSmall from '../../../../components/inputs/InputEventSmall';
import Privacy from './Privacy';
import { CreatedEvent, CreateEventFormElement } from '../../../../interfaces/createEventInterface';
import { createEventSchema } from '../../../../validation/CreateEventValidation';
import { userIdSelector } from '../../../../store/userData/userDataSelectors';
import { createDate } from '../../../../utils/functions';

function CreateEvent() {
  const [isNotValid, setIsNotValid] = useState('');
  const [dateSelected, setDateSelected] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const spotsList = useSelector(spotsListSelector);
  const spotId = useSelector(spotIdSelector);
  const userId = useSelector(userIdSelector);
  const driver = useSelector(driverSelector);
  const privacy = useSelector(privacySelector);

  useEffect(() => {
    fetch(URL + 'spots')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(setSpotsList(data));
      });
  }, []);

  const handleCreateEvent = (event: React.FormEvent<CreateEventFormElement>) => {
    event.preventDefault();
    const formData = {
      date: event.currentTarget.elements.date.value,
      timeStart: event.currentTarget.elements.timeStart.value,
      timeEnd: event.currentTarget.elements.timeEnd.value,
      price: event.currentTarget.elements.price.value,
      minPlaces: event.currentTarget.elements.minPlaces.value,
      maxPlaces: event.currentTarget.elements.maxPlaces.value,
    };

    createEventSchema
      .validate(formData)
      .then((result) => {
        if (spotId === -1) {
          setIsNotValid('Please choose a spot');
        } else {
          setIsNotValid('');
          createEvent(result);
        }
      })
      .catch((error) => {
        setIsNotValid(error.errors[0]);
      });
  };

  const createEvent = (event: CreatedEvent) => {
    fetch(URL + 'create_event', {
      method: 'POST',
      body: JSON.stringify({
        driver_name: driver,
        max_participants: event.maxPlaces,
        min_participants: event.minPlaces,
        price: event.price,
        time_start: createDate(event.date, event.timeStart),
        time_end: createDate(event.date, event.timeEnd),
        is_private: privacy,
        spot_id: spotId,
        user_id: userId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === -1) {
          console.error('Data Base Error');
          navigate(`/${errorPage}`);
        } else {
          console.log(data);
          dispatch(resetAll());
          navigate(`/${events}`);
        }
      });
  };

  return (
    <div className="container py-3 minHeight">
      <HeaderEvents name={'לפתוח הקפצה'} back={true} page={aboutEvent} />
      <div className="row ms-1 mb-3">
        <div className="col-6 colorBlue cursor" onClick={() => navigate(`/${createSpot}`)}>
          להוסיף יעד
        </div>
        <div className="col-6 fw-bold row">
          <div className="colorGrey fw-normal text-end col-6">{spotsList.length}</div>
          <div className="col-6 text-end">יעדים</div>
        </div>
      </div>
      <div className="row justify-content-center">
        {spotsList.map((item, key) => {
          return (
            <Location id={item.spot_id} name={item.name} coordinates={item.coordinates} key={key} />
          );
        })}
      </div>

      <form onSubmit={handleCreateEvent}>
        <div className="row mb-4">
          <InputEvent type={'date'} id={'date'} name={'תאריך'} setDateSelected={setDateSelected} />
          {dateSelected ? (
            <div className="row g-0">
              <InputEventSmall type={'time'} id={'timeEnd'} explanation={'זמן סיום'} />
              <InputEventSmall type={'time'} id={'timeStart'} explanation={'זמן התחלה'} />
            </div>
          ) : (
            <></>
          )}

          <InputEvent type={'text'} name={'נהג'} id={'driver'} disabled={true} />
          <InputEvent type={'number'} name={'₪ מחיר'} id={'price'} />
        </div>
        <div className="row justify-content-center mb-4">
          <div className="col-11 text-end fw-bold">מקומות</div>
          <InputEventSmall
            type={'number'}
            name={'מקסימום'}
            explanation={'שנכנס להגלה'}
            id={'maxPlaces'}
          />
          <InputEventSmall
            type={'number'}
            name={'מינימום'}
            explanation={'כדי שהקפצה תתקיים'}
            id={'minPlaces'}
          />
        </div>
        <Privacy />
        <div className="d-flex justify-content-center mt-5">
          {isNotValid !== '' ? (
            <p className='inputMessage messageBottom fw-bold'>{isNotValid}</p>
          ) : (
            <></>
          )}
          <button className="button buttonBottom" disabled={!dateSelected} type='submit'>
            הזמן
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;
