import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Icon, { iconList } from './Icon';
import './Nav.scss';

const PAGES = {
  recipes: 'Rezepte',
  list: 'Einkaufsliste',
  plan: 'Wochenplan',
};

const Nav = ({ page, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div id="menu">
        <button type="button" className="menu-button" onClick={() => setOpen(!open)}>
          <Icon name="menu" color="#333" />
        </button>
        <div className={open ? 'hidden' : ''} id="current-page">{PAGES[page]}</div>
        <div className="right-buttons">{children}</div>
      </div>
      <div className={open ? 'open' : ''} id="nav-wrapper">
        <Link className={page === 'recipes' ? 'active' : ''} to="/">Rezepte</Link>
        <Link className={page === 'list' ? 'active' : ''} to="/list">Einkaufsliste</Link>
        <Link className={page === 'plan' ? 'active' : ''} to="/plan">Wochenplan</Link>
        <div className="right-buttons">{children}</div>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  page: PropTypes.oneOf(Object.keys(PAGES)).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Nav.defaultProps = {
  children: undefined,
};

export default Nav;

export const NavButton = ({
  icon, onClick, link, hasActiveState = false,
}) => {
  const [active, setActive] = useState(false);
  const className = `nav-button${active ? ' active' : ''}`;

  return link ? (
    <Link className={className} to={link}>
      <Icon name={icon} />
    </Link>
  ) : (
    <button
      className={className} type="button"
      onClick={() => {
        onClick();
        if (hasActiveState) {
          setActive(!active);
        }
      }}
    >
      <Icon name={icon} />
    </button>
  );
};

NavButton.propTypes = {
  icon: PropTypes.oneOf(Object.keys(iconList)).isRequired,
  onClick: PropTypes.func,
  link: PropTypes.string,
  hasActiveState: PropTypes.bool,
};

NavButton.defaultProps = {
  onClick: undefined,
  link: undefined,
  hasActiveState: false,
};
