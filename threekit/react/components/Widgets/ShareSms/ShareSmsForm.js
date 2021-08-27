import React, { useState } from 'react';
import {
  FormWrapper as Wrapper,
  FormTitle as Title,
  FormDescription as Description,
  FormContent as Content,
  FormActionArea as ActionArea,
  FormField,
} from './shareSms.styles';
import { ButtonWrapper } from '../../InputComponents/inputComponents.styles';
import { TextInput } from '../../InputComponents/TextInput';

export const ShareSmsForm = (props) => {
  const [number, setNumber] = useState('');

  const { title, description, onSend, onCancel } = Object.assign(
    {
      title: 'Share by Sms',
      description:
        "Enter the number you'd like to share your configuration with",
      onSend: undefined,
      onCancel: undefined,
    },
    props
  );

  const handleClickCancel = () => onCancel();

  const handleClickSend = () => onSend(number);

  return (
    <Wrapper>
      {title ? <Title>{title}</Title> : null}
      {description ? <Description>{description}</Description> : null}
      <Content>
        <FormField>
          <div>Number</div>
          <TextInput value={number} handleChange={(val) => setNumber(val)} />
        </FormField>
      </Content>
      <ActionArea>
        <ButtonWrapper onClick={handleClickCancel}>
          <div>Cancel</div>
        </ButtonWrapper>
        <ButtonWrapper onClick={handleClickSend}>
          <div>Send</div>
        </ButtonWrapper>
      </ActionArea>
    </Wrapper>
  );
};

export default ShareSmsForm;
