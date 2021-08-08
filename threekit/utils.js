import { METADATA_RESERVED, ATTRIBUTE_TYPES } from './constants';

export const objectToQueryStr = (obj) => {
  if (!obj || !Object.keys(obj).length) return '';
  return Object.entries(obj).reduce((output, [key, val], i) => {
    if (i) output += '&';
    if (val !== undefined) output += `${key}=${val}`;
    return output;
  }, '?');
};

const isObject = (object) => object != null && typeof object === 'object';

export const shallowCompare = (value1, value2) => {
  if (typeof value1 !== typeof value2) return false;

  if (Array.isArray(value1)) {
    if (value1.length !== value2.length) return false;
    for (let i = 0; i < value1.length; i++)
      if (value1[i] !== value2[i]) return false;
  }

  if (typeof value1 !== 'object') return value1 === value2;

  const keys1 = Object.keys(value1);
  const keys2 = Object.keys(value2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (value1[key] !== value2[key]) {
      return false;
    }
  }

  return true;
};

export const deepCompare = (item1, item2) => {
  //  Are the items the same type
  if (typeof item1 !== typeof item2) return false;
  //  If that type is Array we deepCompare each item
  //  against its counter part
  //  The same arrays in different orders will fail this check
  else if (Array.isArray(item1)) {
    if (item1.length !== item2.length) return false;
    for (let i = 0; i < item1.length; i++)
      if (!deepCompare(item1[i], item2[i])) return false;
    //  If they're objects...
  } else if (isObject(item1)) {
    const keys1 = Object.keys(item1);
    const keys2 = Object.keys(item2);

    //  We makre sure they have the same keys...
    if (keys1.length !== keys2.length) {
      return false;
    }

    //  and then deep compare each value
    for (const key of keys1) {
      if (!deepCompare(item1[key], item2[key])) return false;
    }

    //  This leaves us with literals that can be
    //  compared directly
  } else if (item1 !== item2) return false;

  return true;
};

export const IsJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const getParams = () => {
  let query = window.location.search.substr(1);
  return query.split('&').reduce((output, part) => {
    let [key, value] = part.split('=');
    if (!key?.length) return output;
    const preppedValue = decodeURIComponent(value);
    output[decodeURIComponent(key)] = IsJsonString(preppedValue)
      ? JSON.parse(preppedValue)
      : preppedValue;
    return output;
  }, {});
};

export const regularToKebabCase = (str) =>
  !str?.length
    ? ''
    : str
        .split(' ')
        .filter((word) => word?.length)
        .map((word) => word.trim().toLowerCase())
        .join('-');

export const filterAttributesArray = (attributeName, attributes) => {
  const attributesRegExp =
    typeof attributeName === 'string'
      ? new RegExp(`/${attributeName}/`)
      : attributeName;

  return Array.isArray(attributes)
    ? attributes.filter((el) => attributesRegExp.test(el.name))
    : Object.entries(attributes).reduce(
        (output, [attrName, attr]) =>
          attributesRegExp.test(attrName)
            ? Object.assign(output, { [attrName]: attr })
            : output,
        {}
      );
};

export const attrNameToRegExp = (name) =>
  typeof name === 'string' ? new RegExp(`${name} [0-9]`) : name;

export const hexToRgb = (hex) =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => '#' + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));

export const rgbToHex = (r, g, b) =>
  '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');

export const inflateRgb = (rgbObj) =>
  Object.entries(rgbObj).reduce(
    (output, [key, value]) =>
      ['r', 'g', 'b'].includes(key)
        ? Object.assign(output, { [key]: Math.round(255 * value) })
        : output,
    {}
  );

export const deflateRgb = (rgbObj) =>
  Object.entries(rgbObj).reduce(
    (output, [key, value]) =>
      ['r', 'g', 'b'].includes(key)
        ? Object.assign(output, { [key]: value / 255 })
        : output,
    {}
  );

export const prepAttributeForComponent = (attribute, { metadataKeys }) => {
  const {
    imgBaseUrl,
    thumbnailFromMetadata,
    priceFromMetadata,
    descriptionFromMetadata,
  } = {
    metadataKeys,
  };

  const thumbnailKey = thumbnailFromMetadata || METADATA_RESERVED.thumbnail;
  const priceKey = priceFromMetadata || METADATA_RESERVED.price;
  const descriptionKey =
    descriptionFromMetadata || METADATA_RESERVED.description;

  let options = attribute.values;
  let selected = attribute.value;

  if (attribute.type === ATTRIBUTE_TYPES.arraySelector) {
    options = Object.entries(attribute.values).reduce(
      (output, [assetId, el]) =>
        Object.assign(output, {
          [assetId]: prepCatalogItem(el),
        }),
      {}
    );
  } else if (attribute.type === ATTRIBUTE_TYPES.asset) {
    selected = attribute.value?.assetId;
    options = attribute.values
      ? attribute.values.map((el) => prepCatalogItem(el))
      : [];
  } else if (attribute.type === ATTRIBUTE_TYPES.color)
    selected = inflateRgb(attribute.value);

  function prepCatalogItem(item) {
    return Object.assign(
      {},
      item,
      {
        value: item.assetId,
      },
      item.metadata[thumbnailKey]
        ? !imgBaseUrl?.length &&
          (item.metadata[thumbnailKey].startsWith('#') ||
            item.metadata[thumbnailKey].startsWith('rgb'))
          ? {
              colorValue: item.metadata[thumbnailKey],
            }
          : {
              imageUrl: (imgBaseUrl || '') + item.metadata[thumbnailKey],
            }
        : undefined,
      item.metadata[priceKey]
        ? {
            price: item.metadata[priceKey],
          }
        : undefined,
      item.metadata[descriptionKey]
        ? {
            description: item.metadata[descriptionKey],
          }
        : undefined
    );
  }

  return { selected, options };
};

export const selectionToConfiguration = (value, attributeType) => {
  if (!value) return undefined;
  let updated;
  switch (attributeType) {
    case ATTRIBUTE_TYPES.number:
      updated = value;
      break;
    case ATTRIBUTE_TYPES.asset:
      if (!isNaN(value))
        updated = { assetId: attributeData.values[value].assetId };
      else updated = { assetId: value };
      break;
    case ATTRIBUTE_TYPES.string:
      if (!isNaN(value)) updated = attributeData.values[value].value;
      else updated = value;
      break;
    case ATTRIBUTE_TYPES.color:
      if ('r' in value) updated = deflateRgb(value);
      else updated = value;
      break;
    default:
      updated = value;
  }
  return updated;
};

export const getCameraPosition = (cameraApi) => ({
  position: cameraApi.getPosition(),
  quaternion: cameraApi.getQuaternion(),
});

export const setCameraPosition = (cameraApi, cameraPosition) => {
  cameraApi.setPosition(cameraPosition.position);
  cameraApi.setQuaternion(cameraPosition.quaternion);
};

export const dataURItoBlob = (dataURI) => {
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);

  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};

export const copyToClipboard = (data) => {
  if (!data) return;
  const str = typeof data === 'string' ? data : JSON.stringify(data);
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const findHitNode = (hitNodes, name) => {
  if (!hitNodes.length) return undefined;
  const hierarchy = [...hitNodes[0].hierarchy];
  hierarchy.reverse();

  return (
    hierarchy.find((el) =>
      typeof name === 'string' ? name === el.name : name.test(el.name)
    ) || undefined
  );
};

export const easeInOutCubic = (val) =>
  val < 0.5 ? 4 * val * val * val : 1 - Math.pow(-2 * val + 2, 3) / 2;

export const metadataValueToObject = (data) =>
  data.split(',').reduce((output, keVal) => {
    const [key, value] = keVal
      .trim()
      .split('=')
      .map((el) => el.trim());
    return Object.assign(output, { [key]: parseFloat(value) || value });
  }, {});

export const filterFormAttributes = (
  attributes,
  attributeComponents,
  includeReservedAttributes
) => {
  if (!attributes) return {};
  if (
    (!attributeComponents || !Object.keys(attributeComponents).length) &&
    includeReservedAttributes
  )
    return attributes;
  return Object.values(attributes).filter((attr) => {
    if (!attr) return false;
    if (!includeReservedAttributes && attr?.name?.[0] === '_') return false;
    if (attributeComponents && attr?.name in attributeComponents) {
      if ([undefined, false].includes(attributeComponents[attr.name]))
        return false;
    }
    return true;
  });
};
