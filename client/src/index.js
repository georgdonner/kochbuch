import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import App from './app';
import Loading from './components/Loading';
import MainContext from './services/context';
import { syncDatabase, refreshDatabase } from './services/recipes';
import { getUser } from './services/auth';
import { withTimeout } from './utils';
import './index.scss';

toast.configure({
  position: 'bottom-center',
  newestOnTop: true,
  hideProgressBar: true,
});

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRecipes: null,
      user: null,
    };
  }

  async componentDidMount() {
    const timeout = 5000;
    const [recipes, user] = await Promise.all([
      syncDatabase(5000),
      withTimeout(getUser, { timeout, defaultValue: { authenticated: false } }),
    ]);

    this.setState({ allRecipes: recipes, user });
  }

  addRecipe = (recipe) => {
    this.setState((state) => ({
      allRecipes: state.allRecipes.concat(recipe),
    }));
    refreshDatabase(this.state.allRecipes);
  }

  updateRecipe = (recipe) => {
    this.setState((state) => ({
      allRecipes: state.allRecipes.map((r) => r._id === recipe._id ? recipe : r),
    }));
    refreshDatabase(this.state.allRecipes);
  }

  updateUser = (user) => {
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
      addRecipe: this.addRecipe,
      updateRecipe: this.updateRecipe,
      user: this.state.user,
      updateUser: this.updateUser,
    };
    return this.state.allRecipes && this.state.user ? (
      <MainContext.Provider value={context}>
        <App />
      </MainContext.Provider>
    ) : <Loading />;
  }
}

const root = document.getElementById('root');

ReactDOM.render(<Root />, root);
