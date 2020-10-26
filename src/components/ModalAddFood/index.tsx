import React, { useRef, useCallback } from 'react';
import { FiClipboard, FiTag, FiDollarSign, FiAlignLeft } from 'react-icons/fi';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface ICategory {
  id: string;
  title: string;
  restaurant_id: string;
  available: boolean;
  image_url: string;
}

interface IExtras {
  name: string;
  price: number;
}

interface IFood {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  extras?: IExtras[];
  category: ICategory;
  available: boolean;
}

interface ICreateFoodData {
  title: string;
  description: string;
  price: number;
  image_url: string;
  extras?: IExtras[];
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => any;
  handleAddFood: (
    food: Omit<IFood, 'id' | 'available' | 'category' | 'restaurant'>,
  ) => void;
}

const ModalAddFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddFood,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateFoodData) => {
      handleAddFood(data);
      setIsOpen();
    },
    [handleAddFood, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input
          name="image_url"
          icon={FiClipboard}
          labelName="Cole o link aqui"
        />
        <Input name="title" icon={FiTag} labelName="Ex: Moda Italiana" />
        <Input name="price" icon={FiDollarSign} labelName="Ex: 19.90" />
        <Input name="description" icon={FiAlignLeft} labelName="Descrição" />
        <button type="submit">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
