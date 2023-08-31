import React from "react";
import "./TypeTag.css";

const TypeTag = ({ type }) => {
  return (
    <div className={`type_tag ${type}`}>
      <h5>{type}</h5>
    </div>
  );
};

export default TypeTag;
