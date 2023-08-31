import React from "react";

const ErrorPill = ({ errorMessage }) => {
  return (
    <div>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorPill;
