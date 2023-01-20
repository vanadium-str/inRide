import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from '../../assets/images/Back.svg';
import { errorPage, personalArea, URL } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { userIdSelector } from '../../store/userData/userDataSelectors';
import InputChangePass from '../../components/inputs/InputChangePass';
import { EditPersonalDataFormElement, EditedPersonalData } from '../../interfaces/editPersonalDataInterfaces';
import { editPersonalDataSchema } from '../../validation/PersonalDataValidation';

function EditPersonalData() {
  const [wrongOldPass, setWrongOldPass] = useState(false);
  const [wrongNewPass, setWrongNewPass] = useState(false);
  const [isNotValid, setIsNotValid] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);

  const handleEditPersonalData = (event: React.FormEvent<EditPersonalDataFormElement>) => {
    event.preventDefault();
    const formData = {
      oldPassword: event.currentTarget.elements.oldPassword.value,
      newPassword: event.currentTarget.elements.newPassword.value,
      repeatPassword: event.currentTarget.elements.repeatPassword.value,
    };

    editPersonalDataSchema
      .validate(formData)
      .then((result) => {
        if (result.newPassword !== result.repeatPassword) {
            setIsNotValid("Both passwords must match");
            setWrongNewPass(true);
        } else {
            setIsNotValid('');
            setWrongNewPass(false);
            changeData(result);
        }
      })
      .catch(() => {
        setIsNotValid("Password must be at least 6 characters");
      });
  };

  const changeData = (editedData: EditedPersonalData) => {
    fetch(URL + 'change_password', {
        method: 'PUT',
        body: JSON.stringify({
          user_id: userId,
          password: editedData.oldPassword,
          new_password: editedData.newPassword
        }),
          headers: {
            'Content-Type': 'application/json'
          }
      })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.status === 0){
            navigate(`/${personalArea}`)
        }else if(data.status === 1){
            setIsNotValid('User is not found');
        }else if(data.status === 2){
            setIsNotValid('Old password is incorrect');
            setWrongOldPass(true);
        }else if(data.status === -1){
            console.error('Data Base Error');
            navigate(`/${errorPage}`);
        }
    })
}

  return (
    <form className="container" onSubmit={handleEditPersonalData}>
      <div className="row">
        <div className="col-12 mediumTitle mt-2 mb-5">
          שנה נתונים{' '}
          <img
            src={arrow}
            className="cursor"
            onClick={() => {
              navigate(`/${personalArea}`);
            }}
          />
        </div>
        <div className="d-flex flex-column align-items-center">
          <InputChangePass name={'סיסמה נוכחית'} id={'oldPassword'} wrong={wrongOldPass} />
          <InputChangePass name={'סיסמה חדשה'} id={'newPassword'} wrong={wrongNewPass} />
          <InputChangePass name={'הזנה'} id={'repeatPassword'} wrong={wrongNewPass} />
        </div>
      </div>

      {isNotValid !== '' ? <p className={`inputMessage`}>{isNotValid}</p> : <></>}

      <div className="d-flex justify-content-center mt-5">
        <button className="button buttonBottom">Save</button>
      </div>
    </form>
  );
}

export default EditPersonalData;
