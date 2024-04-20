import { Constant } from "./Constant";
import NotFoundErr from "./images/not-found.png";
import UnexpectedErr from "./images/unexpected-err.png";

interface IErrorProp {
  error: string;
}

export function ErrorPage({ error }: IErrorProp) {
  return (
    <div className="error-cntr">
      <input
        type="image"
        src={error === Constant.ERROR_NO_RES ? NotFoundErr : UnexpectedErr}
        alt="Error"
        className="error-img"
      />
      <h5 className="error-msg">{error}</h5>
    </div>
  );
}
