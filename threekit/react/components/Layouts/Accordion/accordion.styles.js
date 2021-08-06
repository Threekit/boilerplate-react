import styled from 'styled-components';

export const Wrapper = styled.div`
  height: max-content;
  border: 1px solid #d3d4d3;
  /* border-radius: 3px; */
  width: 100%;
  margin-bottom: 2px;
  background: #fafafa;

  & > div:nth-child(1) {
    height: 45px;
    padding: 0 15px;
    /* border-radius: 3px; */
    cursor: pointer;

    display: grid;
    grid-template-columns: auto max-content max-content;
    grid-gap: 10px;

    & > div {
      height: max-content;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }

    & > div:nth-child(1) {
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-size: 14px;
    }

    & > div:nth-child(2) {
      color: #888888;
      padding-right: 8px;
      font-size: 13px;
      letter-spacing: 0.1em;
    }
  }

  & > div:nth-child(2) {
    max-height: ${(props) => (props.selected ? '330px' : 0)};
    transition: all 0.3s;
    overflow-y: scroll;

    & > div {
      padding: 0 30px;
      padding-bottom: 20px;

      & > div:nth-child(1) {
        padding-top: 20px;
      }
    }
  }
`;
