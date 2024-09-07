import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import { Address, AddressFormData } from '../../types';
import { API_ENDPOINT } from '../../env';
import './styles.css';
import AddressesList from '../../components/AddressesList';
import { Snackbar, Alert } from '@mui/material';

export default function Home() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [errorSnackMessage, setErrorSnackMessage] = useState<string>('Não foi possível concluir a operação.');
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState<boolean>(false);
  const [successSnackMessage, setSuccessSnackMessage] = useState<string>('A operação foi realizada com sucesso.');

  const isAuthenticated = (): boolean => {
    return Boolean(sessionStorage.getItem('accessToken'));
  }

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        if (!isAuthenticated()) return;
        const response = await axios.get<Address[]>(`${API_ENDPOINT}/address`, {
          headers: getHeaders()
        });
        setAddresses(response.data);
      } catch (error: any) {
        showErrorSnackbar(error?.response?.data?.message || error.message);
      }
    };

    fetchAddresses();
  }, []);

  const handleCloseErrorSnackbar = () => {
    setErrorSnackbarOpen(false);
  };

  const handleCloseSuccessSnackbar = () => {
    setSuccessSnackbarOpen(false);
  };

  const showErrorSnackbar = (message: string) => {
    setErrorSnackMessage(message);
    setErrorSnackbarOpen(true);
  };

  const showSuccessSnackbar = (message: string) => {
    setSuccessSnackMessage(message);
    setSuccessSnackbarOpen(true);
  };

  const getHeaders = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    return  {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };
  }

  const handleAddressSubmit = async (formData: AddressFormData) => {
    try {
      if (!isAuthenticated()) return;
      const response = await axios.post(`${API_ENDPOINT}/address`, formData, {
        headers: getHeaders()
      });
      if (response.status === 201) {
        showSuccessSnackbar('Endereço cadastrado com sucesso');
        setAddresses((prevAddresses) => [...prevAddresses, response.data]);
      }
    } catch (error: any) {
      showErrorSnackbar(error?.response?.data?.message || error.message);
    }
  };

  const handleAddressEdit = async (formData: AddressFormData) => {
    if (!isAuthenticated() || !formData?.id) return;
    try {
      const response = await axios.put(`${API_ENDPOINT}/address/${formData.id}`, formData, {
        headers: getHeaders()
      });
      if (response.status === 200) {
        const index = addresses.findIndex((address) => address.id === formData.id);
        addresses[index] = response.data;
        setAddresses([...addresses]);
        showSuccessSnackbar('Endereço atualizado com sucesso');
      }
    } catch (error: any) {
      showErrorSnackbar(error?.response?.data?.message || error.message);
    }
  };

  const handleAddressDelete = async (id: number) => {
    if (!isAuthenticated()) return;
    try {
      const response = await axios.delete(`${API_ENDPOINT}/address/${id}`, {
        headers: getHeaders()
      });

      if(response.status === 200) {
        showSuccessSnackbar(response?.data?.message);
        setAddresses((prevAddresses) => prevAddresses.filter(address => address.id !== id));
      }
    } catch (error: any) {
      showErrorSnackbar(error?.response?.data?.message || error.message);
    }
  };

  const exportData = async () => {
    try {
    const headers = ['ID', 'CEP', 'LOGRADOURO', 'COMPLEMENTO', 'BAIRRO', 'NÚMERO', 'CIDADE', 'UF'];
    const csvRows = [];

    csvRows.push(headers.join(','));
  
    addresses.forEach(address => {
      const formattedAddress = `${address.id},${address.zipCode},${address.street},${address.complement},${address.neighborhood},${address.number},${address.city},${address.uf}`;
      csvRows.push(formattedAddress);
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'addresses.csv';
    link.click();

    URL.revokeObjectURL(url);
    } catch (error: any) {
      showErrorSnackbar(error?.response?.data?.message || error.message);
    }
  }

  return (
      <>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseErrorSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        color='danger'
      >
        <Alert
          onClose={handleCloseErrorSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorSnackMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSuccessSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        color='success'
      >
        <Alert
          onClose={handleCloseSuccessSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {successSnackMessage}
        </Alert>
      </Snackbar>
      <NavBar
        onAddressSubmit={handleAddressSubmit}
        onExport={exportData}
        />
      <AddressesList
        addresses={addresses}
        onAddressEdit={handleAddressEdit}
        onAddressDelete={handleAddressDelete}
        />
      </>
  );
};