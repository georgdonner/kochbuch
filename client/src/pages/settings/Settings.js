import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import MainContext from '../../services/context';
import api from '../../services/api';
import DbList from '../../services/list';
import Nav from '../../components/Nav';
import Loading from '../../components/Loading';
import ListProfiles from './components/ListProfiles';
import './Settings.scss';

export default () => {
  const history = useHistory();
  const { user, updateUser } = useContext(MainContext);
  const [codes, setCodes] = useState({ planCode: '', listCode: '' });
  const [diet, setDiet] = useState(window.localStorage.getItem('diet') || 'alles');
  const [list, setList] = useState(null);

  useEffect(() => {
    const { planCode = '', listCode = '' } = user;
    setCodes({ planCode, listCode });
    if (listCode && !list) {
      const fetchList = async () => {
        const fetched = await api.get('/list');
        setList(fetched);
      };
      fetchList();
    }
  }, [user]);

  const save = async () => {
    const codesTrimmed = Object.fromEntries(Object.entries(codes).map(([k, v]) => [k, v.trim()]));
    const updatedUser = await api.post('/user', {
      body: codesTrimmed,
    });
    if ((codes.listCode || undefined) !== updatedUser.listCode) {
      await new DbList().clear();
    }
    updateUser({
      listCode: updatedUser.listCode,
      planCode: updatedUser.planCode,
    });
    toast.success('Einstellungen gespeichert');
    history.push('/');
  };

  return user ? (
    <>
      <Nav page="recipes" />
      <div id="settings-container">
        <div id="settings">
          <h2>Einstellungen</h2>
          <div>
            <label>Ernährung</label>
            <select
              value={diet}
              onChange={({ target }) => {
                setDiet(target.value);
                if (target.value === 'alles') {
                  window.localStorage.removeItem('diet');
                } else {
                  window.localStorage.setItem('diet', target.value);
                }
              }}
            >
              <option value="alles">Alles</option>
              <option value="vegetarisch">Vegetarisch</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>
          <div>
            <label>Einkaufslisten Code</label>
            <input
              type="text" value={codes.listCode}
              onChange={({ target }) => {
                setCodes({ ...codes, listCode: target.value });
              }}
            />
            <label>Wochenplan Code</label>
            <input
              type="text" value={codes.planCode}
              onChange={({ target }) => {
                setCodes({ ...codes, planCode: target.value });
              }}
            />
          </div>
          {list ? (
            <ListProfiles profiles={list.profiles} updateList={setList} />
          ) : null}
          <button className="button inverted" type="button" onClick={save}>Speichern</button>
        </div>
      </div>
    </>
  ) : <Loading />;
};
