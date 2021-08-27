import React from 'react';
import PropTypes from 'prop-types';
import { ButtonWrapper } from '../widgets.styles';
import { RedoOutlined } from '@ant-design/icons';
import container from './redoContainer';
import defaultClassName from '../classNames';

export const Redo = (props) => {
  const { handleClick, className: classNameRaw } = props;

  let className = `${defaultClassName}-redo`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return (
    <ButtonWrapper className={className} onClick={handleClick}>
      <div>
        <RedoOutlined />
      </div>
    </ButtonWrapper>
  );
};

Redo.propTypes = {
  /**
   * Function to execute when user clicks 'Redo'.
   */
  handleClick: PropTypes.func,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */ className: PropTypes.string,
};

Redo.defaultProps = {
  handleClick: undefined,
  classname: '',
};

Redo.Icon = RedoOutlined;
Redo.componentName = 'Redo';

export default container(Redo);
