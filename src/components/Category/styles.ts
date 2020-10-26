import styled, { css } from 'styled-components';

interface IFoodPlateProps {
  available: boolean;
}

export const Container = styled.div<IFoodPlateProps>`
  background: #f0f0f5;
  border-radius: 8px;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: inset 0 0 10px #ffb84d;
    cursor: pointer;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  header {
    background: #ffb84d;
    border-radius: 8px 8px 0px 0px;
    height: 192px;
    overflow: hidden;
    transition: 0.3s opacity;
    text-align: center;

    ${props =>
      !props.available &&
      css`
        opacity: 0.3;
      `};

    img {
      pointer-events: none;
      user-select: none;
    }
  }

  section.body {
    padding: 30px;

    h2 {
      color: #3d3d4d;
      text-align: center;
    }

    p {
      color: #3d3d4d;

      margin-top: 16px;
    }

    .price {
      font-style: normal;
      font-size: 24px;
      line-height: 34px;
      color: #39b100;

      b {
        font-weight: 600;
      }
    }
  }

  section.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 20px 30px;
    background: #e4e4eb;
    border-radius: 0px 0px 8px 8px;

    div.icon-container {
      display: flex;

      button {
        background: #fff;
        height: 56px;
        border-radius: 10px;
        border: 0;
        padding: 0 16px;
        color: #e83f5b;
        width: 100%;
        font-weight: 500;
        margin-top: 16px;
        transition: background-color 0.3s;
        svg {
          color: #3d3d4d;
        }

        & + button {
          margin-left: 6px;
        }

        &:hover {
          background: #c72828;
          svg {
            color: #fff;
          }
        }
      }
    }

    div.availability-container {
      display: flex;
      align-items: center;

      p {
        color: #3d3d4d;
      }

      .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 32px;
        margin-left: 12px;

        & input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #c72828;
          -webkit-transition: 0.4s;
          transition: 0.4s;
          border-radius: 16px;

          &:before {
            position: absolute;
            content: '';
            height: 20px;
            width: 20px;
            left: 0px;
            bottom: 6px;
            background-color: white;
            -webkit-transition: 0.4s;
            transition: 0.4s;
            border-radius: 10px;
          }
        }

        input:checked + .slider {
          background-color: #39b100;
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #2196f3;
        }

        input:checked + .slider:before {
          -webkit-transform: translateX(32px);
          -ms-transform: translateX(32px);
          transform: translateX(32px);
        }
      }
    }
  }
`;
