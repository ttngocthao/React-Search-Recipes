import React from "react";
import Form from "./Form";
import Dishes from "./Dishes";
import PageTitle from "./PageTitle";
import Buttons from "./Buttons";
import Footer from "./Footer";

const APP_KEY = "37f29cf72f5b4b10228903b5c2e83ad0";
const APP_ID = "2b62d5db";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      pageTitle: "Search Recipe",
      input: undefined,
      recipes: null,
      currentIndex: 0,
      error: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.getRecipe = this.getRecipe.bind(this);
    this.getNext = this.getNext.bind(this);
    this.getPrevious = this.getPrevious.bind(this);
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  //https://api.edamam.com/search?q=chicken&app_id=2b62d5db&app_key=37f29cf72f5b4b10228903b5c2e83ad0
  async getRecipe(e) {
    const searchInput = this.state.input;
    const api_call = await fetch(
      `https://api.edamam.com/search?q=${searchInput}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const response = await api_call.json();
    if (searchInput === undefined) {
      this.setState({
        error: "Please enter an ingrediant"
      });
    } else if (response.cod === "404") {
      this.setState({
        error: "Could not find the match"
      });
    } else {
      this.setState({
        recipes: response.hits.map(item => item.recipe),
        pageTitle: `Recipes for ${searchInput}`
      });
    }
  }
  handleEnterPress = event => {
    if (event.key === "Enter") {
      this.getRecipe();
    }
  };

  componentDidMount() {
    const localSearch = localStorage.getItem("userInput");
    this.setState({
      recipes: JSON.parse(localSearch)
    });
  }
  getPrevious() {
    this.setState(prevState => {
      return {
        currentIndex: prevState.currentIndex - 1
      };
    });
  }
  getNext() {
    this.setState(prevState => {
      return { currentIndex: prevState.currentIndex + 1 };
    });
  }
  componentDidUpdate() {
    const userInput = JSON.stringify(this.state.recipes);
    localStorage.setItem("userInput", userInput);
  }

  render() {
    const recipesLength = this.state.recipes && this.state.recipes.length;
    // console.log(recipesLength);
    return (
      <div className="App">
        <div className="searchForm">
          <figure className="logo">
            <img alt="logo" src="https://i.imgur.com/os0CJp4.png" />
          </figure>
          <PageTitle pageTitle={this.state.pageTitle} />
          <Form
            getRecipe={this.getRecipe}
            recipeName={this.handleChange}
            error={this.state.error}
            disabledBtn={this.state.input === undefined}
            enterKey={this.handleEnterPress}
          />
        </div>
        {this.state.recipes && (
          <div>
            <div className="buttons">
              <Buttons
                id="prev"
                disabled={this.state.currentIndex === 0}
                text={<i className="fas fa-angle-left" />}
                click={this.getPrevious}
              />
              <Buttons
                id="next"
                text={<i className="fas fa-angle-right" />}
                disabled={this.state.currentIndex === recipesLength - 1}
                click={this.getNext}
              />
            </div>
            <div
              className={`searchResult  activeSlide-${this.state.currentIndex}`}
            >
              <div
                className="searchResult-wrapper"
                style={{
                  transform: `translateX(-${this.state.currentIndex *
                    (100 / recipesLength)}%)`
                }}
              >
                {(this.state.recipes || []).map((item, index) => (
                  <Dishes
                    id={`dish-${index}`}
                    key={index}
                    title={item.label}
                    img={item.image}
                    publisher={item.source}
                    uri={item.uri}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}
export default App;
