import { useDispatch, useSelector } from 'react-redux';
import { trackLevelSelector } from '../../../../store/createEventData/createEventDataSelectors';
import { setTrackLevel } from '../../../../store/createEventData/createEventDataSlice';

function Tracks() {
  const trackLevel = useSelector(trackLevelSelector);
  const dispatch = useDispatch();

  const checkArray = (id: number) => {
    if (trackLevel.includes(id)) {
      const index = trackLevel.indexOf(id);
      const array = trackLevel.slice(0);
      array.splice(index, 1);
      dispatch(setTrackLevel([...array]));
    } else {
      dispatch(setTrackLevel([...trackLevel, id]));
    }
  };

  return (
    <div className="col-12 d-flex justify-content-center">
      <div className="trackBlock row">
        <div
          className={`col-4 d-flex flex-column justify-content-center align-items-center cursor
                            ${trackLevel.includes(2) ? 'backgroundGrey' : ''}`}
          onClick={() => {
            checkArray(2);
          }}
        >
          <div className="emoji">💀</div>
          <div>מקצוענים</div>
        </div>
        <div
          className={`col-4 d-flex flex-column justify-content-center align-items-center cursor
                            ${trackLevel.includes(1) ? 'backgroundGrey' : ''}`}
          onClick={() => {
            checkArray(1);
          }}
        >
          <div className="emoji">😈</div>
          <div className="colorRed">מתקדמים</div>
        </div>
        <div
          className={`col-4 d-flex flex-column justify-content-center align-items-center py-2 cursor
                            ${trackLevel.includes(0) ? 'backgroundGrey' : ''}`}
          onClick={() => {
            checkArray(0);
          }}
        >
          <div className="emoji">😚</div>
          <div className="inputMessageGreen">מתחילים</div>
        </div>
      </div>
    </div>
  );
}

export default Tracks;
