import React, { Component } from 'react';
import NoSleep from 'nosleep.js';
import { toast } from 'react-toastify';

import MainContext from '../../services/context';
import Nav, { NavButton } from '../../components/Nav';
import NoList from './components/NoList';
import './List.scss';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.noSleep = new NoSleep();
    this.state = {
      keepAwake: false,
    };
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

  render() {
    return (
      <>
        {this.getNav()}
        {this.context.user.listCode ? (
          <div>List</div>
        ) : <NoList />}
      </>
    );
  }
}

List.contextType = MainContext;
