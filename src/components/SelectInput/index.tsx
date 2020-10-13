/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react';
import { OptionTypeBase, Props as SelectProps } from 'react-select';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error, Select } from './styles';

import api from '../../services/api';

interface ISelectProps extends SelectProps<OptionTypeBase> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

interface IRestaurantCategory {
  id: string;
  category_name: string;
}

const SelectInput: React.FC<ISelectProps> = ({ name, icon: Icon, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  const [options, setOptions] = useState([
    { label: 'Categoria do restaurante...', value: undefined },
  ]);

  useEffect(() => {
    api.get('restaurant_categories').then(response => {
      const formattedCategories = response.data.map(
        (option: IRestaurantCategory) => ({
          label:
            option.category_name.charAt(0).toUpperCase() +
            option.category_name.slice(1),
          value: option.category_name,
        }),
      );

      setOptions(formattedCategories);
    });
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container isErrored={!!error}>
      {Icon && <Icon size={20} />}
      <Select
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        defaultValue={options[0]}
        ref={selectRef}
        options={options}
        label="Choose a libary"
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default SelectInput;
