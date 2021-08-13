import React from 'react';
import PropTypes from 'prop-types';
import { Input } from './textArea.styles';
import {
  InputComponentWrapper as Wrapper,
  InputComponentDescription as Description,
  InputComponentTitle as Title,
} from '../inputComponents.styles';
import { regularToKebabCase } from '../../../../utils';
import { ATTRIBUTE_TYPES } from '../../../../constants';
import defaultClassName, { classPrefix } from '../classNames';

export const TextArea = (props) => {
  const {
    title,
    description,
    attribute,
    className: classNameRaw,
    value,
    handleChange,
    rows,
    isPlayerLoading,
    disabled,
  } = Object.assign({}, props);

  let className = `${defaultClassName}-text-area`;
  if (attribute) className += ` ${regularToKebabCase(attribute)}`;
  else if (title) className += ` ${regularToKebabCase(title)}`;
  if (classNameRaw) className += ` ${classNameRaw}`;
  className += ` ${classPrefix}`;

  return (
    <Wrapper className={`${className}-component`}>
      {title ? <Title className={`${className}-header`}>{title}</Title> : null}
      {description ? (
        <Description className={`${className}-description`}>
          {description}
        </Description>
      ) : null}
      <Input
        rows={rows}
        type="textarea"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        isPlayerLoading={isPlayerLoading}
        disabled={disabled}
      />
    </Wrapper>
  );
};

TextArea.defaultProps = {
  attribute: undefined,
  title: undefined,
  className: undefined,
  value: undefined,
  rows: 5,
  hideDisabled: undefined,
  handleChange: undefined,
};

TextArea.compatibleAttributes = new Set([ATTRIBUTE_TYPES.string]);

export default TextArea;
