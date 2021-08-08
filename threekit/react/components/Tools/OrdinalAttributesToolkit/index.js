import React from 'react';
import ReorderOrdinalAttribute from './ReorderOrdinalAttribute';
import SelectOrdinalAttribute from './SelectOrdinalAttribute';

const OrdinalAttributesToolkit = (props) => {
  return [
    <ReorderOrdinalAttribute key="reorder-ordinal" {...props} />,
    <SelectOrdinalAttribute key="select-ordinal" {...props} />,
  ];
};

OrdinalAttributesToolkit.Reorder = ReorderOrdinalAttribute;
OrdinalAttributesToolkit.Select = SelectOrdinalAttribute;

export default OrdinalAttributesToolkit;
