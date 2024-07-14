import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="container m-auto h-screen flex justify-center items-center">
      <div className="text-center ">
        <h1 className="text-3xl font-bold">Oops!</h1>
        <p className="mt-4 text-xl">Sorry, an unexpected error has occurred.</p>
        <p className="mt-2 text-neutral-600">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
