import { createLink } from "../../../../utils/functions";

interface AboutEventBlockProps {
  top?: string;
  middle?: string;
  bottom?: string;
  levels: number[];
  coordinates: string;
}

function AboutEventBlock({ top, middle, bottom, levels, coordinates }: AboutEventBlockProps) {
  return (
    <div className="col-6 mt-2">
      <div className="colorGrey smallText">{top}</div>

      {middle ? (
        <div>{middle}</div>
      ) : (
        levels.map((item, key) => {
          return (
            <div key={key}>
              {item === 0 ? 'מתחילים 😚' : item === 1 ? 'מתקדמים 😈' : 'מקצוענים 💀'}
            </div>
          );
        })
      )}

      {bottom ? (
        <div className="colorBlue">
          <div>{bottom}</div>
          <div className="cursor" onClick={() => window.open(createLink(coordinates))}>
            איך להגיע
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AboutEventBlock;
