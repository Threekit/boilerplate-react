import { useSelector, useDispatch } from 'react-redux';
import {
  getAttributesArray,
  getAttributesArrayConfig,
  addItemToArray,
  deleteItemFromArray,
  moveItemWithinArray,
} from '../store/threekit';

const useAttributesArray = (arrayLabel) => {
  const attributes = useSelector(getAttributesArray(arrayLabel));
  const attributesArrayConfig = useSelector(getAttributesArrayConfig);
  const dispatch = useDispatch();

  if (!arrayLabel || !attributes || !Object.keys(attributes).length)
    return [undefined, undefined, undefined, undefined, undefined];

  const options = (Object.values(attributes)[0].values || []).reduce(
    (output, el) => Object.assign(output, { [el.assetId]: el }),
    {}
  );
  const state = attributes;

  const addItemDispatcher = addItemToArray(arrayLabel);
  const deleteItemDispatcher = deleteItemFromArray(arrayLabel);
  const moveItemDispatcher = moveItemWithinArray(arrayLabel);

  const addItem = (assetId, addToIdx) =>
    dispatch(addItemDispatcher(assetId, addToIdx));

  const deleteItem = (idx) => dispatch(deleteItemDispatcher(idx));

  const moveItem = (fromIdx, toIdx, config) =>
    dispatch(moveItemDispatcher(fromIdx, toIdx, config));

  return [options, state, addItem, deleteItem, moveItem, attributesArrayConfig];
};

export default useAttributesArray;
