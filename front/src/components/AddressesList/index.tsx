import { useState } from 'react';
import { Table, Card, CardBody, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Address, AddressFormData } from '../../types';
import AddressUpdateFormModal from '../AddressUpdateFormModal';
import ConfirmationModal from '../ConfirmationModal';


interface AddressesListProps {
  addresses: Address[];
  onAddressEdit: (formData: AddressFormData) => void;
  onAddressDelete: (id: number) => void;
}

export default function AddressesList ({ addresses, onAddressEdit, onAddressDelete }: AddressesListProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);
  

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
  
  const handleDeleteClick = (id: number) => {
    setAddressToDelete(id);
    setConfirmDeleteVisible(true);
  };

  const handleConfirmDelete = () => {
    if (addressToDelete !== null) {
      onAddressDelete(addressToDelete);
      setConfirmDeleteVisible(false);
      setAddressToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDeleteVisible(false);
    setAddressToDelete(null);
  };

  return (
    <Card>
      <CardBody>
        <Table aria-label="Address List">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Cep</TableColumn>
            <TableColumn>Logradouro</TableColumn>
            <TableColumn>Bairro</TableColumn>
            <TableColumn>Nº</TableColumn>
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
                <TableCell>{address.number}</TableCell>
                <TableCell>{address?.complement}</TableCell>
                <TableCell>{address.city}</TableCell>
                <TableCell>{address.uf}</TableCell>
                <TableCell>
                  <Button color="primary" size="sm" className="m-2" onClick={() => handleEditClick(address)}>
                    <EditIcon fontSize="small" />
                  </Button>
                  <Button color="danger" size="sm" className="m-2" onClick={() => handleDeleteClick(address.id)}>
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
      <ConfirmationModal
        visible={confirmDeleteVisible}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        message="Você tem certeza que deseja excluir este endereço?"
      />
    </Card>
  );
};
