import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FiChevronLeft } from 'react-icons/fi';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import Header from '../../components/Header';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

interface IRestaurant {
  id: string;
  name: string;
  email: string;
  restaurant_category: string;
}

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

interface IRouteParams {
  category_id: string;
}

interface IFood {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  extras?: IExtras[];
  category: ICategory;
  restaurant: IRestaurant;
  available: boolean;
}

const Foods: React.FC = () => {
  const { category_id } = useParams<IRouteParams>();
  const { restaurant } = useAuth();

  const [category, setCategory] = useState<ICategory>({} as ICategory);
  const [foods, setFoods] = useState<IFood[]>([]);
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      try {
        const response = await api.get(
          `/foods/${restaurant.id}/category_food/${category_id}`,
        );

        setCategory(response.data);
        setFoods(response.data.foods);
      } catch (err) {
        console.log(err);
      }
    }

    loadFoods();
  }, [category_id, restaurant.id]);

  const handleAddFood = useCallback(
    async (
      food: Omit<IFood, 'id' | 'available' | 'category' | 'restaurant'>,
    ): Promise<void> => {
      try {
        const response = await api.post(
          `/foods/${category_id}/${restaurant.id}`,
          {
            ...food,
            available: true,
          },
        );

        setFoods([...foods, response.data]);
      } catch (err) {
        console.log(err);
      }
    },
    [category_id, foods, restaurant.id],
  );

  const handleUpdateFood = useCallback(
    async (
      food: Omit<IFood, 'id' | 'available' | 'category' | 'restaurant'>,
    ): Promise<void> => {
      try {
        const response = await api.put(`/foods/${editingFood.id}`, {
          ...food,
        });

        setEditingFood(response.data);

        const updatedFoods = foods.filter(item => item.id !== response.data.id);

        setFoods([...updatedFoods, response.data]);
      } catch (err) {
        console.log(err);
      }
    },
    [editingFood.id, foods],
  );

  const handleDeleteFood = useCallback(
    async (id: string): Promise<void> => {
      const updatedFoods = foods.filter(item => item.id !== id);
      api.delete(`/foods/${id}`);

      setFoods(updatedFoods);
    },
    [foods],
  );

  const toggleModal = useCallback((): any => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const toggleEditModal = useCallback((): any => {
    setEditModalOpen(!editModalOpen);
  }, [editModalOpen]);

  const handleEditFood = useCallback((food: IFood): void => {
    setEditModalOpen(true);
    setEditingFood(food);
  }, []);

  console.log(foods);
  return (
    <>
      <Header foodPage categoryName={category.title} openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      {/* <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      /> */}

      <FoodsContainer>
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Foods;
