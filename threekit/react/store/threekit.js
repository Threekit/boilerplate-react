import Controller from '../../controller';
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { filterAttributesArray } from '../../utils';
import { arrayValidator } from '../validators';
import { message } from 'antd';
import { DEFAULT_PLAYER_CONFIG } from '../../constants';

/*****************************************************
 * Custom Hooks & Middlerware
 ****************************************************/

let HOOKS = {
  onSetConfiguration: undefined,
};

let MIDDLEWARE = {
  arrayValidation: undefined,
};

/*****************************************************
 * State
 ****************************************************/

const initialState = {
  //  Name of the Intialized Item
  name: undefined,
  //  Tracks Threekit API initialization status
  isThreekitLoaded: false,
  //  Initialized item's metadata
  metadata: undefined,
  //  Tracks configuration update
  isPlayerLoading: false,
  //  Selected language
  language: undefined,
  //  Attributes State
  attributes: undefined,
  //  Ordinal Configurator
  allowInPlayerReorder: true,
  allowInPlayerSelect: true,
  activeAttribute: undefined,
  //  Nested Configurator
  nestedAttributeAddress: undefined,
  nestedAttributes: undefined,
  //  Price
  price: undefined,
};

const { actions, reducer } = createSlice({
  name: 'threekit',
  initialState,
  reducers: {
    //  Loading Trackers
    setThreekitLoaded: (state, _) => {
      state.isThreekitLoaded = true;
      state.isPlayerLoading = true;
    },
    setPlayerLoading: (state, action) => {
      state.isPlayerLoading = action.payload;
    },
    //  Intialized Item's Name
    setName: (state, action) => {
      state.name = action.payload;
    },
    //  Intialized Item's Metadata
    setMetadata: (state, action) => {
      state.metadata = action.payload;
    },
    //  Attributes
    setInternalAttributesState: (state, action) => {
      state.attributes = Object.assign({}, state.attributes, action.payload);
    },
    //  Language
    updateLanguageState: (state, action) => {
      state.language = action.payload;
    },
    //  Ordinal Configurators
    setAllowInPlayerReorder: (state, action) => {
      state.allowInPlayerReorder = action.payload;
    },
    setAllowInPlayerSelect: (state, action) => {
      state.allowInPlayerSelect = action.payload;
    },
    //  Nested Attribute
    setNestedAttributesState: (state, action) => {
      state.nestedAttributes = action.payload;
    },
    setNestedAttributeAddressState: (state, action) => {
      state.nestedAttributeAddress = action.payload;
    },
    //  Price
    setPrice: (state, action) => {
      state.price = action.payload;
    },
  },
});

/*****************************************************
 * Actions
 ****************************************************/

//  Actions to be used only internally
const {
  setInternalAttributesState,
  updateLanguageState,
  setPlayerLoading,
  setName,
  setMetadata,
  setNestedAttributesState,
  setNestedAttributeAddressState,
  setPrice,
} = actions;

//  Actions to be used only internally and externally
export const {
  setThreekitLoaded,
  setAllowInPlayerReorder,
  setAllowInPlayerSelect,
} = actions;

/*****************************************************
 * Standard Selectors
 ****************************************************/

//  Loading Trackers
export const isThreekitLoaded = (state) => state.threekit.isThreekitLoaded;

export const isPlayerLoading = (state) => state.threekit.isPlayerLoading;

//  Initialized item's name
export const getName = (state) => state.threekit.name;

//  Price
export const getPrice = (state) => state.threekit.price;

//  Metadata
export const getMetadata = (state) => state.threekit.metadata;

//  Languages and Translations
export const getLanguage = (state) => state.threekit.language;

export const getLanguageOptions = (state) => {
  if (!state.threekit.isThreekitLoaded) return [];
  return window.threekit.controller.getLanguageOptions();
};

//  Attributes
const getInternalAttributeState = (state) => {
  if (!state.threekit.isThreekitLoaded) return undefined;
  return state.threekit.attributes;
};

//  Nested Configurations
export const getNestedAttributes = (state) => state.threekit.nestedAttributes;

export const getNestedAttributesAddress = (state) =>
  state.threekit.nestedAttributeAddress;

//  Attribute Component
export const getAllowInPlayerReorder = (state) =>
  state.threekit.allowInPlayerReorder;

// Array Attribute
export const getAttributesArrayConfig = (state) => {
  return {
    allowInPlayerReorder: state.threekit.allowInPlayerReorder,
    allowInPlayerSelect: state.threekit.allowInPlayerSelect,
    activeAttribute: state.threekit.activeAttribute,
  };
};

/*****************************************************
 * Complex Selectors
 ****************************************************/

//  Attributes
export const getAttributes = (attribute) =>
  createSelector(getInternalAttributeState, (attributes) => {
    if (!attributes) return undefined;
    if (!attribute) return attributes;
    return attributes[attribute] || undefined;
  });

export const getAttributesArray = (arrayLabel) =>
  createSelector(getInternalAttributeState, (attributes) => {
    if (!attributes || !arrayLabel?.length) return undefined;
    const attributesRegExp = new RegExp(`${arrayLabel} [0-9]`);
    return filterAttributesArray(attributesRegExp, attributes);
  });

/*****************************************************
 * Complex Actions
 ****************************************************/

export const launch = (config) => async (dispatch) => {
  const launchConfig = Object.assign(
    {},
    DEFAULT_PLAYER_CONFIG,
    Object.keys(DEFAULT_PLAYER_CONFIG).reduce((output, key) => {
      if (config[key] === undefined) return output;
      return Object.assign(output, { [key]: config[key] });
    }, {}),
    {
      orgId: config.orgId,
      threekitEnv: config.threekitEnv,
      serverUrl: config.serverUrl,
      language: config.language,
      additionalTools: config.additionalTools,
    }
  );

  await Controller.launch(launchConfig);

  dispatch(setThreekitLoaded(true));
  dispatch(setPlayerLoading(false));

  dispatch(setName(window.threekit.controller.getName()));
  dispatch(setMetadata(window.threekit.configurator.getMetadata()));
  dispatch(setPrice(window.threekit.controller.getPrice()));

  if (config.hooks) HOOKS = Object.assign(HOOKS, config.hooks);

  if (config.middleware) {
    Object.entries(config.middleware).forEach(([key, middleware]) => {
      MIDDLEWARE[key] = middleware;
    });
  }

  if (config.language) {
    return dispatch(setLanguage(config.language));
  }

  dispatch(
    setInternalAttributesState(window.threekit.controller.getAttributesState())
  );
};

//  History
export const stepHistory = (step) => async (dispatch) => {
  if (isNaN(step) || step === 0) return;
  const updatedState = await window.threekit.controller.stepHistoryPosition(
    step
  );
  if (updatedState) dispatch(setInternalAttributesState(updatedState));
};

//  Language
export const setLanguage = (language) => async (dispatch) => {
  if (!language) return;
  const updatedState = window.threekit.controller.setLanguage(language);
  dispatch(updateLanguageState(language));
  dispatch(setInternalAttributesState(updatedState));
};

//  Configurator
export const setConfiguration = (config) => async (dispatch, getState) => {
  let preppedConfig = config;
  if (HOOKS.onSetConfiguration) {
    const { threekit } = getState();
    preppedConfig = await HOOKS.onSetConfiguration(
      preppedConfig,
      threekit.attributes
    );
    if (!preppedConfig) return;
  }
  dispatch(setPlayerLoading(true));
  const updatedState = await window.threekit.controller.setAttributesState(
    preppedConfig
  );
  dispatch(setInternalAttributesState(updatedState));
  dispatch(setPrice(window.threekit.controller.getPrice()));
  dispatch(setPlayerLoading(false));
};

export const setNestedAttributeAddress = (address) => (dispatch, getState) => {
  if (!address?.length) {
    dispatch(setNestedAttributeAddressState(undefined));
    dispatch(setNestedAttributesState(undefined));
    return;
  }

  const addr = Array.isArray(address) ? address : [address];
  const { threekit } = getState();

  if (JSON.stringify(addr) === JSON.stringify(threekit.nestedAttributeAddress))
    return;

  dispatch(setNestedAttributeAddressState(addr));
  const nestedAttributes = window.threekit.controller.getNestedAttributeState(
    address
  );
  dispatch(setNestedAttributesState(nestedAttributes));
};

export const setNestedConfiguration = (configuration) => async (
  dispatch,
  getState
) => {
  if (!configuration || !Object.keys(configuration)?.length) return;
  const { threekit } = getState();

  if (!threekit.nestedAttributeAddress?.length) return;

  const updatedNestedAttributes = await window.threekit.controller.setNestedAttributeState(
    threekit.nestedAttributeAddress,
    configuration
  );
  dispatch(setNestedAttributesState(updatedNestedAttributes));
};

//  Ordinal Configurator (Psuedo-Array type attribute)
export const addItemToArray = (arrayLabel) => (
  assetId,
  addToIdx = undefined
) => async (dispatch, getState) => {
  if (!assetId?.length) return;
  const { threekit } = getState();

  const attributesRegExp = new RegExp(`${arrayLabel} [0-9]`);
  const arrayAttributes = filterAttributesArray(
    attributesRegExp,
    threekit.attributes
  );

  let updateAttrIdx = addToIdx;
  let attributeToUpdate;

  if (isNaN(updateAttrIdx))
    attributeToUpdate = Object.values(arrayAttributes).find((el, idx) => {
      if (!el.value.assetId?.length) {
        updateAttrIdx = idx;
        return true;
      }
    });
  else attributeToUpdate = arrayAttributes[updateAttrIdx];

  if (!attributeToUpdate) return message.warning('Max items reached');

  let error;
  const options = Object.values(arrayAttributes)[0].values.reduce(
    (output, item) => Object.assign(output, { [item.assetId]: item }),
    {}
  );
  const updatedArray = Object.values(arrayAttributes).reduce(
    (output, attr, i) => {
      if (i !== updateAttrIdx) output.push(attr);
      else output.push({ ...attr, value: { assetId } });
      return output;
    },
    []
  );

  //  Default Validator
  error = arrayValidator(options, updatedArray);
  if (error) return message.warning(error);

  //  Custom Validator
  if (MIDDLEWARE.arrayValidation?.[arrayLabel])
    error = MIDDLEWARE.arrayValidation?.[arrayLabel](options, updatedArray);
  if (error) return message.warning(error);

  dispatch(setConfiguration({ [attributeToUpdate.name]: { assetId } }));
};

export const deleteItemFromArray = (arrayLabel) => (idx) => async (
  dispatch,
  getState
) => {
  if (isNaN(idx)) return;
  const { threekit } = getState();

  const attributesRegExp = new RegExp(`${arrayLabel} [0-9]`);
  const arrayAttributes = filterAttributesArray(
    attributesRegExp,
    threekit.attributes
  );

  let error;
  const options = Object.values(arrayAttributes)[0].values.reduce(
    (output, item) => Object.assign(output, { [item.assetId]: item }),
    {}
  );
  const updatedArray = Object.values(arrayAttributes).filter(
    (_, i) => i !== idx
  );

  //  Default Validator
  error = arrayValidator(options, updatedArray);
  if (error) return message.warning(error);

  //  Custom Validator
  if (MIDDLEWARE.arrayValidation?.[arrayLabel])
    error = MIDDLEWARE.arrayValidation?.[arrayLabel](options, updatedArray);
  if (error) return message.warning(error);

  const arrayConfigurationObj = filterAttributesArray(
    attributesRegExp,
    window.threekit.configurator.getConfiguration()
  );
  const arrayConfiguration = Object.entries(arrayConfigurationObj);
  const updatedConfiguration = arrayConfiguration.reduce(
    (output, [attributeName], i) => {
      if (i < idx) return output;
      if (!arrayConfiguration[i + 1])
        return Object.assign(output, { [attributeName]: { assetId: '' } });

      return Object.assign(output, {
        [attributeName]: arrayConfiguration[i + 1][1],
      });
    },
    {}
  );

  dispatch(setConfiguration(updatedConfiguration));
};

export const moveItemWithinArray = (arrayLabel) => (
  fromIdx,
  toIdx,
  config
) => async (dispatch, getState) => {
  if (isNaN(fromIdx) || isNaN(fromIdx)) return;
  const { threekit } = getState();

  const { method } = Object.assign({ method: 'move' }, config);

  const attributesRegExp =
    typeof arrayLabel === 'string'
      ? new RegExp(`${arrayLabel} [0-9]`)
      : arrayLabel;
  const arrayAttributes = filterAttributesArray(
    attributesRegExp,
    threekit.attributes
  );

  let error;
  const options = Object.values(arrayAttributes)[0].values.reduce(
    (output, item) => Object.assign(output, { [item.assetId]: item }),
    {}
  );

  let updatedArray;
  switch (method) {
    case 'move':
      updatedArray = Object.values(arrayAttributes).reduce(
        (output, attr, idx, srcArray) => {
          if (idx === fromIdx) return output;
          output.push(attr);
          if (idx === toIdx) output.push(srcArray[fromIdx]);
          return output;
        },
        []
      );
      break;
    default:
      break;
  }

  //  Default Validator
  error = arrayValidator(options, updatedArray);
  if (error) return message.warning(error);

  //  Custom Validator
  if (MIDDLEWARE.arrayValidation?.[arrayLabel])
    error = MIDDLEWARE.arrayValidation?.[arrayLabel](options, updatedArray);
  if (error) return message.warning(error);

  const arrayConfigurationObj = filterAttributesArray(
    attributesRegExp,
    window.threekit.configurator.getConfiguration()
  );
  const attributeKeys = Object.keys(arrayConfigurationObj);
  const arrayConfiguration = Object.values(arrayConfigurationObj);

  let updatedConfiguration;
  switch (method) {
    case 'move':
      updatedConfiguration = arrayConfiguration.reduce(
        (output, configuration, idx, srcArray) => {
          if (idx === fromIdx) return output;
          output = Object.assign(output, {
            [attributeKeys.shift()]: configuration,
          });
          if (idx === toIdx)
            output = Object.assign(output, {
              [attributeKeys.shift()]: srcArray[fromIdx],
            });
          return output;
        },
        {}
      );
      break;
    default:
      break;
  }
  dispatch(setConfiguration(updatedConfiguration));
};

export default reducer;
