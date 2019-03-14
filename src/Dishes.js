import React from "react";
import { Link } from "react-router-dom";

const Dishes = props => {
  return (
    <div className="dishes" id={props.id}>
      <figure>
        <img alt={props.title} src={props.img} />
      </figure>
      <h1>
        <Link
          to={{
            pathname: `/DishDetail/${props.uri}`,
            state: {
              dishDetailTitle: props.title
              //this title is going to pass to DishDetail component
            }
          }}
        >
          {props.title.length < 20
            ? props.title
            : `${props.title.substring(0, 21)}...`}
        </Link>
      </h1>
      <h3>{props.publisher}</h3>
    </div>
  );
};

export default Dishes;
