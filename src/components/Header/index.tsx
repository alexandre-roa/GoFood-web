import React from 'react';

import { FiPlusSquare, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import { Container } from './styles';

interface IHeaderProps {
  openModal: () => void;
  restaurantName: string;
}

const Header: React.FC<IHeaderProps> = ({ openModal, restaurantName }) => {
  const { signOut } = useAuth();

  return (
    <Container>
      <header>
        <h1>
          Bem vindo, <strong>{restaurantName}</strong>
        </h1>
        <nav>
          <div>
            <button type="button" onClick={() => openModal()}>
              <div className="text">Criar Categoria</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
