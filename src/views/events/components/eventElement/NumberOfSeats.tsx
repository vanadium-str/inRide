interface NumberOfSeatsProps {
  number: number;
  name: string;
  big: boolean;
}

function NumberOfSeats({ number, name, big }: NumberOfSeatsProps) {
  return (
    <div>
      <div className={`${big ? 'mediumBoldText' : 'fontSizeMedium'}`}>{number}</div>
      <div className="smallText">{name}</div>
    </div>
  );
}

export default NumberOfSeats;
