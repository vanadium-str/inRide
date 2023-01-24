import { useState } from 'react';

interface InputSignInProps {
  placeholder: string;
  type: string;
  id: string;
  wrong?: boolean;
}

function InputSignIn({ placeholder, type, id, wrong }: InputSignInProps) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="col-12 d-flex align-items-center flex-column heightInput">
      <div className="inputSize position-relative">
        {type === 'password' ? (
          <div
            className={`passwordView ${showPass ? 'view' : ''}`}
            onClick={() => (showPass ? setShowPass(false) : setShowPass(true))}
          />
        ) : (
          <></>
        )}
        <input
          className={`inputSignIn ${wrong ? 'inputWrong' : ''}`}
          placeholder={placeholder}
          type={showPass ? 'text' : type}
          id={id}
        />
      </div>
    </div>
  );
}

export default InputSignIn;
