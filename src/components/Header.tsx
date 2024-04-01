import React from 'react';
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Button,
} from 'react-bootstrap';
import { ROUTES }from '../routes/routes';
// import { useAuth } from '../hooks';

const Navbar = () => {
  // const { logOut, user } = useAuth();
  return (
    <BootstrapNavbar className="bg-body-tertiary">
      <Container>
        <BootstrapNavbar.Brand href={ROUTES.MAIN}>MovieApp</BootstrapNavbar.Brand>
        <Nav className="me-auto">
          <Nav.Item>
            <Nav.Link href={ROUTES.SIGNIN}>
              <Button variant="outline-primary">Регистрация</Button>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={ROUTES.SIGNUP}>
              <Button variant="outline-primary">Войти</Button>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
};

// {!!user && <Button onClick={logOut}>{t('logout')}</Button>}


export default Navbar;