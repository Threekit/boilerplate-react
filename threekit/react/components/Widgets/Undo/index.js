import React from 'react';
import PropTypes from 'prop-types';
import { ButtonWrapper } from '../widgets.styles';
import { UndoOutlined } from '@ant-design/icons';
import container from './undoContainer';
import defaultClassName from '../classNames';

export const Undo = (props) => {
  const { handleClick, className: classNameRaw } = props;

  let className = `${defaultClassName}-undo`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return (
    <ButtonWrapper className={className} onClick={handleClick}>
      <div>
        <UndoOutlined />
      </div>
    </ButtonWrapper>
  );
};

Undo.propTypes = {
  /**
   * Function to execute when user clicks 'Undo'.
   */
  handleClick: PropTypes.func,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */ className: PropTypes.string,
};

Undo.defaultProps = {
  handleClick: undefined,
  classname: '',
};

Undo.Icon = UndoOutlined;
Undo.componentName = 'Undo';

export default container(Undo);
