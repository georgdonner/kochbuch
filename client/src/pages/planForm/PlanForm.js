import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';
import RecipeSearch from './components/RecipeSearch';
import { getDateStr } from '../../utils/date';
import './PlanForm.scss';

export default () => {
  const [editing, setEditing] = useState(false);
  const [entry, setEntry] = useState(null);

  const { search } = useLocation();
  const { id: entryId } = useParams();
  const history = useHistory();

  const fetchEntry = async () => {
    const fetched = await api.get(`/plan/${entryId}`);
    fetched.date = new Date(fetched.date);
    setEntry(fetched);
  };

  const createEntry = async () => {
    const query = new URLSearchParams(search);
    const create = {
      time: '19:30',
      custom: '',
    };
    create.servings = Number(query.get('servings')) || 2;

    const checkDate = async () => {
      let newDate = Number(query.get('date'));
      if (!newDate) {
        const { day } = await api.get('/plan/nextday');
        newDate = day;
      }
      create.date = new Date(newDate);
    };
    const checkRecipe = async () => {
      if (query.get('recipe')) {
        const { title, _id } = await api.get(`/recipe/${query.get('recipe')}`);
        create.recipe = { title, id: _id };
      }
    };
    await Promise.all([checkDate(), checkRecipe()]);
    setEntry(create);
  };

  const updateEntry = (props) => {
    setEntry({ ...entry, ...props });
  };

  const save = async () => {
    try {
      const { _id, recipe, ...toSave } = entry;
      if (recipe) {
        toSave.recipe = recipe;
      }
      if (!entry.custom && !entry.recipe) {
        throw new Error('Konnte nicht gespeichert werden: Der Eintrag muss ein Rezept haben.');
      }
      if (_id) {
        await api.put(`/plan/${_id}`, { body: toSave });
      } else {
        await api.post('/plan', { body: toSave });
      }
      history.replace('/plan');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteEntry = async () => {
    await api.delete(`/plan/${entryId}`);
    history.replace('/plan');
  };

  useEffect(() => {
    if (entryId) {
      fetchEntry(entryId);
      setEditing(true);
    } else {
      createEntry();
    }
  }, []);

  return entry ? (
    <div id="plan-form-container">
      <div id="plan-form">
        <h2>{editing ? 'Eintrag bearbeiten' : 'Neuer Eintrag'}</h2>
        <div className="half">
          <div>
            <label>Datum</label>
            <input
              type="date" value={getDateStr(entry.date)}
              onChange={({ target }) => {
                if (new Date(target.value).valueOf()) {
                  updateEntry({ date: new Date(target.value) });
                }
              }}
            />
          </div>
          <div>
            <label>Uhrzeit</label>
            <input
              type="time" value={entry.time}
              onChange={({ target }) => {
                updateEntry({ time: target.value });
              }}
            />
          </div>
        </div>
        <div className="half">
          <div>
            <label>Portionen</label>
            <input
              type="number" value={String(entry.servings)} min="1"
              onChange={({ target }) => {
                updateEntry({ servings: Number(target.value) });
              }}
            />
          </div>
        </div>
        <div>
          <label>Eigenes Rezept</label>
          <input
            type="text" value={entry.custom} placeholder="z.B. Pizza"
            disabled={entry.recipe}
            onChange={({ target }) => {
              updateEntry({ custom: target.value });
            }}
          />
        </div>
        <RecipeSearch
          recipe={entry.recipe} custom={entry.custom}
          updateRecipe={(recipe) => {
            updateEntry({ recipe });
          }}
        />
        <div id="buttons">
          <button className="button inverted" type="button" onClick={save}>Speichern</button>
          {editing ? (
            <button id="delete" className="button" type="button" onClick={deleteEntry}>Löschen</button>
          ) : null}
        </div>
      </div>
    </div>
  ) : null;
};
