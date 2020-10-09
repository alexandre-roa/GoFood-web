import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface IRestaurant {
  id: string;
  name: string;
  email: string;
  restaurant_category: string;
}

interface IAuthState {
  token: string;
  restaurant: IRestaurant;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  restaurant: IRestaurant;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
  updateRestaurant(restaurant: IRestaurant): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@GoFood:token');
    const restaurant = localStorage.getItem('@GoFood:restaurant');

    if (token && restaurant) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, restaurant: JSON.parse(restaurant) };
    }

    return {} as IAuthState;
  });

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoFood:token');
    localStorage.removeItem('@GoFood:restaurant');

    setData({} as IAuthState);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('restaurant/session', {
      email,
      password,
    });

    const { token, restaurant } = response.data;

    localStorage.setItem('@GoFood:token', token);
    localStorage.setItem('@GoFood:restaurant', JSON.stringify(restaurant));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, restaurant });
  }, []);

  const updateRestaurant = useCallback(
    (restaurant: IRestaurant) => {
      localStorage.setItem('@GoFood:restaurant', JSON.stringify(restaurant));

      setData({
        token: data.token,
        restaurant,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ restaurant: data.restaurant, signIn, signOut, updateRestaurant }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
