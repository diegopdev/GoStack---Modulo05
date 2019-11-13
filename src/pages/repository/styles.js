import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 30px;
  }

  h1: {
    font-size: 24px;
    margin-top: 10px;
  }
  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssuesList = styled.ul`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const ButtonContainer = styled.div`
  flex: 1;
  margin-top: 10px;
`;

export const ButtonFilter = styled.button`
  margin-left: 10px;
  padding: 10px 15px;
  border-radius: 4px;
  border: solid 1px #eee;
  font-size: 12px;
  font-weight: bold;
  color: ${props => (props.activity ? '#fff' : '#999')};
  background: ${props => (props.activity ? '#7159c1' : '#eee')};

  &:hover {
    background-color: #7159c1;
    color: #fff;
  }
`;

export const ButtonPageContainer = styled.div`
  display: flex;
  flex: 1;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonPage = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  border: solid 1px #eee;
  border-radius: 4px;
  background-color: #eee;

  &:hover {
    background-color: #7159c1;
    color: #fff;
  }

  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
