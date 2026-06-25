import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <h1>404</h1>
      <p>Oops terjadi error!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">Go back</Link>
    </>
  );
}
