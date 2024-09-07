import React, { useState } from 'react';
import { Table, Card, CardBody, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Address, AddressFormData } from '../../types';
import AddressUpdateFormModal from '../AddressUpdateFormModal';


interface AddressesListProps {
  addresses: Address[];
  loading: boolean;
  error: string | null;
  onAddressEdit: (formData: AddressFormData) => void;
}

export default function AddressesList ({ addresses, loading, error, onAddressEdit }: AddressesListProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const handleEditClick = (address: Address) => {
    setSelectedAddress(address);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAddress(null);
  };

  const handleSubmit = (formData: AddressFormData) => {
    onAddressEdit(formData);
    handleCloseModal();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
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
                  <Button color="primary" size="sm" className="m-2" onClick={() => handleEditClick(address)}>
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
      </CardBody>
      {selectedAddress && (
        <AddressUpdateFormModal
          visible={modalVisible}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          address={selectedAddress}
        />
      )}
    </Card>
  );
};
