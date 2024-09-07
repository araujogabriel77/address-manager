import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Card, CardBody, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { Address } from '../../types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles.css';

export default function Home() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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
        setError(error.message || 'Error fetching addresses');
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
      <Card >
      <NavBar />
        <CardBody>
          <div>
            <Table aria-label="Address List">
              <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>Cep</TableColumn>
                <TableColumn>Logradouro</TableColumn>
                <TableColumn>Bairro</TableColumn>
                <TableColumn>Complemento</TableColumn>
                <TableColumn>Cidade</TableColumn>
                <TableColumn>UF</TableColumn>
                <TableColumn>Ações</TableColumn>
              </TableHeader>
              <TableBody>
                {addresses.map((address) => (
                  <TableRow key={address.id}>
                    <TableCell>{address.id}</TableCell>
                    <TableCell>{address.zipCode}</TableCell>
                    <TableCell>{address.street}</TableCell>
                    <TableCell>{address.neighborhood}</TableCell>
                    <TableCell>{address.complement}</TableCell>
                    <TableCell>{address.city}</TableCell>
                    <TableCell>{address.uf}</TableCell>
                    <TableCell>
                      <Button color="primary" size="sm" className="m-2">
                      <EditIcon fontSize="small" />
                      </Button>
                      <Button color="danger" size="sm" className="m-2">
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
  );
};