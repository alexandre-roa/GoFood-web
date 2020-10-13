/* eslint-disable no-nested-ternary */
import styled, { css } from 'styled-components';
import ReactSelect from 'react-select';
import Tooltip from '../Tooltip';

interface IContainerProps {
  isErrored: boolean;
}

interface IOptionProps {
  data: {
    color: string;
  };
  isDisabled: boolean;
  isFocused: boolean;
  isSelected: boolean;
  color: boolean | string;
}

export const Container = styled.div<IContainerProps>`
  position: relative;
  background: #f4ede8;
  border-radius: 10px;
  border: 2px solid #fff;
  padding: 16px;
  width: 100%;
  color: #666360;
  height: 56px;

  display: flex;
  align-items: center;
  justify-content: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #c72828;

    &::placeholder {
      color: #c53030;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Select = styled(ReactSelect).attrs({
  styles: {
    control: (styles: any, state: IOptionProps) => ({
      ...styles,
      backgroundColor: '',
      boxShadow: state.isDisabled
        ? null
        : state.isSelected
        ? '0 0 0 1px #ffb84d'
        : state.isFocused
        ? '0 0 0 1px #ffb84d'
        : null,
    }),
    option: (styles: any, state: IOptionProps) => {
      return {
        ...styles,
        backgroundColor: state.isDisabled
          ? null
          : state.isSelected
          ? '#ffb84d80'
          : state.isFocused
          ? 'rgba(193, 66, 66, 0.1)'
          : null,
        color: state.isDisabled
          ? '#fff'
          : state.isSelected
          ? '#c72828'
          : '#c72828',
        cursor: state.isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          borderColor:
            !state.isDisabled &&
            (state.isSelected ? state.data.color : 'rgba(193, 66, 66, 0.1)'),
          backgroundColor:
            !state.isDisabled &&
            (state.isSelected ? state.data.color : 'rgba(193, 66, 66, 0.1)'),
        },
      };
    },
    input: (styles: any) => ({ ...styles }),
    placeholder: (styles: any) => ({ ...styles }),
    singleValue: (styles: any) => ({
      ...styles,
      color: '#c72828',
    }),
  },
})`
  flex: 1;
  align-items: center;
  justify-content: center;

  ${props =>
    props.isErrored &&
    css`
      padding: 50px;
    `}

  > div {
    border: 0;

    &:hover {
      border-color: #c72828;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 0px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #f4ede8;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
