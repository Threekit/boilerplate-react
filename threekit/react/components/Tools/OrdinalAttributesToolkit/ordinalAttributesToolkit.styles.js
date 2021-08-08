import styled from 'styled-components';
import { ButtonWrapper } from '../../Widgets/widgets.styles';

export const DeleteWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

export const DeleteButtonWrapper = styled(ButtonWrapper)`
  position: absolute;
  bottom: 20px;
  right: 20px;

  height: 50px;
  width: 50px;
  border-radius: 50%;

  & > div {
    font-size: 30px;
  }
`;
