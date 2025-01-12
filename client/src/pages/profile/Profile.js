import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useUser, UserProfile } from '@clerk/clerk-react';

import api from '../../services/api';
import DbList from '../../services/list';
import AccountButton from '../../components/AccountButton';
import Nav from '../../components/Nav';
import Loading from '../../components/Loading';
import ListProfiles from './components/ListProfiles';
import './Profile.scss';

const AppSettings = () => {
  const { user } = useUser();

  const [codes, setCodes] = useState({ planCode: '', listCode: '' });
  const [diet, setDiet] = useState('alles');
  const [list, setList] = useState(null);

  useEffect(() => {
    if (user) {
      const { planCode = '', listCode = '', diet: userDiet } = user.publicMetadata;
      setCodes({ planCode, listCode });
      setDiet(userDiet);
      if (listCode && !list) {
        const fetchList = async () => {
          const fetched = await api.get('/list');
          setList(fetched);
        };
        fetchList();
      }
    }
  }, [user]);

  const save = async () => {
    const codesTrimmed = Object.fromEntries(Object.entries(codes).map(([k, v]) => [k, v.trim()]));
    const updatedUser = await api.post('/user', {
      body: {
        ...codesTrimmed,
        diet,
      },
    });

    user.reload();

    if ((codes.listCode || undefined) !== updatedUser.listCode) {
      await new DbList().clear();
    }

    toast.success('Einstellungen gespeichert');
  };

  return (
    <>
      <div>
        <label>Ernährung</label>
        <select
          value={diet}
          onChange={({ target }) => {
            setDiet(target.value);
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
    </>
  );
};

export default () => {
  const { user } = useUser();

  console.log('profile component');

  const [tab, setTab] = useState('settings');

  return user ? (
    <>
      <Nav page="profile">
        <AccountButton />
      </Nav>
      <div id="profile-container">
        <div id="profile">
          <div className="tabs">
            <button
              type="button"
              onClick={() => setTab('settings')}
              className={tab === 'settings' ? 'active' : ''}
            >
              Einstellungen
            </button>
            <button
              type="button"
              onClick={() => setTab('account')}
              className={tab === 'account' ? 'active' : ''}
            >
              Account
            </button>
          </div>
          {tab === 'settings' ? <AppSettings /> : <UserProfile />}
        </div>
      </div>
    </>
  ) : <Loading />;
};
