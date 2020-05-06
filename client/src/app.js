import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Recipe from './pages/recipe/Recipe';
import Recipes from './pages/recipes/Recipes';
import List from './pages/list/List';
import Login from './pages/login/Login';
import RecipeForm from './pages/recipeForm/RecipeForm';

export default () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/list" component={List} />
      <Route path="/plan">
        <div>Plan</div>
      </Route>
      <Route path="/recipes/new" component={RecipeForm} />
      <Route path="/recipe/:id/edit" component={RecipeForm} />
      <Route path="/recipe/:id" component={Recipe} />
      <Route path="/" component={Recipes} />
    </Switch>
  </Router>
);
