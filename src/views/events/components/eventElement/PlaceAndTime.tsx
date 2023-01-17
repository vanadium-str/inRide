import { TbCheck } from 'react-icons/tb';

interface PlaceAndTimeProps {
  place: string;
  timeFrom: string;
  timeTo: string;
  done: boolean;
}
function PlaceAndTime({ place, timeFrom, timeTo, done }: PlaceAndTimeProps) {
  return (
    <div>
      <div className="d-inline-flex">
        {done ? (
          <div className="iconDone">
            <TbCheck />
          </div>
        ) : (
          <></>
        )}

        <div className="mediumBoldText">{place}</div>
      </div>
      <div>
        {timeFrom} - {timeTo}
      </div>
    </div>
  );
}

export default PlaceAndTime;
