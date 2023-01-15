import { Link } from 'react-router-dom';
import { registration } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { resetAll } from '../../store/userData/userDataSlice';
import HeaderAuth from '../../components/headers/HeaderAuth';
import InputSignIn from '../../components/inputs/InputSignIn';
import ButtonSignIn from '../../components/buttons/ButtonSignIn';
import { signInSchema } from '../../validation/SignInValidation';

interface FormElements extends HTMLFormControlsCollection {
    phone: HTMLInputElement,
    password: HTMLInputElement,
}

interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

function SignIn() {

    const dispatch = useDispatch();

    const handleSigningIn = (event:React.FormEvent<SignInFormElement>) => {
        event.preventDefault();
        let formData = {
            phone: event.currentTarget.elements.phone.value,
            password: event.currentTarget.elements.password.value
        }
        signInSchema.validate(formData)
        .then((result) => console.log(result))
        .catch((error) => {
            console.log(error.errors)
        });      
    }

    return (
        <div className='container my-3'>
            <HeaderAuth name={'כניסה'} back={false}/>
            <div className='text-end mt-3 me-4 textLarge'>
                <Link to={`/${registration}`} className='colorBlue cursor' onClick={() => {
                    dispatch(resetAll());
                }}>
                    להרשמה
                </Link>
            </div>
            <form className='row mt-5' onSubmit={handleSigningIn}>
                <InputSignIn placeholder={'טלפון'} type={'number'} id={'phone'}/>
                <InputSignIn placeholder={'סיסמה'}  type={'password'} id={'password'}/>
                <ButtonSignIn name={'כניסה'}/>
            </form>
        </div>
    );
}

export default SignIn;