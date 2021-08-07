import useAttribute from './useAttribute';
import { ATTRIBUTES_RESERVED } from '../../constants';

const useCameraToggle = (config) => {
  const { attribute, cameras } = Object.assign(
    { attribute: ATTRIBUTES_RESERVED.camera, cameras: undefined },
    config
  );
  const [camera, setCamera] = useAttribute(attribute);

  const prepped = camera
    ? Object.assign(
        { ...camera },
        cameras?.length
          ? {
              values: camera.values.filter((el) => cameras.includes(el?.label)),
            }
          : {}
      )
    : undefined;

  const handleToggle = (step = 1) => {
    const value = prepped.value?.assetId || camera.value;
    const selectedIdx = prepped.values.findIndex(
      (el) => el.assetId === value || el.value === value
    );
    let nextIdx = selectedIdx + step;
    if (nextIdx < 0) nextIdx = prepped.values.length - 1;
    else if (nextIdx > prepped.values.length - 1) nextIdx = 0;

    setCamera(
      prepped.values[nextIdx]?.assetId || prepped.values[nextIdx].value
    );
  };

  return [prepped, handleToggle];
};

export default useCameraToggle;
