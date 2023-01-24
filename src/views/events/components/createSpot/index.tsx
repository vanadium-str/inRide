import { useState } from 'react';
import HeaderEvents from '../../../../components/headers/HeaderEvents';
import { URL, createEvent, errorPage } from '../../../../utils/constants';
import Tracks from './Tracks';
import { CreateSpotFormElement } from '../../../../interfaces/createSpotInterface';
import { createSpotSchema } from '../../../../validation/CreateSpotValidation';
import { trackLevelSelector } from '../../../../store/createEventData/createEventDataSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { resetAll } from '../../../../store/createEventData/createEventDataSlice';
import { useNavigate } from 'react-router-dom';

function CreateSpot() {
  const [isNotValid, setIsNotValid] = useState('');
  const trackLevel = useSelector(trackLevelSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateSpot = (event: React.FormEvent<CreateSpotFormElement>) => {
    event.preventDefault();
    const formData = {
      spotName: event.currentTarget.elements.spotName.value,
      coordinates: event.currentTarget.elements.coordinates.value,
    };

    createSpotSchema
      .validate(formData)
      .then((result) => {
        if (!trackLevel.length) {
          setIsNotValid('Please choose a level');
        } else {
          setIsNotValid('');
          createSpot(result.spotName, result.coordinates);
        }
      })
      .catch((error) => {
        setIsNotValid(error.errors[0]);
      });
  };

  const createSpot = (spotName: string, coordinates: string) => {
    fetch(URL + 'create_spot', {
      method: 'POST',
      body: JSON.stringify({
        name: spotName,
        levels: trackLevel,
        coordinnates: coordinates,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
          navigate(`/${errorPage}`);
        } else {
          dispatch(resetAll());
          navigate(`/${createEvent}`);
        }
      });
  };

  return (
    <form className="container pe-3 minHeight" onSubmit={handleCreateSpot}>
      <HeaderEvents name={'יעד רכיבה'} back={true} page={createEvent} />
      <div className="row">
        <div className="col-12 d-flex justify-content-center position-relative">
          <input className="inputSignIn text-end ltr" id="spotName" type="text" placeholder="שם" />
        </div>
        <div className="col-12 d-flex justify-content-center position-relative">
          <input
            className="inputSignIn text-end ltr"
            id="coordinates"
            type="text"
            placeholder="32.609889, 35.122237: מיקום"
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 text-end fw-bold py-100">רמת המסלול</div>
        <Tracks />
      </div>
      <div className="d-flex justify-content-center mt-5">
        {isNotValid !== '' ? (
          <p className="inputMessage messageBottom fw-bold">{isNotValid}</p>
        ) : (
          <></>
        )}
        <button className="button buttonBottom" type="submit">
          הזמן
        </button>
      </div>
    </form>
  );
}

export default CreateSpot;
