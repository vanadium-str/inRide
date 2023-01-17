import ButtonSignIn from "../../components/buttons/ButtonSignIn";
import HeaderAuth from "../../components/headers/HeaderAuth";
import InputSignIn from "../../components/inputs/InputSignIn";
import { useState } from "react";
import { registrationSchema } from "../../validation/SignInValidation";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserId } from "../../store/userData/userDataSlice";
import { URL, events } from "../../utils/constants";
import {
  RegistrationData,
  RegistrationFormElement,
} from "../../interfaces/signInInterfaces";
import { matchPhoneCodes } from "../../utils/functions";

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [wrongPass, setWrongPass] = useState(false);
  const [isNotValid, setIsNotValid] = useState("");

  const handleRegistration = (
    event: React.FormEvent<RegistrationFormElement>
  ) => {
    event.preventDefault();
    let formData = {
      email: event.currentTarget.elements.email.value,
      name: event.currentTarget.elements.name.value,
      phone: event.currentTarget.elements.phone.value,
      password: event.currentTarget.elements.password.value,
      repeatPassword: event.currentTarget.elements.repeatPassword.value,
    };

    registrationSchema
      .validate(formData)
      .then((result) => {
        if (result.password !== result.repeatPassword) {
          setIsNotValid("Both passwords must match");
          setWrongPass(true);
        } else if (result.phone.toString().length !== 9 && !matchPhoneCodes(result.phone.toString().padStart(10, '0'))) {
          setIsNotValid("Please enter a correct phone number");
        } else {
          setWrongPass(false);
          registration(result);
        }
      })
      .catch((error) => {
        setWrongPass(false);
        if (error.errors[0].includes("phone")) {
          setIsNotValid("Please enter a correct phone number");
        } else if (error.errors[0].includes("repeatPassword")) {
          setIsNotValid("Both passwords must match");
          setWrongPass(true);
        } else {
          setIsNotValid(error.errors[0]);
        }
      });
  };

  const registration = (registrationData: RegistrationData) => {
    fetch(URL + "register", {
      method: "POST",
      body: JSON.stringify({
        email: registrationData.email,
        name: registrationData.name,
        phone: registrationData.phone,
        password: registrationData.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 1) {
          setIsNotValid("משתמש עם המייל הזה כבר נרשם באפליקציה");
        } else if (data) {
          setIsNotValid("");
          //dispatch(setAdmin(data.is_admin));
          dispatch(setUserId(data.user_id));
          window.localStorage.setItem("userId", data.user_id);
          navigate(`/${events}`);
        }
      });
  };

  return (
    <div className="container my-3">
      <HeaderAuth name={"הרשמה"} back={true} />
      <form className="row mt-4" onSubmit={handleRegistration}>
        <InputSignIn placeholder={"מייל"} type={"email"} id={"email"} />
        <InputSignIn placeholder={"טלפון"} type={"number"} id={"phone"} />
        <InputSignIn placeholder={"שם פרטי"} type={"text"} id={"name"} />
        <InputSignIn
          placeholder={"סיסמה"}
          type={"password"}
          id={"password"}
          wrong={wrongPass}
        />
        <InputSignIn
          placeholder={"הזנה"}
          type={"password"}
          id={"repeatPassword"}
          wrong={wrongPass}
        />
        {isNotValid !== "" ? (
          <p className={`inputMessage`}>{isNotValid}</p>
        ) : (
          <></>
        )}
        <ButtonSignIn name={"הרשמה"} />
      </form>
    </div>
  );
}

export default Registration;
