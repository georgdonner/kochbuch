import React, { Component } from 'react';
import NoSleep from 'nosleep.js';
import { toast } from 'react-toastify';
import { ReactSortable } from 'react-sortablejs';
import Modal from 'react-modal';

import MainContext from '../../services/context';
import api from '../../services/api';
import ListDb, { sendRemovedItemBeacon } from '../../services/list';
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
      availableCategories: null,
      fetching: true,
      list: null,
      newItem: '',
      editing: null,
      toRemove: null,
      removed: [],
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
    await this.fetchList(listCode);
    this.fetchCategories();
    this.setState({
      fetching: false,
    });
    window.addEventListener('unload', () => {
      if (this.state.toRemove) {
        sendRemovedItemBeacon(this.state.toRemove);
      }
    });
  }

  async componentWillUnmount() {
    toast.dismiss();
  }

  fetchList = async (listCode) => {
    let list = await this.listDb.getList(5000);
    if (listCode && !list) {
      list = { name: listCode, list: [] };
      await this.listDb.updateLocalList(list);
    } else if (list) {
      this.setState({ list });
    }
  }

  fetchCategories = async () => {
    const availableCategories = await api.get('/list/profile/categories');
    this.setState({ availableCategories });
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
    if (this.state.toRemove) {
      toast.dismiss();
      this.setState((state) => ({
        removed: state.removed.concat(state.toRemove),
      }));
      this.listDb.removeItems(this.state.toRemove);
    }

    const origItem = this.state.list.list.find((item) => item.id === id);
    this.setState((state) => ({
      list: { ...state.list, list: state.list.list.filter((item) => item.id !== id) },
      toRemove: id,
    }));
    const undo = () => {
      this.setState((state) => ({
        list: { ...state.list, list: state.list.list.concat([origItem]) },
        toRemove: null,
      }));
    };
    toast(<ToastUndo undo={undo} label={`${origItem.name} entfernt.`} />, {
      onClose: () => {
        if (this.state.toRemove === id) {
          this.setState((state) => ({
            removed: state.removed.concat(state.toRemove),
            toRemove: null,
          }));
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
                editing: item,
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
    if (this.state.toRemove) {
      await this.listDb.removeItems(this.state.toRemove);
      this.setState({ toRemove: null });
    }
    if (newItem) {
      if (editing) {
        this.listDb.updateItem(editing.id, { name: newItem });
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
    const {
      fetching, list, choosingProfile, toRemove, removed, editing,
    } = this.state;

    let content;
    if (!list) {
      content = <NoList onUpdate={this.onUpdateCode} />;
    } else {
      const listItems = list.list.filter(({ id }) => id !== toRemove && !removed.includes(id));
      const isSorted = listItems.some(({ category }) => category);

      content = (
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
          <div id="new-item-wrapper" className={editing ? 'sticky' : ''}>
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
              {this.state.availableCategories && editing && isSorted ? (
                <div className="select">
                  <select
                    value={(editing.category && editing.category._id) || 'none'}
                    onChange={({ target }) => {
                      this.listDb.updateItem(editing.id,
                        { category: target.value, name: this.state.newItem },
                      );
                      this.setState({ editing: null, newItem: '' });
                    }}
                  >
                    {!editing.category ? <option key="none" value="none">Kategorie auswählen</option> : null}
                    {this.state.availableCategories.map((category) => (
                      <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              ) : null}
            </div>
          </div>
          <div id="list-container">
            {isSorted ? (
              <div id="list">
                {groupByCategory(listItems)
                  .map((category) => (
                    <div key={category._id || 'none'} className="ctg-wrapper">
                      <div className="ctg-label">{category.name || 'Unsortiert'}</div>
                      {category.items.map((item) => this.getListItem(item))}
                    </div>
                  ))}
              </div>
            ) : (
              <ReactSortable
                list={listItems} id="list"
                setList={() => {}} delay={250}
                onUpdate={({ oldIndex, newIndex }) => {
                  if (oldIndex !== newIndex) {
                    this.listDb.moveItem(list.list[oldIndex].id, newIndex);
                  }
                }}
              >
                {listItems.map((item) => this.getListItem(item))}
              </ReactSortable>
            )}
            {list.list.length > 5 ? (
              <div style={{ textAlign: 'center' }}>
                <button className="button" id="remove-all" type="button" onClick={() => {
                  this.listDb.removeItems(list.list.map(({ id }) => id));
                }}
                >
                  Alle entfernen
                </button>
              </div>
            ) : null}
          </div>
        </div>
      );
    }


    return (
      <>
        {this.getNav()}
        {fetching ? <Loading /> : content}
      </>
    );
  }
}

List.contextType = MainContext;
