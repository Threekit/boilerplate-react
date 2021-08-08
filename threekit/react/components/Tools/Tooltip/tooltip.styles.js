import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(calc(-100% - 20px)) translateX(-50%);
  /* transform: translateX(-50%) translateY(-50%);

  /* display: none; */

  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  max-width: 250px;
`;

export const Inner = styled.div`
  min-width: 30px;
  min-height: 32px;
  padding: 6px 8px;
  color: #fff;
  text-align: left;
  text-decoration: none;
  word-wrap: break-word;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
`;

export const Arrow = styled.div`
  position: absolute;
  display: block;
  left: 50%;
  transform: translateX(-50%);

  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;

  border-top: 8px solid rgba(0, 0, 0, 0.6);

  overflow: hidden;
  pointer-events: none;
`;
