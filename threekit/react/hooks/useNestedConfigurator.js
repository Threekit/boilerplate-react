import { useSelector, useDispatch } from 'react-redux';
import {
  getNestedAttributesAddress,
  setNestedAttributeAddress,
  getNestedAttributes,
  setNestedConfiguration,
} from '../store/threekit';
import { selectionToConfiguration } from '../../utils';

const useNestedConfigurator = () => {
  const dispatch = useDispatch();
  const attributes = useSelector(getNestedAttributes);
  const address = useSelector(getNestedAttributesAddress);

  if (!address || !attributes)
    return [undefined, undefined, undefined, undefined];

  const handleSelectAttribute = (address) =>
    dispatch(setNestedAttributeAddress(address));

  const handleSetConfiguration = (attribute, value) => {
    const preppedValue = selectionToConfiguration(value, attributeData.type);
    if (!preppedValue) return;
    dispatch(setNestedConfiguration({ [attribute]: preppedValue }));
  };

  return [attributes, address, handleSelectAttribute, handleSetConfiguration];
};

export default useNestedConfigurator;
