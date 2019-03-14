import React from "react";
const Form = props => {
  return (
    <div>
      <div className="inputContainer">
        <input
          name="recipeName"
          onChange={props.recipeName}
          placeholder="Type an ingredient"
        />
      </div>
      <button
        className="searchBtn"
        onClick={props.getRecipe}
        disabled={props.disabledBtn}
      >
        Search
      </button>
      {props.error && <div className="error">{props.error}</div>}
    </div>
  );
};
export default Form;
