import React, { Component } from 'react';
import NoSleep from 'nosleep.js';
import { toast } from 'react-toastify';
import { ReactSortable } from 'react-sortablejs';
import Modal from 'react-modal';

import MainContext from '../../services/context';
import api from '../../services/api';
import ListDb from '../../services/list';
import ToastUndo from '../../components/ToastUndo';
import Nav, { NavButton } from '../../components/Nav';
import Icon from '../../components/Icon';
import Loading from '../../components/Loading';
import NoList from './components/NoList';
import './List.scss';

const groupByCategory = (list) => {
  const grouped = new Map();
  list.forEach((item) => {
    const categoryId = item.category && item.category._id;
    const category = grouped.get(categoryId);
    if (category) {
      category.items.push(item);
    } else {
      grouped.set(categoryId, { ...item.category || {}, items: [item] });
    }
  });
  return Array.from(grouped.values());
};

export default class List extends Component {
  constructor(props) {
    super(props);
    this.noSleep = new NoSleep();
    this.listDb = null;
    this.inputRef = React.createRef();
    this.state = {
      keepAwake: false,
      fetching: true,
      list: null,
      newItem: '',
      editing: null,
      toRemove: [],
      choosingProfile: false,
    };
  }

  async componentDidMount() {
    document.title = 'Einkaufsliste';
    const { listCode } = this.context.user || {};
    this.listDb = new ListDb(listCode, {
      onUpdate: (list) => {
        this.setState({ list });
      },
    });
    let list = await this.listDb.getList(5000);
    if (listCode && !list) {
      list = { name: listCode, list: [] };
      await this.listDb.updateLocalList(list);
    } else if (list) {
      this.setState({ list });
    }
    this.setState({
      fetching: false,
    });
  }

  async componentWillUnmount() {
    toast.dismiss();
  }

  getNav = () => (
    <Nav page="list">
      <NavButton
        icon="sort"
        onClick={async () => {
          const { profiles } = this.state.list;
          if (profiles && profiles.length > 1) {
            this.setState({ choosingProfile: true });
          } else {
            const sortedList = await api.get('/list/sort');
            this.listDb.updateLocalList(sortedList);
          }
        }}
      />
      <NavButton
        icon="keepAwake"
        onClick={() => {
          const action = this.state.keepAwake ? 'disable' : 'enable';
          this.noSleep[action]();
          toast.info(!this.state.keepAwake
            ? 'Einkaufsmodus aktiviert - Display schaltet sich nicht automatisch aus'
            : 'Einkaufsmodus deaktiviert - Display kann sich wieder automatisch ausschalten');
          this.setState((state) => ({ keepAwake: !state.keepAwake }));
        }}
        hasActiveState
      />
    </Nav>
  )

  onUpdateCode = async (code) => {
    const user = await api.post('/user', {
      body: {
        listCode: code,
      },
    });
    this.context.updateUser(user);
    await this.listDb.clear();

    this.listDb.name = code;
    let list = await this.listDb.getList(5000);
    if (!list) {
      list = { name: code, list: [] };
      await this.listDb.updateLocalList(list);
    } else {
      this.setState({ list });
    }
  };

  removeItem = async (id) => {
    const origItem = this.state.list.list.find((item) => item.id === id);
    this.setState((state) => ({
      list: { ...state.list, list: state.list.list.filter((item) => item.id !== id) },
      toRemove: [...state.toRemove, id],
    }));
    const undo = () => {
      this.setState((state) => ({
        list: { ...state.list, list: state.list.list.concat([origItem]) },
        toRemove: state.toRemove.filter((rId) => rId !== id),
      }));
    };
    toast(<ToastUndo undo={undo} label={`${origItem.name} entfernt.`} />, {
      onClose: () => {
        if (this.state.toRemove.length) {
          this.setState({ toRemove: [] });
          this.listDb.removeItems(this.state.toRemove);
        }
      },
      closeOnClick: false,
    });
  }

  getListItem = (item) => (
    <div key={item.id} className="item-wrapper">
      <label className="input-container">
        <input type="checkbox" />
        <span
          className="checkmark box"
          onClick={() => this.removeItem(item.id)}
        />
        <span className="item">
          <span>{item.name}</span>
          <button
            type="button"
            onClick={() => {
              this.setState({
                editing: item.id,
                newItem: item.name,
              });
              this.inputRef.current.focus();
            }}
          >
            <Icon name="edit" />
          </button>
        </span>
      </label>
    </div>
  )

  submitItem = async () => {
    const { editing, newItem } = this.state;
    if (this.state.toRemove.length) {
      this.setState({ toRemove: [] });
      await this.listDb.removeItems(this.state.toRemove);
    }
    if (newItem) {
      if (editing) {
        this.listDb.updateItem(editing, newItem);
      } else {
        this.listDb.addItems(newItem);
      }
      this.setState({
        editing: null,
        newItem: '',
      });
    }
  }

  render() {
    const { fetching, list, choosingProfile } = this.state;

    const content = list ? (
      <div id="list-wrapper">
        <Modal
          isOpen={choosingProfile}
          onRequestClose={() => this.setState({ choosingProfile: false })}
          contentLabel="Profil auswählen"
          style={{
            content: {
              maxWidth: '400px',
              margin: '0 auto',
              top: '5rem',
              textAlign: 'center',
            },
          }}
        >
          <h2 style={{ marginTop: 0 }}>Profil auswählen</h2>
          {(list.profiles || []).map((profile) => (
            <button
              type="button" key={profile._id} className="profile-button"
              onClick={async () => {
                const sortedList = await api.get(`/list/sort?profile=${profile._id}`);
                this.listDb.updateLocalList(sortedList);
                this.setState({ choosingProfile: false });
              }}
            >
              {profile.name}
            </button>
          ))}
        </Modal>
        <div id="new-item">
          <input
            ref={this.inputRef}
            value={this.state.newItem} type="text" placeholder="Hinzufügen"
            onChange={({ target }) => {
              this.setState({ newItem: target.value });
            }}
            onKeyDown={({ key }) => {
              if (key === 'Enter') {
                this.submitItem();
              }
            }}
          />
        </div>
        <div id="list-container">
          {list.list.some(({ category }) => category) ? (
            <div id="list">
              {groupByCategory(list.list)
                .map((category) => (
                  <div key={category._id || 'none'} className="ctg-wrapper">
                    <div className="ctg-label">{category.name || 'Unsortiert'}</div>
                    {category.items.map((item) => this.getListItem(item))}
                  </div>
                ))}
            </div>
          ) : (
            <ReactSortable
              list={list.list} id="list"
              setList={() => {}} delay={250}
              onUpdate={({ oldIndex, newIndex }) => {
                if (oldIndex !== newIndex) {
                  this.listDb.moveItem(list.list[oldIndex].id, newIndex);
                }
              }}
            >
              {list.list.map((item) => this.getListItem(item))}
            </ReactSortable>
          )}
        </div>
      </div>
    ) : <NoList onUpdate={this.onUpdateCode} />;

    return (
      <>
        {this.getNav()}
        {fetching ? <Loading /> : content}
      </>
    );
  }
}

List.contextType = MainContext;
