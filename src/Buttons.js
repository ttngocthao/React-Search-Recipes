import React from "react";
const Buttons = props => {
  return (
    <button onClick={props.click} disabled={props.disabled} id={props.id}>
      {props.text}
    </button>
  );
};
export default Buttons;
