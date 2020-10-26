import React, { useCallback, useState } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';
import api from '../../services/api';

import { Container } from './styles';

interface ICategory {
  id: string;
  title: string;
  restaurant_id: string;
  available: boolean;
  image_url: string;
}

interface IRestaurant {
  id: string;
  name: string;
  email: string;
  restaurant_category: string;
}

interface IExtras {
  name: string;
  price: number;
}

interface IFoodPlate {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  extras?: IExtras[];
  category: ICategory;
  available: boolean;
  restaurant: IRestaurant;
}

interface IProps {
  food: IFoodPlate;
  handleDelete: (id: string) => {};
  handleEditFood: (food: IFoodPlate) => void;
}

const Food: React.FC<IProps> = ({
  food,
  handleDelete,
  handleEditFood,
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(food.available);

  const toggleAvailable = useCallback(async (): Promise<void> => {
    try {
      await api.put(`/foods/${food.id}`, {
        ...food,
        available: !isAvailable,
      });

      setIsAvailable(!isAvailable);
    } catch (err) {
      console.log(err);
    }
  }, [food, isAvailable]);

  const setEditingFood = useCallback(() => {
    handleEditFood(food);
  }, [food, handleEditFood]);

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image_url} alt={food.title} />
      </header>
      <section className="body">
        <h2>{food.title}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingFood()}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export default Food;
