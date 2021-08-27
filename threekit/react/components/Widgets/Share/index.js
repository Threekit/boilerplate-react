import React from 'react';
import PropTypes from 'prop-types';
import { ButtonWrapper } from '../widgets.styles';
import { ShareOutlined } from '../../../icons';
import container from './shareContainer';
import defaultClassName from '../classNames';

export const Share = (props) => {
  const { handleClick, className: classNameRaw, showLabel } = props;

  let className = `${defaultClassName}-share`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return (
    <ButtonWrapper
      showLabel={showLabel}
      className={className}
      onClick={handleClick}
    >
      <div>
        <ShareOutlined />
      </div>
      <div>Share</div>
    </ButtonWrapper>
  );
};

Share.propTypes = {
  /**
   * Function to execute when user clicks 'Share'.
   */
  handleClick: PropTypes.func,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */
  className: PropTypes.string,
};

Share.defaultProps = {
  handleClick: undefined,
  classname: '',
};

Share.componentName = 'Share';
Share.Icon = ShareOutlined;

export default container(Share);
