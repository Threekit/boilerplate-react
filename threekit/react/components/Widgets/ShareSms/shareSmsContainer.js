import React, { useState } from 'react';
import { message } from 'antd';
import { useThreekitInitStatus } from '../../../hooks';

const shareSmsContainer = (WrappedComponent) => (props) => {
  const hasLoaded = useThreekitInitStatus();
  const [show, setShow] = useState(false);

  if (!hasLoaded) return null;

  const { messageFunc } = Object.assign({ messageFunc: undefined }, props);

  const onSend = async (number) => {
    await window.threekit.controller.shareSmsConfiguration(number, messageFunc);
    message.success('message sent');
    setShow(false);
  };

  return (
    <WrappedComponent
      {...props}
      onSend={onSend}
      show={show}
      setShow={setShow}
    />
  );
};

export default shareSmsContainer;
