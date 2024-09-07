import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Button, ModalContent } from '@nextui-org/react';
import axios from 'axios';
import { Address, AddressFormData } from '../../types';

interface AddressUpdateFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (formData: AddressFormData) => void;
  address: Address | null;
}

export default function AddressUpdateFormModal({ visible, onClose, onSubmit, address }: AddressUpdateFormModalProps) {
  const [formData, setFormData] = useState<AddressFormData>({
    id: address?.id,
    zipCode: '',
    street: '',
    complement: '',
    neighborhood: '',
    number: '',
    city: '',
    uf: '',
  });

  useEffect(() => {
    if (address) {
      setFormData({
        id: address.id,
        zipCode: address.zipCode || '',
        street: address.street || '',
        complement: address.complement || '',
        neighborhood: address.neighborhood || '',
        number: address.number || '',
        city: address.city || '',
        uf: address.uf || '',
      });
    }
  }, [address]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (name === 'zipCode' && value.length === 8) {
      const url = `https://viacep.com.br/ws/${value}/json/`;
      try {
        const response = await axios.get(url);
        setFormData((prev) => ({
          ...prev,
          street: response.data.logradouro || prev.street,
          neighborhood: response.data.bairro || prev.neighborhood,
          city: response.data.localidade || prev.city,
          uf: response.data.uf || prev.uf,
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={visible}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader>
          <span id="modal-title">Atualizar Endereço</span>
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
  );
}
