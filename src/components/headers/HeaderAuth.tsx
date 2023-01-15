import { useNavigate } from "react-router-dom";
import arrow from "../../assets/images/Back.svg";
import { useDispatch } from "react-redux";

interface HeaderAuthProps {
  name: string;
  back: boolean;
}

function HeaderAuth({ name, back }: HeaderAuthProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const returnToSignIn = () => {
    navigate(`/`);
  };

  return (
    <div className="row d-flex align-items-center px-4">
      <div className="col-6 logo">
        <span className="colorGreen fw-bold">in</span>Rideapp
      </div>
      <div className="col-6 text-end mediumTitle">
        {name}{" "}
        {back ? (
          <img
            src={arrow}
            className="cursor"
            onClick={() => {
              returnToSignIn();
            }}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default HeaderAuth;
