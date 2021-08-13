import React, { useState } from 'react';
import { message } from 'antd';
import { useThreekitInitStatus } from '../../../hooks';

const shareEmailContainer = (WrappedComponent) => (props) => {
  const hasLoaded = useThreekitInitStatus();
  const [show, setShow] = useState(false);

  if (!hasLoaded) return null;

  const onSend = (data) => {
    const preppedData = Object.assign(
      data,
      props.from ? { from: props.from } : {}
    );
    return window.threekit.controller.emailShareConfiguration(preppedData);
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

export default shareEmailContainer;
