import React from "react";
import "./ErrorPill.css";

const ErrorPill = ({ errorMessage }) => {
  return (
    <div className="error_pill">
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorPill;
