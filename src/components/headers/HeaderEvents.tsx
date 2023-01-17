import { useNavigate } from 'react-router-dom';
import arrow from '../../assets/images/Back.svg';
import {
  aboutEvent,
  createEvent,
  events,
  myEvents,
  myRuns,
  personalArea,
} from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { currentPageSelector } from '../../store/currentPage/currentPageSelectors';
import { resetAll } from '../../store/createEventData/createEventDataSlice';
import { setCurrentPage } from '../../store/currentPage/currentPageSlice';
import logo from '../../assets/images/Pilot.svg';

interface HeaderEventsProps {
  name: string;
  back: boolean;
  page?: string;
}

function HeaderEvents({ name, back, page }: HeaderEventsProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentPage = useSelector(currentPageSelector);

  return (
    <div className="row">
      {back ? (
        <></>
      ) : (
        <div
          className="col-4 d-flex align-items-center cursor ps-4"
          onClick={() => {
            navigate(`/${personalArea}`);
            dispatch(resetAll());
          }}
        >
          <img src={logo} width="40" height="40" alt="logo" />
        </div>
      )}
      <div className={`${back ? 'col-12 mediumTitle mb-5 mt-2' : 'col-8 pageTitle'}`}>
        {name}{' '}
        {back ? (
          <img
            src={arrow}
            className="cursor"
            onClick={() => {
              if (page === aboutEvent) {
                if (currentPage === events) {
                  dispatch(setCurrentPage(events));
                } else if (currentPage === myRuns) {
                  dispatch(setCurrentPage(myRuns));
                } else if (currentPage === myEvents) {
                  dispatch(setCurrentPage(myEvents));
                }
                navigate(`/${events}`);
              } else if (page === createEvent) {
                navigate(`/${createEvent}`);
              } else {
                if (page === events) {
                  dispatch(setCurrentPage(events));
                } else if (page === myRuns) {
                  dispatch(setCurrentPage(myRuns));
                } else {
                  dispatch(setCurrentPage(myEvents));
                }
                dispatch(resetAll());
                dispatch(setCurrentPage(page));
              }
            }}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default HeaderEvents;
