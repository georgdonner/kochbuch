import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uploadcare from 'uploadcare-widget';

import MainContext from '../../services/context';
import api from '../../services/api';
import Loading from '../../components/Loading';
import Ingredients from './components/Ingredients';
import Description from './components/Description';
import Categories from './components/Categories';
import './RecipeForm.scss';

const Image = ({ image, alt }) => {
  const imgUrl = (width) => image.concat(
    `-/resize/${width}x/`,
    '-/quality/lighter/',
    '-/progressive/yes/');
  return image ? (
    <img
      src={image}
      srcSet={`${imgUrl(800)} 800w, ${imgUrl(400)} 400w`}
      sizes="(max-width: 450px) 400px, 800px"
      alt={alt}
    />
  ) : null;
};

Image.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string,
};
Image.defaultProps = {
  image: null,
  alt: 'Rezeptbild',
};

const defaultRecipe = {
  title: '',
  servings: 2,
  duration: 30,
  difficulty: 1,
  ingredients: [],
  description: '',
  categories: [],
};

export default class RecipeForm extends Component {
  constructor(props) {
    super(props);
    const { pathname } = props.location;
    this.recipeId = pathname.includes('edit') ? pathname.split('/')[2] : null;
    this.state = {
      ...defaultRecipe,
    };
  }

  async componentDidMount() {
    document.title = 'Neues Rezept';
    if (this.recipeId) {
      const recipe = await api.get(`/recipe/${this.recipeId}`);
      this.setState(recipe);
      document.title = recipe.title;
    }
  }

  onChange = (value, prop) => {
    this.setState({
      [prop]: value,
    });
  }

  getRadioButton = ({ value, label, prop }) => {
    const isNum = typeof value === 'number';
    return (
      <label className="input-container">
        <span className="content">{label}</span>
        <input
          type="radio" name="difficulty" value={value}
          checked={this.state[prop] === value}
          onChange={(e) => this.onChange(isNum ? +e.target.value : e.target.value, prop)}
        />
        <span className="checkmark radio" />
      </label>
    );
  }

  getVeggieOption = (option) => (
    <label className="input-container">
      {option}
      <input
        type="checkbox" checked={this.state.categories.includes(option)}
        onChange={({ target }) => {
          this.setState((state) => ({
            categories: target.checked
              ? state.categories.concat(option)
              : state.categories.filter((c) => c !== option),
          }));
        }}
      />
      <span className="checkmark box" />
    </label>
  );

  handleImageUpload = () => {
    const dialog = uploadcare.openDialog(null, {
      publicKey: this.context.user.uploadcareKey,
      imagesOnly: true,
      crop: '',
      imageShrink: '2000x2000',
    });
    dialog.done((result) => {
      result.promise().done((info) => {
        this.setState({
          image: info.cdnUrl.replace('-/preview/', ''),
        });
      });
    });
  }

  saveRecipe = async () => {
    let url = '/recipe';
    if (this.recipeId) {
      url += `/${this.recipeId}`;
    }
    const method = this.recipeId ? 'put' : 'post';
    const saved = await api[method](url, {
      body: this.state,
    });
    if (this.recipeId) {
      this.context.updateRecipe(saved);
    } else {
      this.context.addRecipe(saved);
    }
    this.props.history.replace(`/recipe/${saved._id}`);
  }

  render() {
    return (!this.recipeId || (this.recipeId && this.state._id)) ? (
      <div className="recipe-form-container">
        <div className="recipe-form">
          <Image image={this.state.image} />
          <div id="title-wrapper">
            <input
              type="text" value={this.state.title} placeholder="Titel"
              onChange={(e) => this.onChange(e.target.value, 'title')}
            />
            <button type="button" className="button" onClick={this.handleImageUpload}>
              Neues Bild
            </button>
          </div>
          <div id="number-inputs">
            <div>
              <label>Portionen</label>
              <input
                type="number" min="1"
                value={this.state.servings}
                onChange={(e) => this.onChange(e.target.value, 'servings')}
              />
            </div>
            <div>
              <label>Minuten</label>
              <input
                type="number" min="1"
                value={this.state.duration}
                onChange={(e) => this.onChange(e.target.value, 'duration')}
              />
            </div>
          </div>
          <div id="misc-inputs">
            <div>
              <form id="difficulty">
                {this.getRadioButton({ value: 1, label: 'Einfach', prop: 'difficulty' })}
                {this.getRadioButton({ value: 2, label: 'Mittel', prop: 'difficulty' })}
                {this.getRadioButton({ value: 3, label: 'Schwer', prop: 'difficulty' })}
              </form>
            </div>
            <div id="veggie-options">
              {this.getVeggieOption('Vegetarisch')}
              {this.getVeggieOption('Vegan')}
            </div>
          </div>
          <Ingredients ingredients={this.state.ingredients} onChange={(v) => this.onChange(v, 'ingredients')} />
          <Description value={this.state.description} onChange={(v) => this.onChange(v, 'description')} />
          <Categories categories={this.state.categories} onChange={(v) => this.onChange(v, 'categories')} />
          <button
            type="button" className="button inverted" id="save"
            onClick={this.saveRecipe}
          >
            Rezept speichern
          </button>
        </div>
      </div>
    ) : <Loading />;
  }
}

RecipeForm.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line
  history: PropTypes.object.isRequired, // eslint-disable-line
};

RecipeForm.contextType = MainContext;
