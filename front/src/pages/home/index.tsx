import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import { Address, AddressFormData } from '../../types';
import { API_ENDPOINT } from '../../env';
import './styles.css';
import AddressesList from '../../components/AddressesList';

export default function Home() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const isAuthenticated = sessionStorage.getItem('accessToken');
        if (!isAuthenticated) return;

        const response = await axios.get<Address[]>(`${API_ENDPOINT}/address`, {
          headers: {
            'Authorization': `Bearer ${isAuthenticated}`
          }
        });
        setAddresses(response.data);
      } catch (error: any) {
        setError(error.message || 'Error fetching addresses');
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddressSubmit = async (formData: AddressFormData) => {
    const accessToken = sessionStorage.getItem('accessToken');
    try {
      const response = await axios.post(`${API_ENDPOINT}/address`, formData, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });
      if (response.status === 201) {
        setAddresses((prevAddresses) => [...prevAddresses, response.data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddressEdit = async (formData: AddressFormData) => {
    const accessToken = sessionStorage.getItem('accessToken');
    if(!accessToken || !formData.id) return;
    try {
      const response = await axios.put(`${API_ENDPOINT}/address/${formData.id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });
      if (response.status === 200) {
        const index = addresses.findIndex((address) => address.id === formData.id);
        addresses[index] = response.data;
        setAddresses([...addresses]);
        // setAddresses((prevAddresses) => [...prevAddresses, response.data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <>
      <NavBar onAddressSubmit={handleAddressSubmit} />
      <AddressesList addresses={addresses} loading={loading} error={error} onAddressEdit={handleAddressEdit} />
      </>
  );
};