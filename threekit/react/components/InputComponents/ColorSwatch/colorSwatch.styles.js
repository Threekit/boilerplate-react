import styled from 'styled-components';

export const ColorSwatchContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;

  & > div:last-child {
    margin-right: 0px;
  }
`;

export const ColorOption = styled.div`
  height: ${(props) => props.size || '30px'};
  width: ${(props) => props.size || '30px'};
  border-radius: 50%;
  background: ${(props) => props.color};

  border: ${(props) => (props.color ? '0px' : '1px solid lightgrey')};

  margin-right: 12px;
  margin-bottom: 25px;

  cursor: ${(props) => (props.isPlayerLoading ? 'wait' : 'pointer')};

  & > div {
    text-align: center;
    color: white;
    height: min-content;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`;
