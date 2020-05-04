import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Loading from './components/Loading';
import Recipe from './pages/recipe/Recipe';
import Recipes from './pages/recipes/Recipes';
import Login from './pages/login/Login';
import MainContext from './services/context';
import { syncDatabase } from './services/recipesDb';
import { getUser } from './services/auth';
import { withTimeout } from './utils';
import './index.scss';

toast.configure({
  position: 'bottom-center',
  newestOnTop: true,
  hideProgressBar: true,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRecipes: null,
      user: null,
    };

    this.updateUser = this.updateUser.bind(this);
  }

  async componentDidMount() {
    const timeout = 5000;
    const [recipes, user] = await Promise.all([
      syncDatabase(5000),
      withTimeout(getUser, { timeout, defaultValue: { authenticated: false } }),
    ]);

    this.setState({ allRecipes: recipes, user });
  }

  updateUser(user) {
    this.setState((state) => ({
      user: {
        ...state.user,
        ...user,
      },
    }));
  }

  render() {
    const context = {
      recipes: this.state.allRecipes,
      user: this.state.user,
      updateUser: this.updateUser,
    };
    return this.state.allRecipes && this.state.user ? (
      <MainContext.Provider value={context}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
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
      </MainContext.Provider>
    ) : <Loading />;
  }
}

const root = document.getElementById('root');

ReactDOM.render(<App />, root);
