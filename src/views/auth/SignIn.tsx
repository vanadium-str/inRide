import { Link, useNavigate } from 'react-router-dom';
import { URL, events, registration } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../store/userData/userDataSlice';
import HeaderAuth from '../../components/headers/HeaderAuth';
import InputSignIn from '../../components/inputs/InputSignIn';
import ButtonSignIn from '../../components/buttons/ButtonSignIn';
import { signInSchema } from '../../validation/SignInValidation';
import { useState } from 'react';
import { SignInFormElement } from '../../interfaces/signInInterfaces';

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isNotValid, setIsNotValid] = useState('');

  const handleSigningIn = (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const formData = {
      phone: event.currentTarget.elements.phone.value,
      password: event.currentTarget.elements.password.value,
    };

    signInSchema
      .validate(formData)
      .then((result) => {
        setIsNotValid('');
        loginCheck(result.phone, result.password);
      })
      .catch((error) => {
        setIsNotValid(error.errors[0]);
      });
  };

  const loginCheck = (phone: number, pass: string) => {
    fetch(URL + 'login', {
      method: 'POST',
      body: JSON.stringify({
        phone: phone,
        password: pass,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 1) {
          setIsNotValid('הטלפון הזה לא נרשמ באפליקציה');
        } else if (data.status === 2) {
          setIsNotValid('סיסמה שגויה');
        } else if (data) {
          setIsNotValid('');
          //dispatch(setAdmin(data.is_admin));
          dispatch(setUserId(data.user_id));
          window.localStorage.setItem('userId', data.user_id);
          navigate(`/${events}`);
        }
      });
  };

  return (
    <div className="container my-3">
      <HeaderAuth name={'כניסה'} back={false} />
      <div className="text-end mt-3 me-4 textLarge">
        <Link to={`/${registration}`} className="colorBlue cursor">
          להרשמה
        </Link>
      </div>
      <form className="row mt-5" onSubmit={handleSigningIn}>
        <InputSignIn placeholder={'טלפון'} type={'number'} id={'phone'} />
        <InputSignIn placeholder={'סיסמה'} type={'password'} id={'password'} />
        {isNotValid !== '' ? <p className='inputMessage'>{isNotValid}</p> : <></>}
        <ButtonSignIn name={'כניסה'} />
      </form>
    </div>
  );
}

export default SignIn;
