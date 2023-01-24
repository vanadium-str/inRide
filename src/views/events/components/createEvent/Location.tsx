import { useDispatch, useSelector } from 'react-redux';
import { spotIdSelector } from '../../../../store/createEventData/createEventDataSelectors';
import { setSpotId } from '../../../../store/createEventData/createEventDataSlice';
import { createLink } from '../../../../utils/functions';

interface LocationProps {
    id: number;
    name: string;
    coordinates: string;
}

function Location({ id, name, coordinates }: LocationProps) {
  const spotId = useSelector(spotIdSelector);
  const dispatch = useDispatch();

  return (
    <div
      className={`col-5 locationBlock cursor ${
        id === spotId ? 'backgroundBlue' : 'backgroundWhite'
      }`}
      onClick={() => {
        if (spotId !== id) {
          dispatch(setSpotId(id));
        }
      }}
    >
      <div
        className={`col-4 ${id === spotId ? 'backgroundBlue' : 'colorBlue'}`}
        onClick={() => {
          window.open(createLink(coordinates));
        }}
      >
        מפה
      </div>
      <div className="col-8 text-end fw-bold">{name}</div>
    </div>
  );
}

export default Location;
