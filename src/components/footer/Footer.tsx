import { useDispatch, useSelector } from 'react-redux';
import { events, myEvents, myRuns } from '../../utils/constants';
import { currentPageSelector } from '../../store/currentPage/currentPageSelectors';
import { resetAll } from '../../store/createEventData/createEventDataSlice';
import { setCurrentPage } from '../../store/currentPage/currentPageSlice';

interface FooterProps {
    isAdmin: number;
}

function Footer({ isAdmin }: FooterProps) {

    const dispatch = useDispatch();
    const currentPage = useSelector(currentPageSelector);

    return(
        <div className='container-fluid eventsSwitch'>
            <div className='row text-center'>
                <div
                    className={`col-4 d-flex justify-content-center align-items-center
                            ${currentPage === events ? 'activeEventsSwitchButton' : ''}
                            ${isAdmin === 1 ? 'col-4' : 'col-6'}`}
                    onClick={() => {
                        dispatch(resetAll());
                        dispatch(setCurrentPage(events));
                }}>
                    כל הקפצות
                </div>
                <div 
                    className={`col-4 d-flex justify-content-center align-items-center
                            ${currentPage === myRuns ? 'activeEventsSwitchButton': ''}
                            ${isAdmin === 1 ? 'col-4' : 'col-6'}`}
                    onClick={() => {
                        dispatch(resetAll());
                        dispatch(setCurrentPage(myRuns));
                }}>
                    נרשמתי
                </div>
                {isAdmin === 1 ? 
                    <div className={`col-4 d-flex justify-content-center align-items-center
                        ${currentPage === myEvents ? 'activeEventsSwitchButton': ''}`}
                    onClick={() => {
                            dispatch(resetAll());
                            dispatch(setCurrentPage(myEvents));
                    }}>
                        פתחתי
                    </div>
                : <></>}
            </div>
        </div>
    )
}

export default Footer;