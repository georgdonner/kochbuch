import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import MainContext from '../../services/context';
import * as dateUtil from '../../utils/date';
import Nav from '../../components/Nav';
import Icon from '../../components/Icon';
import Loading from '../../components/Loading';
import NoPlan from './components/NoPlan';
import './Plan.scss';

const filterByDay = (entries, day) => (
  entries.filter((entry) => new Date(entry.date).getDay() === day.getDay())
);

export default () => {
  const { user, updateUser } = useContext(MainContext);
  const [entries, setEntries] = useState(null);
  const [week, setWeek] = useState(0);

  const updateEntries = async () => {
    const weekEntries = await api.get(`/plan?week=${week}`);
    setEntries(weekEntries);
  };

  useEffect(() => {
    document.title = 'Wochenplan';
  }, []);

  useEffect(() => {
    if (user.planCode) {
      updateEntries();
    }
  }, [week, user]);

  let content = user.fetched && !user.planCode ? (
    <NoPlan
      onUpdate={async (code) => {
        const updatedUser = await api.post('/user', {
          body: {
            planCode: code,
          },
        });
        updateUser(updatedUser);
      }}
    />
  ) : null;

  if (!content && entries) {
    content = (
      <>
        <Link id="new-entry" to="/plan/new">+</Link>
        <div id="plan-nav-wrapper">
          <div id="plan-nav" className="container">
            <button type="button" onClick={() => setWeek(week - 1)}>
              <Icon name="arrowLeft" />
            </button>
            <span>{week === 0 ? 'Diese Woche' : `Woche ${week}`}</span>
            <button type="button" onClick={() => setWeek(week + 1)}>
              <Icon name="arrowLeft" rotate={180} />
            </button>
          </div>
        </div>
        <div id="plan">
          {dateUtil.getWeekdays(week).map((day) => (
            <div key={day} className="day">
              <Link className="date" to={`/plan/new?date=${+day}`}>
                {dateUtil.getDayStr(day)}
              </Link>
              {filterByDay(entries, day).map((entry) => (
                <div className="entry" key={entry._id}>
                  <div className="data">
                    <div className="meta">
                      {`${entry.time} | ${entry.servings} Person${entry.servings !== 1 ? 'en' : ''}`}
                    </div>
                    {entry.custom ? (
                      <div className="title">{entry.custom}</div>
                    ) : (
                      <Link className="title" to={`/recipe/${entry.recipe.id}?servings=${entry.servings}`}>
                        {entry.recipe.title}
                      </Link>
                    )}
                  </div>
                  <div className="controls">
                    <Link to={`/plan/${entry._id}/edit`}>
                      <Icon name="edit" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </>
    );
  }

  if (!content) {
    content = <Loading />;
  }

  return (
    <>
      <Nav page="plan" />
      {!window.navigator.onLine ? (
        <div>Der Wochenplan ist offline nicht verfügbar</div>
      ) : content}
    </>
  );
};
