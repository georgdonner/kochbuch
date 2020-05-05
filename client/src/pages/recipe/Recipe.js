import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NoSleep from 'nosleep.js';
import { toast } from 'react-toastify';

import Nav, { NavButton } from '../../components/Nav';
import RecipeImage from './components/Image';
import Description from './components/Description';
import MainContext from '../../services/context';
import calcServings from './modules/calcServings';
import './Recipe.scss';

const noSleep = new NoSleep();

export default () => {
  const { id } = useParams();
  const { recipes, user } = useContext(MainContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const recipe = recipes.find(({ _id }) => _id === id);
  const [servings, setServings] = useState(recipe.servings);
  const [keepAwake, setAwake] = useState(false);

  const content = recipe ? (
    <div className="container">
      <h1 className="recipe-title">{recipe.title}</h1>

      {recipe.image ? <RecipeImage recipe={recipe} /> : null}

      <div className="recipe-info">
        <div className="duration">
          {`${recipe.duration} Minuten`}
        </div>
        <div className="categories">
          {recipe.categories.map((ctg) => <span key={ctg}>{ctg}</span>)}
        </div>
      </div>

      <div className="recipe-main">
        <div>
          <h2 className="servings-header">
            <span>Zutaten</span>
            <div className="servings-control">
              <button type="button" className="down" onClick={() => setServings(servings - 1)}>-</button>
              <span id="servings">{servings}</span>
              <button type="button" className="up" onClick={() => setServings(servings + 1)}>+</button>
            </div>
          </h2>

          <ul id="ingredients">
            {recipe.ingredients.map((ingr) => (
              <li key={ingr.name}>
                <div className="content">
                  <span className="name">{calcServings(ingr.name, recipe.servings, servings)}</span>
                  <span className="hint">{ingr.hint ? ` (${ingr.hint})` : ''}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Description recipe={recipe} servings={servings} />
      </div>

      <div id="buttons">
        {user.authenticated ? (
          <Link to={`/recipe/${id}/edit`} className="button">Bearbeiten</Link>
        ) : null}
      </div>
    </div>
  ) : <div>Rezept konnte nicht gefunden werden :(</div>;
  return (
    <>
      <Nav page="recipes">
        <NavButton
          icon="keepAwake"
          onClick={() => {
            const action = keepAwake ? 'disable' : 'enable';
            noSleep[action]();
            toast.info(!keepAwake
              ? 'Kochmodus aktiviert - Display schaltet sich nicht automatisch aus'
              : 'Kochmodus deaktiviert - Display kann sich wieder automatisch ausschalten');
            setAwake(!keepAwake);
          }}
          hasActiveState
        />
      </Nav>
      {content}
    </>
  );
};
