import React from 'react';
import container from './lanuageSelectorContainer';
import { Dropdown } from '../../InputComponents/Dropdown';
import { widgetPrefix } from '../classNames';
import { ShareOutlined } from '../../../icons';

export const LanguageSelector = ({ selected, options, handleChange }) => {
  if (!options) return null;

  return (
    <Dropdown
      className={`${widgetPrefix}-language-selector`}
      options={options}
      selected={selected}
      handleClick={handleChange}
    />
  );
};

LanguageSelector.componentName = 'Language Selector';
LanguageSelector.Icon = ShareOutlined;

export default container(LanguageSelector);
