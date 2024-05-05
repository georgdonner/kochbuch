import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import MainContext from '../../services/context';
import * as dateUtil from '../../utils/date';
import Nav from '../../components/Nav';
import Icon from '../../components/Icon';
import Loading from '../../components/Loading';
import NoPlan from './components/NoPlan';
import PlanEntry from './components/PlanEntry';
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

  let content = !user.planCode ? (
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
            <div
              key={day} className="day"
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                e.currentTarget.classList.add('drag-over');
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('drag-over');
              }}
              onDrop={async (e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('drag-over');
                const entryId = e.dataTransfer.getData('text/plain');
                if (entryId && entryId.match(/^[a-f\d]{24}$/i)) {
                  const updated = {
                    ...entries.find(({ _id }) => _id === entryId),
                    date: day,
                  };
                  await api.put(`/plan/${entryId}`, { body: updated });
                  updateEntries();
                }
              }}
              onDragEnter={(e) => e.preventDefault()}
            >
              <Link className="date" to={`/plan/new?date=${+day}`}>
                {dateUtil.getDayStr(day)}
              </Link>
              {filterByDay(entries, day).map((entry) => (
                <PlanEntry entry={entry} key={entry._id} />
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
