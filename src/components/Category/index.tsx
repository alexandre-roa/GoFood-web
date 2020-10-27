import React, { ButtonHTMLAttributes, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FiTrash } from 'react-icons/fi';
import api from '../../services/api';

import { Container } from './styles';

interface ICategory extends ButtonHTMLAttributes<HTMLButtonElement> {
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

  const history = useHistory();

  async function toggleAvailable(): Promise<void> {
    try {
      await api.patch(`/foods/${category.id}/category_availability`, {
        availability: !isAvailable,
      });

      setIsAvailable(!isAvailable);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSelectCategory = useCallback(
    (category_id: string) => {
      history.push(`/foods/${category_id}`);
    },
    [history],
  );

  return (
    <Container available={isAvailable}>
      <header>
        <img src={category.image_url} alt={category.title} />
      </header>
      <button type="button" onClick={() => handleSelectCategory(category.id)}>
        <section className="body">
          <h2>{category.title}</h2>
        </section>
      </button>
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
