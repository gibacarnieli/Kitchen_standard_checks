import { useRouteError } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  // Provide a default status value when error is null or undefined
  const status = error?.status || 'unknown';

  console.log('Error Status ->', status);

  return (
    <>
      <Nav />
      <div id="error-page">
        <p>Sorry, an unexpected error has occurred! Status: {status}</p>
      </div>
      <Footer />
    </>
  );
}
