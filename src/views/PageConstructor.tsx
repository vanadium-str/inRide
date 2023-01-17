import { useSelector } from 'react-redux';
import { myEvents, myRuns } from '../utils/constants';
import { currentPageSelector } from '../store/currentPage/currentPageSelectors';
import MyRuns from './events/MyRuns';
import MyEvents from './events/MyEvents';
import AllEvents from './events/AllEvents';

function PageConstructor() {
  const currentPage = useSelector(currentPageSelector);

  switch (currentPage) {
    case myEvents:
      return <MyEvents />;
    case myRuns:
      return <MyRuns />;
    default:
      return <AllEvents />;
  }
}

export default PageConstructor;
