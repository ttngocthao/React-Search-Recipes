import React from "react";
import { Link } from "react-router-dom";
const APP_KEY = "37f29cf72f5b4b10228903b5c2e83ad0";
const APP_ID = "2b62d5db";
class DishDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      activeRecipe: [],
      ingredient: []
    };
  }

  async componentDidMount(e) {
    const nameDish = this.props.location.state.dishDetailTitle;
    // console.log(nameDish);
    const apiCall = await fetch(
      `https://api.edamam.com/search?q=${nameDish}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const res = await apiCall.json();
    // console.log(res.hits[0]);
    this.setState({
      activeRecipe: res.hits[0].recipe,
      ingredient: res.hits[0].recipe.ingredientLines
    });
  }
  render() {
    const dish = this.state.activeRecipe;
    return (
      <div className="dishDetail">
        {this.state.activeRecipe.length !== 0 && (
          <div className="disDetail-wrapper">
            <button className="homeBtn">
              <Link to="/">
                <i className="fas fa-home" />
              </Link>
            </button>
            <h1 className="dishLabel">{dish.label}</h1>
            <ul className="dishOther">
              <li className="dishSrc">@ {dish.source}</li>
              <li>
                <i className="fas fa-utensils" />{" "}
                <span className="dishYield"> {dish.yield}</span>
              </li>
              {dish.time && (
                <li>
                  <i className="far fa-clock" /> {dish.time}
                </li>
              )}
            </ul>
            <figure>
              <img src={dish.image} alt={dish.label} />
            </figure>

            <h3>Ingredients</h3>
            <a className="instruction" href={dish.url} target="blank">
              Cooking Instruction <i className="fas fa-sign-in-alt" />
            </a>
            <ul className="dishIng">
              {dish.ingredientLines &&
                dish.ingredientLines.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
export default DishDetail;
