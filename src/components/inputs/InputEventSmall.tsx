interface InputEventSmallProps {
  type: string;
  id: string;
  explanation: string;
  name?: string;
  left?: boolean;
}

function InputEventSmall({ type, name, id, explanation, left }: InputEventSmallProps) {
  return (
    <div
      className={`col-6 d-flex flex-column p-1 ${left ? 'align-items-end' : ''}`}
    >
      <input
        className="inputSignIn inputSmall text-end ltr"
        id={id}
        type={type}
        placeholder={name}
      />
      <div className={`smallText colorGrey w-75 ${left ? 'text-end' : 'text-start'}`}>
        {explanation}
      </div>
    </div>
  );
}

export default InputEventSmall;
