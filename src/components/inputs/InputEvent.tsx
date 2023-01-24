import { useSelector } from 'react-redux';
import { driverSelector } from '../../store/createEventData/createEventDataSelectors';

interface InputEventProps {
  type: string;
  name: string;
  id: string;
  disabled?: boolean;
  setDateSelected?: React.Dispatch<React.SetStateAction<boolean>>;
}

function InputEvent({ type, name, id, disabled, setDateSelected }: InputEventProps) {
  const driver = useSelector(driverSelector);

  return (
    <div className="col-12 d-flex justify-content-center">
      <input
        className="inputSignIn text-end ltr"
        id={id}
        type={type}
        placeholder={disabled ? driver : name}
        disabled={disabled}
        onChange={() => {
          setDateSelected ? setDateSelected(true) : '';
        }}
      />
    </div>
  );
}

export default InputEvent;
