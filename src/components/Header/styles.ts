import styled from 'styled-components';

export const Container = styled.div`
  background: #c72828;
  padding: 30px 0;

  header {
    width: 1280px;
    margin: 0 auto;
    padding: 0 0 160px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      color: #fff;

      strong {
        color: #ffb84d;
      }
    }

    nav {
      display: flex;
      align-items: center;
      div {
        padding: 0 56px 0;
        button {
          font-weight: 600;
          border-radius: 8px;
          border: 0;
          background: #39b100;
          color: #fff;

          display: flex;
          flex-direction: row;
          align-items: center;

          .text {
            padding: 16px 24px;
          }

          .icon {
            display: flex;
            padding: 16px 16px;
            background: #41c900;
            border-radius: 0 8px 8px 0;
            margin: 0 auto;
          }
        }
      }
      button {
        margin-left: auto;
        background: transparent;
        border: 0;

        svg {
          color: #fff;
          width: 25px;
          height: 25px;
        }
      }
    }
  }
`;
