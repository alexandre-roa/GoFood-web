import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import api from '../../services/api';

import Category from '../../components/Category';
import ModalAddCategory from '../../components/ModalAddCategory';
// import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';
import { useAuth } from '../../hooks/auth';

interface ICategory {
  id: string;
  title: string;
  restaurant_id: string;
  available: boolean;
  image_url: string;
}

const Dashboard: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  // const [editingFood, setEditingFood] = useState<ICategory>({} as ICategory);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { restaurant } = useAuth();

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      try {
        const response = await api.get(`/foods/${restaurant.id}/categories`);

        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    loadFoods();
  }, []);

  async function handleAddCategory(
    category: Omit<ICategory, 'id' | 'restaurant_id'>,
  ): Promise<void> {
    try {
      const response = await api.post(
        `foods/${restaurant.id}/create_category`,
        {
          ...category,
        },
      );

      setCategories([...categories, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  // async function handleUpdateFood(
  //   food: Omit<IFoodPlate, 'id' | 'available'>,
  // ): Promise<void> {
  //   try {
  //     const response = await api.put(`/foods/${editingFood.id}`, {
  //       ...food,
  //     });

  //     setEditingFood(response.data);

  //     const updatedFoods = categories.filter(item => item.id !== response.data.id);

  //     setCategories([...updatedFoods, response.data]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async function handleDeleteCategory(id: string): Promise<void> {
    try {
      const updatedFoods = categories.filter(category => category.id !== id);

      api.delete(`/foods/category/${id}`);

      setCategories(updatedFoods);
    } catch (err) {
      console.log(err);
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  // function handleEditFood(food: IFoodPlate): void {
  //   setEditModalOpen(true);
  //   setEditingFood(food);
  // }

  return (
    <>
      <Header openModal={toggleModal} restaurantName={restaurant.name}>
        {' '}
        <br />
        Selecione ou crie uma categoria <br />
        para <strong>adicionar os pratos</strong>
      </Header>
      <ModalAddCategory
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddCategory={handleAddCategory}
      />
      {/* <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      /> */}
      <FoodsContainer data-testid="foods-list">
        {categories &&
          categories.map(category => (
            <Category
              key={category.id}
              category={category}
              handleDelete={handleDeleteCategory}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
