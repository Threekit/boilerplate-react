import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useThreekitInitStatus } from '../../../hooks';
import {
  DeleteButtonWrapper,
  DeleteWrapper,
} from './ordinalAttributesToolkit.styles';
import { DeleteOutlined } from '../../../icons';
import {
  attrNameToRegExp,
  findHitNode,
  filterAttributesArray,
} from '../../../../utils';
import {
  moveItemWithinArray,
  deleteItemFromArray,
  setAllowInPlayerReorder,
} from '../../../store/threekit';
import store from '../../../store';

const ReorderOrdinalAttribute = (props) => {
  const [showDelete, setShowDelete] = useState(false);
  const loaded = useThreekitInitStatus();
  const dispatch = useDispatch();
  const deleteItem = useRef();
  const activeItemRef = useRef();
  // Attribute Array Handlers
  const moveItem = useRef();
  const deleteItemByIdx = useRef();
  const attributesRegExp = useRef();

  const { children, arrayLabel, active, allowDelete } = Object.assign(
    {
      children: undefined,
      arrayLabel: undefined,
      active: true,
      allowDelete: true,
    },
    props
  );

  useEffect(() => {
    const tool = (player) => ({
      key: 'reorder-ordinal-attribute',
      label: 'reorder-ordinal-attribute',
      active: true,
      enabled: true,
      handlers: {
        mousedown: async (event) => {
          const { threekit } = store.getState();
          if (!threekit.allowInPlayerReorder) return;

          const clickedAttribute = findHitNode(
            event.hitNodes,
            attributesRegExp.current
          );

          //  If we find no node we move on...
          if (!clickedAttribute) return;

          //  If there is a node we track its name
          activeItemRef.current = clickedAttribute.name;
          window.threekit.player.tools.removeTool('orbit');

          //  Create Button
          if (!allowDelete) return;
          setShowDelete(true);
        },
        mouseup: async (event) => {
          if (activeItemRef.current === undefined) return;

          window.threekit.player.tools.addTool('orbit');
          if (allowDelete) setShowDelete(false);

          const arrayConfigurationObj = filterAttributesArray(
            attributesRegExp.current,
            window.threekit.configurator.getConfiguration()
          );

          const attributeKeys = Object.keys(arrayConfigurationObj);
          const fromIdx = attributeKeys.indexOf(activeItemRef.current);

          if (deleteItem.current) {
            dispatch(deleteItemByIdx.current(fromIdx));
            deleteItem.current = false;
            activeItemRef.current = undefined;
            return;
          }

          const clickedAttribute = findHitNode(
            event.hitNodes,
            attributesRegExp.current
          );

          if (
            !clickedAttribute ||
            clickedAttribute.name === activeItemRef.current
          )
            return (activeItemRef.current = undefined);

          const toIdx = attributeKeys.indexOf(clickedAttribute.name);

          dispatch(moveItem.current(fromIdx, toIdx));
          activeItemRef.current = undefined;
        },
      },
    });

    (() => {
      if (!loaded || !arrayLabel?.length) return;
      dispatch(setAllowInPlayerReorder(active));
      moveItem.current = moveItemWithinArray(arrayLabel);
      deleteItemByIdx.current = deleteItemFromArray(arrayLabel);
      attributesRegExp.current = attrNameToRegExp(arrayLabel);
      window.threekit.controller.addTool(tool);
    })();
    // return window.threekit.controller.removeTool(tooltip());
  }, [loaded]);

  if (!loaded || !showDelete || !arrayLabel?.length) return null;

  if (children)
    return (
      <DeleteWrapper>
        {React.cloneElement(children, {
          onMouseEnter: () => (deleteItem.current = true),
          onMouseLeave: () => (deleteItem.current = false),
        })}
      </DeleteWrapper>
    );

  return (
    <DeleteButtonWrapper
      onMouseEnter={() => (deleteItem.current = true)}
      onMouseLeave={() => (deleteItem.current = false)}
    >
      <div>
        <DeleteOutlined />
      </div>
    </DeleteButtonWrapper>
  );
};

export default ReorderOrdinalAttribute;
