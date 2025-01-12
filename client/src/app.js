import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';

import Profile from './pages/profile/Profile';
import Recipes from './pages/recipes/Recipes';
import Recipe from './pages/recipe/Recipe';
import List from './pages/list/List';
import Plan from './pages/plan/Plan';
import PlanForm from './pages/planForm/PlanForm';
import Loading from './components/Loading';

const RecipeForm = lazy(() => import('./pages/recipeForm/RecipeForm'));

export default () => (
  <Suspense fallback={<Loading />}>
    <Router>
      <Switch>
        <Route path="/login" component={SignIn} />

        <Route path="/profile" component={Profile} />

        <Route path="/list" component={List} />

        <Route path="/plan/new" component={PlanForm} />
        <Route path="/plan/:id/edit" component={PlanForm} />
        <Route path="/plan" component={Plan} />

        <Route path="/recipes/new" component={RecipeForm} />
        <Route path="/recipe/:id/edit" component={RecipeForm} />
        <Route path="/recipe/:id" component={Recipe} />

        <Route path="/" component={Recipes} />
      </Switch>
    </Router>
  </Suspense>
);
