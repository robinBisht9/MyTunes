import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ errorMessage }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  console.log(errorMessage);

  return (
    <div className="container">
      <h1>Oops! Something went wrong.</h1>
      {errorMessage && (
        <div>
          <p> {errorMessage?.message} </p>
        </div>
      )}
      <p>Redirecting to homepage in {countdown} seconds...</p>
    </div>
  );
};

export default ErrorPage;
