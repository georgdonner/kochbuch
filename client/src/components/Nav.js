import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

import Icon, { iconList } from './Icon';
import './Nav.scss';

const PAGES = {
  recipes: 'Rezepte',
  list: 'Einkaufsliste',
  plan: 'Wochenplan',
  profile: 'Profil',
};

const Nav = ({ page, children, menuButton: customMenuButton }) => {
  const { isSignedIn } = useAuth();

  const pages = isSignedIn ? PAGES : {
    recipes: PAGES.recipes,
  };

  const [open, setOpen] = useState(false);

  const menuButton = customMenuButton || (
    <button type="button" className="menu-button" onClick={() => setOpen(!open)}>
      <Icon name="menu" color="#333" />
    </button>
  );

  return (
    <nav>
      <div id="menu">
        {isSignedIn ? menuButton : null}
        <div className={open ? 'hidden' : ''} id="current-page">{PAGES[page]}</div>
        <div className="right-buttons">{children}</div>
      </div>
      <div className={open ? 'open' : ''} id="nav-wrapper">
        {Object.entries(pages).map(([key, label]) => (
          <Link
            key={key}
            className={page === key ? 'active' : ''}
            to={key === 'recipes' ? '/' : `/${key}`}
          >
            {label}
          </Link>
        ))}
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
  menuButton: PropTypes.node,
};

Nav.defaultProps = {
  children: undefined,
  menuButton: undefined,
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
