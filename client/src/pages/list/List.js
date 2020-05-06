import React, { Component } from 'react';
import NoSleep from 'nosleep.js';
import { toast } from 'react-toastify';

import MainContext from '../../services/context';
import api from '../../services/api';
import ListDb from '../../services/list';
import Nav, { NavButton } from '../../components/Nav';
import Icon from '../../components/Icon';
import NoList from './components/NoList';
import './List.scss';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.noSleep = new NoSleep();
    this.listDb = null;
    this.state = {
      keepAwake: false,
      fetching: true,
      list: null,
      newItem: '',
      editing: null,
    };
  }

  async componentDidMount() {
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

  getNav = () => (
    <Nav page="list">
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
    this.listDb.name = code;

    let list = await this.listDb.getList(5000);
    if (!list) {
      list = { name: code, list: [] };
      await this.listDb.updateLocalList(list);
    } else {
      this.setState({ list });
    }
  };

  getListItem = (item, index) => (
    <div key={`item-${index}`} className="item-wrapper">
      <label className="input-container">
        <input type="checkbox" />
        <span
          className="checkmark box"
          onClick={() => {
            console.log('remove');
            this.listDb.removeItem(item);
          }}
        />
        <span className="item">
          <span>{item}</span>
          <button
            type="button"
            onClick={() => {
              this.setState({
                editing: item,
                newItem: item,
              });
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
    if (newItem) {
      if (editing) {
        this.listDb.updateItem(editing, newItem);
      } else {
        this.listDb.addItem(newItem);
      }
      this.setState({
        editing: null,
        newItem: '',
      });
    }
  }

  render() {
    const { fetching, list } = this.state;

    const content = list ? (
      <div id="list-wrapper">
        <div id="new-item">
          <input
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
          <div id="list">
            {list.list.map((item, i) => this.getListItem(item, i))}
          </div>
        </div>
      </div>
    ) : <NoList onUpdate={this.onUpdateCode} />;

    return (
      <>
        {this.getNav()}
        {fetching ? null : content}
      </>
    );
  }
}

List.contextType = MainContext;
