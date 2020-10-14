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

interface ICreateCategory {
  title: string;
  available: boolean;
  image_url: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddCategory: (food: Omit<ICategory, 'id' | 'restaurant_id'>) => void;
}

const ModalAddCategory: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddCategory,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateCategory) => {
      handleAddCategory(data);
      setIsOpen();
    },
    [handleAddCategory, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Criar Categoria</h1>
        <Input name="title" icon={FiTag} labelName="Nome da Categoria" />
        <Input name="image_url" icon={FiTag} labelName="Link da imagem" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Categoria</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddCategory;
