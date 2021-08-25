import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useThreekitInitStatus } from '../../../hooks';
import { attrNameToRegExp, findHitNode } from '../../../../utils';
import { DISPLAY_OPTIONS } from '../../../../constants';
import {
  setAllowInPlayerSelect,
  setNestedAttributeAddress,
  getAttributesArrayConfig,
} from '../../../store/threekit';
import { Form } from '../../Forms';

const SelectOrdinalAttribute = (props) => {
  const loaded = useThreekitInitStatus();
  const attributesArrayConfig = useSelector(getAttributesArrayConfig);
  const dispatch = useDispatch();
  // Attribute Array Handlers
  const attributesRegExp = useRef();

  const { arrayLabel, active, display, attributeComponents } = Object.assign(
    {
      arrayLabel: undefined,
      active: true,
      display: DISPLAY_OPTIONS.modal,
      attributeComponents: undefined,
    },
    props
  );

  const tool = (player) => ({
    key: 'select-ordinal-attribute',
    label: 'select-ordinal-attribute',
    active: true,
    enabled: true,
    handlers: {
      click: async (event) => {
        if (!attributesArrayConfig.allowInPlayerSelect) return;

        const clickedAttribute = findHitNode(
          event.hitNodes,
          attributesRegExp.current
        );

        if (clickedAttribute)
          dispatch(setNestedAttributeAddress(clickedAttribute.name));
      },
    },
  });

  useEffect(() => {
    (() => {
      if (!loaded || !arrayLabel?.length) return;
      dispatch(setAllowInPlayerSelect(active));
      attributesRegExp.current = attrNameToRegExp(arrayLabel);
      window.threekit.controller.addTool(tool);
    })();
    // return window.threekit.controller.removeTool(tooltip());
  }, [loaded]);

  if (!loaded || !arrayLabel?.length) return null;

  return (
    <Form
      nestedConfigurator
      display={display}
      attributeComponents={attributeComponents}
    />
  );
};

export default SelectOrdinalAttribute;
