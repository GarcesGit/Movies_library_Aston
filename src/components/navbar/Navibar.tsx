import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { ROUTES } from '../../routes/routes';
import { useAuth } from '../../core/hooks';
import './NavibarStyles.css';
import logo from '../../assets/images/logo.jpg';

export const Navibar = () => {
  const { signOut, user } = useAuth();
  return (
    <Navbar expand="sm" bg="dark" variant="dark">
      <Nav className="mr-auto nav-link justify-content-around">
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
          {!!user && (
            <>
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
            </>
          )}
        </ul>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Поиск"
          aria-label="Search"
        />
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {!user ? (
            <>
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
            </>
          ) : (
            <li className="nav-item">
              <Button onClick={signOut} variant="outline-warning">
                Выйти
              </Button>
            </li>
          )}
        </ul>
        <form className="d-flex"></form>
      </Nav>
    </Navbar>
  );
};
