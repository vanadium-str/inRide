import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { events } from '../../utils/constants';
import { setCurrentPage } from '../../store/currentPage/currentPageSlice';

function ErrorPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="col-12 pageTitle my-5 me-3">404</div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div>Oops...</div>
        <div>Something went wrong 😢</div>
        <button
          className="buttonSmall mt-5"
          onClick={() => {
            dispatch(setCurrentPage(events));
            navigate(`/${events}`);
          }}
        >
          חזור
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
