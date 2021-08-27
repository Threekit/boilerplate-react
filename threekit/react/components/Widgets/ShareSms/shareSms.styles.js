import styled from 'styled-components';

export const FormWrapper = styled.div`
  width: 420px;
  padding: 12px 18px;
  background: #fff;
  border-radius: ${(props) => props.theme.borderRadius};
`;

export const FormTitle = styled.div`
  font-size: 18px;
  color: ${(props) => props.theme.headingColor};
`;

export const FormDescription = styled.div`
  color: ${(props) => props.theme.textColorSecondary};
`;

export const FormContent = styled.div`
  margin-top: 12px;
`;

export const FormActionArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  & > div {
    margin-left: 8px;
  }
`;

export const FormField = styled.div`
  & > div:nth-child(1) {
    font-size: 14px;
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
  }
`;
