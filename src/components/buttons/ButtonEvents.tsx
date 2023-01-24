interface ButtonEventsProps {
  name: string;
  handleClick: () => void;
}

function ButtonEvents({ name, handleClick }: ButtonEventsProps) {
  return (
    <div className="d-flex justify-content-center mt-5">
      <button className="button buttonBottom" onClick={handleClick}>
        {name}
      </button>
    </div>
  );
}

export default ButtonEvents;
