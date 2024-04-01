import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { ROUTES } from '../../routes/routes';
import logo from '../../assets/images/logo.jpg';
import './NavibarStyles.css';

export const Navibar = () => {
  return (
    <Navbar expand="sm" variant="dark" className="navbar">
      <Nav className="mr-auto nav-link ">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to={ROUTES.MAIN} className="nav-link">
              <img src={logo} alt="logo" className="logo" />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={ROUTES.MAIN} className="nav-link">
              Главная
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={ROUTES.SEARCH} className="nav-link">
              Поиск
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={ROUTES.HISTORY} className="nav-link">
              История
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={ROUTES.FAVORITES} className="nav-link">
              Избранное
            </NavLink>
          </li>
          <input
            className="form-control me-2 input"
            type="search"
            placeholder="Поиск"
            aria-label="Search"
          />
          <li className="nav-item">
            <NavLink to={ROUTES.SIGNUP} className="nav-link">
              Регистрация
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={ROUTES.SIGNIN} className="nav-link">
              Войти
            </NavLink>
          </li>
        </ul>
        <form className="d-flex"></form>
      </Nav>
    </Navbar>
  );
};
