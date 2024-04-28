import styled from '@emotion/styled';

export const Languages = styled.div`
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

export const Button = styled.button`
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 10px;
  min-width: 100px;
  height: 38px;
  border: ${({ selected }) => (selected ? '1px solid #00b9ae' : '1px solid #E3E3E3')};
  color: ${({ selected }) => (selected ? '#00b9ae' : '#646464')};
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.42px;
  display: flex;
  align-items: center;
  border-radius: 36px;

  :hover {
    border: 1px solid #d1d1d1;
  }
`;
