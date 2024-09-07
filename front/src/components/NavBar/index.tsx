import React, { useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, Button, Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { AddressFormData } from '../../types';
import AddressFormModal from '../AddressFormModal';

interface NavBarProps {
  onAddressSubmit: (formData: AddressFormData) => void;
  onExport:() => void;
}

export default function NavBar({ onAddressSubmit, onExport }: NavBarProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (formData: AddressFormData) => {
    onAddressSubmit(formData);
    closeModal();
  };

  const handleExport = () => {
    onExport();
  }

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <>
    <Navbar shouldHideOnScroll maxWidth='full' className='flex flex-col'>
      <NavbarBrand>
        <Image src="/logo.png" width="40" height="40" alt="logo"/>
        <h3 color="inherit"  className="mx-4 hidden md:flex">
          Gerenciador de Endereços
        </h3>
      </NavbarBrand>
      <NavbarContent  justify='center'>
        <Button color="success" size="sm" onClick={openModal} className='w-[40px] text-light sm:w-[120px]'>
          <span className='hidden sm:inline'>Novo Endereço</span>
        <AddIcon fontSize="small"/>
        </Button>

        <Button color="primary" size="sm" onClick={handleExport}>
          <span className='hidden sm:inline'>Exportar</span>
        <FileDownloadIcon fontSize="small"/>
        </Button>
      </NavbarContent>
      <NavbarContent justify='end'>
        <Button color="danger" size="sm" onClick={handleLogout}>
        <LogoutIcon fontSize="small"/>
        </Button>
      </NavbarContent>
    </Navbar>
    <AddressFormModal
        visible={modalVisible}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};