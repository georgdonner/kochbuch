import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/login/Login';
import Recipes from './pages/recipes/Recipes';
import Recipe from './pages/recipe/Recipe';
import RecipeForm from './pages/recipeForm/RecipeForm';
import List from './pages/list/List';
import Plan from './pages/plan/Plan';
import PlanForm from './pages/planForm/PlanForm';
import Settings from './pages/settings/Settings';

export default () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/list" component={List} />
      <Route path="/plan/new" component={PlanForm} />
      <Route path="/plan/:id/edit" component={PlanForm} />
      <Route path="/plan" component={Plan} />
      <Route path="/recipes/new" component={RecipeForm} />
      <Route path="/recipe/:id/edit" component={RecipeForm} />
      <Route path="/recipe/:id" component={Recipe} />
      <Route path="/settings" component={Settings} />
      <Route path="/" component={Recipes} />
    </Switch>
  </Router>
);
