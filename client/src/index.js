import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './components/Loading';
import Recipe from './pages/recipe/Recipe';
import Recipes from './pages/recipes/Recipes';
import RecipesContext from './services/recipesContext';
import { syncDatabase } from './services/recipesDb';
import './index.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRecipes: null,
    };
  }

  async componentDidMount() {
    const recipes = await syncDatabase(5000);
    this.setState({ allRecipes: recipes });
  }

  render() {
    return this.state.allRecipes ? (
      <RecipesContext.Provider value={this.state.allRecipes}>
        <Router>
          <Switch>
            <Route path="/list">
              <div>List</div>
            </Route>
            <Route path="/plan">
              <div>Plan</div>
            </Route>
            <Route path="/recipe/:id" component={Recipe} />
            <Route path="/" component={Recipes} />
          </Switch>
        </Router>
      </RecipesContext.Provider>
    ) : <Loading />;
  }
}

const root = document.getElementById('root');

ReactDOM.render(<App />, root);
