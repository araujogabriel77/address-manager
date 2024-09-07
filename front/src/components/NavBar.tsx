import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <Navbar shouldHideOnScroll className="flex justify-between full-w">
      <NavbarBrand >
        <h3 color="inherit">
          Gerenciador de Endereços
        </h3>
      </NavbarBrand>
      <NavbarContent>
        <Button color="danger" onClick={handleLogout}>
          Sair
        </Button>
      </NavbarContent>
    </Navbar>
  );
};