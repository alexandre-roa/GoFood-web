import React, { Component, HTMLAttributes, ReactElement } from 'react';

import { FiChevronLeft, FiPlusSquare, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import { Container, BackToDashboard } from './styles';

interface IHeaderProps extends HTMLAttributes<HTMLDivElement> {
  openModal: () => any;
  restaurantName?: string;
  categoryName?: string;
  children?: any;
  foodPage?: boolean;
}

const Header: React.FC<IHeaderProps> = ({
  openModal,
  restaurantName,
  categoryName,
  children,
  foodPage,
}) => {
  const { signOut } = useAuth();

  return (
    <Container>
      <header>
        <div>
          {foodPage ? (
            <>
              <BackToDashboard>
                <FiChevronLeft />
                Voltar
              </BackToDashboard>
              <h1>
                <strong>{categoryName}</strong> <br />
              </h1>
            </>
          ) : (
            <h1>
              Bem vindo, <strong>{restaurantName}</strong> <br />
            </h1>
          )}

          <p>{children}</p>
        </div>
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
