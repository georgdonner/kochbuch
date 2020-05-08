import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Nav, { NavButton } from '../../components/Nav';
import Searchbar from './components/Searchbar';
import RecipeCard from './components/RecipeCard';
import searchRecipes from './modules/searchRecipes';
import MainContext from '../../services/context';
import './Recipes.scss';

export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.FETCH_AMOUNT = window.matchMedia('min-width: 1200px') ? 15 : 10;
    this.state = {
      query: window.sessionStorage.getItem('query') || '',
      page: +window.sessionStorage.getItem('page') || 1,
      recipes: null,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.setState((state) => ({
      recipes: searchRecipes(this.context.recipes, state.query),
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
        <Nav page="recipes">
          <NavButton icon="settings" link="/settings" />
        </Nav>
        <Searchbar
          onSearch={(val) => {
            const login = val === 'login';
            const query = login ? '' : val;
            this.setState({
              page: 1,
              query,
              recipes: searchRecipes(this.context.recipes, query),
            });
            window.sessionStorage.setItem('page', 1);
            window.sessionStorage.setItem('query', query);
            if (login) {
              this.props.history.push('/login');
            }
          }}
          query={this.state.query}
        />
        <div id="list-wrapper">
          <div id="recipe-list">
            {recipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)}
          </div>
        </div>
        {this.context.user.authenticated ? (
          <Link to="/recipes/new" id="new-recipe">+</Link>
        ) : null}
      </>
    );
  }
}

Recipes.contextType = MainContext;

Recipes.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line
};
