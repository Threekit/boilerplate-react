import store from '../react/store';
import {
  setAllowInPlayerSelect,
  setNestedAttributeAddress,
} from '../react/store/threekit';
import { attrNameToRegExp, findHitNode } from '../utils';

const selectOrdinalAttributes = (arrayLabel, config) => {
  const { active } = Object.assign({ active: true }, config);

  store.dispatch(setAllowInPlayerSelect(active));

  // Sets up our attributes names RegExp
  const attributesRegExp = attrNameToRegExp(arrayLabel);

  return () => ({
    key: 'select-ordinal-attribute',
    label: 'select-ordinal-attribute',
    active: true,
    enabled: true,
    handlers: {
      click: async (event) => {
        const { threekit } = store.getState();
        if (!threekit.allowInPlayerSelect) return;

        const clickedAttribute = findHitNode(event.hitNodes, attributesRegExp);

        if (clickedAttribute)
          store.dispatch(setNestedAttributeAddress(clickedAttribute.name));
      },
    },
  });
};

export default selectOrdinalAttributes;
