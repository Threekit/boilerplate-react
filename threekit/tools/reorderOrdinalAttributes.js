import store from '../react/store';
import {
  moveItemWithinArray,
  deleteItemFromArray,
  setAllowInPlayerReorder,
} from '../react/store/threekit';
import { TK_PLAYER_DIV_ID } from '../constants';
import theme from '../react/theme';
import { filterAttributesArray, attrNameToRegExp, findHitNode } from '../utils';

const classNames = {
  deleteBtn: 'threekit-delete-button-tool',
};

const styles = `
  .${classNames.deleteBtn} {
    position: absolute;
    bottom: 20px;
    right: 20px;
    
    height: 50px;
    width: 50px;
    background: #fff;
    border-radius: 50%;
    border: 2px solid ${theme.primaryColor};
    overflow: hidden;
    
    transition: all 0.3s;
  }

  .${classNames.deleteBtn}:hover {
    background: ${theme.primaryColor};
    transform: scale(1.2);
  }

  .${classNames.deleteBtn} div {
    height: 32px;
    width: 32px;

    color: white;

    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .${classNames.deleteBtn} img {
    height: 100%;
    width: 100%;
  }
`;

const reorderOrdinalAttributes = (arrayLabel, config) => {
  const { active, allowDelete } = Object.assign(
    { active: true, allowDelete: true },
    config
  );

  store.dispatch(setAllowInPlayerReorder(active));

  let selectedComponent;
  let deleteButtonCreated = false;
  const moveItem = moveItemWithinArray(arrayLabel);
  const deleteItemByIdx = deleteItemFromArray(arrayLabel);

  // Sets up our attributes names RegExp
  const attributesRegExp = attrNameToRegExp(arrayLabel);

  let deleteBtnDiv;
  let deleteItem;
  if (allowDelete) {
    //  We create the delete button
    const css = document.createElement('style');

    if (css.styleSheet) css.styleSheet.cssText = styles;
    else css.appendChild(document.createTextNode(styles));
    document.getElementsByTagName('head')[0].appendChild(css);

    deleteBtnDiv = document.createElement('div');
    deleteBtnDiv.classList.add(classNames.deleteBtn);

    const deleteBtnLabelDiv = document.createElement('div');
    const img = document.createElement('img');
    img.src =
      'https://upload.wikimedia.org/wikipedia/commons/7/7d/Trash_font_awesome.svg';

    deleteBtnLabelDiv.appendChild(img);
    deleteBtnDiv.appendChild(deleteBtnLabelDiv);
  }

  const handleMouseEnter = () => {
    deleteItem = true;
  };

  const handleMouseLeave = () => {
    deleteItem = false;
  };

  return () => ({
    key: 'reorder-ordinal-attribute',
    label: 'reorder-ordinal-attribute',
    active: true,
    enabled: true,
    handlers: {
      mousedown: async (event) => {
        const { threekit } = store.getState();
        if (!threekit.allowInPlayerReorder) return;

        const clickedAttribute = findHitNode(event.hitNodes, attributesRegExp);

        //  If we find no node we move on...
        if (!clickedAttribute) return;

        //  If there is a node we track its name
        selectedComponent = clickedAttribute.name;
        window.threekit.player.tools.removeTool('orbit');

        //  Create Button
        if (!allowDelete) return;

        if (!deleteButtonCreated) {
          deleteBtnDiv.onmouseenter = handleMouseEnter;
          deleteBtnDiv.onmouseleave = handleMouseLeave;
          document.getElementById(TK_PLAYER_DIV_ID).appendChild(deleteBtnDiv);
          deleteButtonCreated = true;
        }

        deleteBtnDiv.style.display = 'block';
      },
      mouseup: async (event) => {
        if (selectedComponent === undefined) return;

        window.threekit.player.tools.addTool('orbit');
        if (allowDelete) deleteBtnDiv.style.display = 'none';

        const arrayConfigurationObj = filterAttributesArray(
          attributesRegExp,
          window.threekit.configurator.getConfiguration()
        );

        const attributeKeys = Object.keys(arrayConfigurationObj);
        const fromIdx = attributeKeys.indexOf(selectedComponent);

        if (deleteItem) {
          store.dispatch(deleteItemByIdx(fromIdx));
          deleteItem = undefined;
          selectedComponent = undefined;
          return;
        }

        const clickedAttribute = findHitNode(event.hitNodes, attributesRegExp);

        if (!clickedAttribute || clickedAttribute.name === selectedComponent)
          return (selectedComponent = undefined);

        const toIdx = attributeKeys.indexOf(clickedAttribute.name);

        store.dispatch(moveItem(fromIdx, toIdx));
        selectedComponent = undefined;
      },
    },
  });
};

export default reorderOrdinalAttributes;
