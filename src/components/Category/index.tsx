import React, { useState } from 'react';

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

interface IProps {
  category: ICategory;
  handleDelete: (id: string) => {};
}

const Category: React.FC<IProps> = ({ category, handleDelete }: IProps) => {
  const [isAvailable, setIsAvailable] = useState(category.available);

  async function toggleAvailable(): Promise<void> {
    try {
      await api.patch(`/foods/${category.id}/availability`, {
        availability: !isAvailable,
      });

      setIsAvailable(!isAvailable);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={category.image_url} alt={category.title} />
      </header>
      <section className="body">
        <h2>{category.title}</h2>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(category.id)}
            data-testid={`remove-food-${category.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${category.id}`} className="switch">
            <input
              id={`available-switch-${category.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${category.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export default Category;
