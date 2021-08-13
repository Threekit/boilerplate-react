import styled from 'styled-components';

export const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background: #33333377;

  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: all ${(props) => props.transitionDuration};

  position: fixed;
  top: 0;
  left: 0;
`;

export const Wrapper = styled.div`
  min-width: 400px;
  height: 100vh;
  background: #fff;
  border-radius: ${(props) => props.theme.borderRadius};
  opacity: 1;

  transform: translateX(${(props) => (props.show ? '0%' : '100%')});
  transition: all ${(props) => props.transitionDuration};

  position: absolute;
  top: 0;
  right: 0;
`;
