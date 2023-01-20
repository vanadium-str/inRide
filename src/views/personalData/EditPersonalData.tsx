import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import arrow from '../../assets/images/Back.svg';
import { errorPage, personalArea, URL } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { userIdSelector } from '../../store/userData/userDataSelectors';

function EditPersonalData() {

    const [wrongOldPass, setWrongOldPass] = useState(false);
    const [wrongNewPass, setWrongNewPass] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector(userIdSelector);
    
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 mediumTitle mt-2 mb-5'>
                    שנה נתונים <img src={arrow} className='cursor' onClick={() => {
                        navigate(`/${personalArea}`);
                    }}/>
                </div>
                <div className='d-flex flex-column align-items-center'>

                </div>
            </div>

            <div className='d-flex justify-content-center mt-5'>
                <button className='button buttonBottom'>
                    Save
                </button>
            </div>
        </div>
    );
}
    
export default EditPersonalData;