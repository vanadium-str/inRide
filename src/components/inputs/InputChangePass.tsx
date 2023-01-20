import { useState } from 'react';

interface InputChangePassProps {
  name: string;
  id: string;
  wrong?: boolean;
}

function InputChangePass({ name, id, wrong }: InputChangePassProps) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="inputSize position-relative mb-4">
      <div
        className={`passwordView ${showPass ? 'view' : ''}`}
        onClick={() => {
          showPass ? setShowPass(false) : setShowPass(true);
        }}
      />
      <input
        className={`inputSignIn text-end ltr ${wrong ? 'inputWrong' : ''}`}
        type={showPass ? 'text' : 'password'}
        id={id}
        placeholder={name}
      />
    </div>
  );
}

export default InputChangePass;
