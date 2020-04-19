import React, { Component } from 'react';

import Nav from '../../components/Nav';
import Searchbar from './components/Searchbar';
import RecipeCard from './components/RecipeCard';
import searchRecipes from './modules/searchRecipes';
import RecipesContext from '../../services/recipesContext';
import './Recipes.scss';

export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.FETCH_AMOUNT = window.matchMedia('min-width: 1200px') ? 15 : 10;
    this.state = {
      query: window.sessionStorage.getItem('query') || '',
      page: window.sessionStorage.getItem('page') || 1,
      recipes: null,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.setState((state) => ({
      recipes: searchRecipes(this.context, state.query),
    }));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
    const hasNext = this.state.recipes.length > this.FETCH_AMOUNT * this.state.page;
    if (hasNext && nearBottom) {
      window.sessionStorage.setItem('page', this.state.page + 1);
      this.setState((state) => ({
        page: state.page + 1,
      }));
    }
  }

  render() {
    if (!this.state.recipes) return null;
    const recipes = this.state.recipes.slice(0, this.FETCH_AMOUNT * this.state.page);
    return (
      <>
        <Nav page="recipes" />
        <Searchbar
          onSearch={(val) => {
            this.setState({
              page: 1,
              query: val,
              recipes: searchRecipes(this.context, val),
            });
            window.sessionStorage.setItem('page', 1);
            window.sessionStorage.setItem('query', val);
          }}
          query={this.state.query}
        />
        <div id="list-wrapper">
          <div id="recipe-list">
            {recipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)}
          </div>
        </div>
      </>
    );
  }
}

Recipes.contextType = RecipesContext;
