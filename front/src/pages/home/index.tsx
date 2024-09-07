import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Card, CardBody, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { Address } from '../../types';

export default function Home() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const isAuthenticated = sessionStorage.getItem('accessToken');
        if (!isAuthenticated) {
          navigate('/'); 
          return;
        }

        const response = await axios.get<Address[]>('http://localhost:3000/api/address', {
          headers: {
            'Authorization': `Bearer ${isAuthenticated}`
          }
        });
        setAddresses(response.data);
      } catch (error: any) {
        console.log(error.message || 'Error fetching addresses');
      }
    };

    fetchAddresses();
  }, [navigate]);


  return (
    <>
    <NavBar />
      <Card>
        <CardBody>
          <Table aria-label="Address List">
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>Cep</TableColumn>
              <TableColumn>Logradouro</TableColumn>
              <TableColumn>Bairro</TableColumn>
              <TableColumn>Complemento</TableColumn>
              <TableColumn>Cidade</TableColumn>
              <TableColumn>UF</TableColumn>
              <TableColumn className="mx-8">Ações</TableColumn>
            </TableHeader>
            <TableBody>
              {addresses.map((address) => (
                <TableRow key={address.id}>
                  <TableCell>{address.id}</TableCell>
                  <TableCell>{address.zipCode}</TableCell>
                  <TableCell>{address.street}</TableCell>
                  <TableCell>{address.neighborhood}</TableCell>
                  <TableCell>{address?.complement}</TableCell>
                  <TableCell>{address.city}</TableCell>
                  <TableCell>{address.uf}</TableCell>
                  <TableCell>
                    <Button color="primary" className="mx-8">
                      Editar
                    </Button>
                    <Button color="danger">
                      Remover
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      </>
  );
};