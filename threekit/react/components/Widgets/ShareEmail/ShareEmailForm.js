import React, { useState } from 'react';
import {
  FormWrapper as Wrapper,
  FormTitle as Title,
  FormDescription as Description,
  FormContent as Content,
  FormActionArea as ActionArea,
  FormField,
} from './shareEmail.styles';
import { ButtonWrapper } from '../../InputComponents/inputComponents.styles';
import { TextInput } from '../../InputComponents/TextInput';
import { TextArea } from '../../InputComponents/TextArea';

export const ShareEmailForm = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const {
    title,
    description,
    includeName,
    includeMessage,
    onSend,
    onCancel,
  } = Object.assign(
    {
      title: 'Share by Email',
      description:
        "Enter the email you'd like to share your configuration with",
      includeName: false,
      includeMessage: false,
      onSend: undefined,
      onCancel: undefined,
    },
    props
  );

  const handleClickCancel = () => onCancel();

  const handleClickSend = () =>
    onSend(
      Object.assign(
        { email },
        name?.length ? { name } : {},
        message?.length ? { message } : {}
      )
    );

  return (
    <Wrapper>
      {title ? <Title>{title}</Title> : null}
      {description ? <Description>{description}</Description> : null}
      <Content>
        {includeName ? (
          <FormField>
            <div>Name</div>
            <TextInput value={name} handleChange={(val) => setName(val)} />
          </FormField>
        ) : null}
        <FormField>
          <div>Email</div>
          <TextInput value={email} handleChange={(val) => setEmail(val)} />
        </FormField>
        {includeMessage ? (
          <FormField>
            <div>Message</div>
            <TextArea
              rows={7}
              value={message}
              handleChange={(val) => setMessage(val)}
            />
          </FormField>
        ) : null}
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

export default ShareEmailForm;
