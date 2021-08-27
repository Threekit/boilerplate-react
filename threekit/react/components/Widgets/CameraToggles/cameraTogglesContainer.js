import React from 'react';
import { useCameraToggle } from '../../../hooks';

const cameraContainer = (WrappedComponent) => (props) => {
  const config = Object.assign(
    {},
    props.attribute ? { attribute: props.attribute } : undefined,
    props.cameras ? { cameras: props.cameras } : undefined
  );
  const [cameras, setCamera] = useCameraToggle(config);
  const handleToggleForward = () => setCamera();
  const handleToggleBackward = () => setCamera(-1);

  if (!cameras) return null;

  return (
    <WrappedComponent
      {...props}
      handleToggleForward={handleToggleForward}
      handleToggleBackward={handleToggleBackward}
      handleClick={handleToggleForward}
    />
  );
};

export default cameraContainer;
