interface InputEventSmallProps {
  type: string;
  id: string;
  explanation: string;
  name?: string;
  empty?: boolean;
}

function InputEventSmall({ type, name, id, explanation }: InputEventSmallProps) {
  return (
    <div className="col-6 d-flex flex-column align-items-center">
      <input
        className="inputSignIn inputSmall text-end ltr"
        id={id}
        type={type}
        placeholder={name}
      />
      <div className="smallText colorGrey text-end w-75">{explanation}</div>
    </div>
  );
}

export default InputEventSmall;
