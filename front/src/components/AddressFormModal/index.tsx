import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Button, ModalContent } from '@nextui-org/react';
import { AddressFormData } from '../../types';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';

interface AddressFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (formData: AddressFormData) => void;
}


export default function AddressFormModal({ visible, onClose, onSubmit }: AddressFormModalProps) {
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [errorSnackMessage, setErrorSnackMessage] = useState<string>('Não foi possível concluir a operação.');
  const [formData, setFormData] = useState<AddressFormData>({
    zipCode: '',
    street: '',
    complement: '',
    neighborhood: '',
    number: '',
    city: '',
    uf: '',
  });

  const handleCloseErrorSnackbar = () => {
    setErrorSnackbarOpen(false);
  };

  const handleInputChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if(name === 'zipCode' && value.length === 8) {
      const url = `https://viacep.com.br/ws/${value}/json/`;
      try {
        const response = await axios.get(url);
        if(response.data.erro) throw new Error('CEP não encontrado');

        setFormData((prev) => ({
          ...prev,
          street: response.data.logradouro,
          neighborhood: response.data.bairro,
          city: response.data.localidade,
          uf: response.data.uf,
        }));
      } catch (error: any) {
        setErrorSnackMessage(error.message);
        setErrorSnackbarOpen(true);
      }
    };
  };

  const handleSubmit = () => {
    onSubmit(formData);
    clearFormData();
    onClose();
  };

  const clearFormData = () => {
    setFormData({
      zipCode: '',
      street: '',
      complement: '',
      neighborhood: '',
      number: '',
      city: '',
      uf: '',
    });
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
      <Modal
      backdrop="blur"
      isOpen={visible}
      onClose={onClose}
      >
      <ModalContent>

      <ModalHeader>
        <span id="modal-title">Criar Novo Endereço</span>
      </ModalHeader>
      <ModalBody>
        <Input
          variant='bordered'
          placeholder="CEP"
          aria-label="CEP"
          name="zipCode"
          maxLength={8}
          value={formData.zipCode}
          onChange={handleInputChange}
        />
        <Input
          variant='bordered'
          placeholder="Rua"
          aria-label="Rua"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
        />
        <Input
          variant='bordered'
          placeholder="Complemento (opcional)"
          aria-label="Complemento (opcional)"
          name="complement"
          value={formData.complement || ''}
          onChange={handleInputChange}
        />
        <Input
          variant='bordered'
          placeholder="Bairro"
          aria-label="Bairro"
          name="neighborhood"
          value={formData.neighborhood}
          onChange={handleInputChange}
        />
        <Input
          variant='bordered'
          maxLength={6}
          placeholder="Número"
          aria-label="Número"
          name="number"
          value={formData.number}
          onChange={handleInputChange}
        />
        <Input
          variant='bordered'
          placeholder="Cidade"
          aria-label="Cidade"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        />
        <Input
          variant='bordered'
          placeholder="UF"
          aria-label="UF"
          name="uf"
          value={formData.uf}
          onChange={handleInputChange}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={clearFormData}>
          Limpar
        </Button>
        <Button color="danger" onClick={onClose}>
          Fechar
        </Button>
        <Button 
          color="primary"
          onClick={handleSubmit}
          disabled={!formData.zipCode || !formData.street || !formData.neighborhood || !formData.city || !formData.uf || !formData.number}
          >
          Salvar
        </Button>
      </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  );
};