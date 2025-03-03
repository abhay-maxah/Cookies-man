import ErrorPageContain from "../components/ErrorPageContent";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error && error.status === 500) {
    message = error.data?.message || message; // For server errors
  }
  if (error && error.status === 404) {
    title = "Not Found!";
    message = "Could not find resource or page.";
  }
  if (error && error.status === 401) {
    title = "Unauthorized!";
    message = "You are not authorized to access this page.";
  }
  if (error && error.status === 403) {
    title = "Forbidden!";
    message = "You do not have permission to view this page.";
  }

  return (
    <>
      <ErrorPageContain title={title}>
        <p>{message}</p>
      </ErrorPageContain>
    </>
  );
}

export default ErrorPage;
