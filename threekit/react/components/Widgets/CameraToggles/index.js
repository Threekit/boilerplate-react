import React from 'react';
import PropTypes from 'prop-types';
import { ButtonWrapper, TwinButtonWrapper as Wrapper } from '../widgets.styles';
import { CaretRightOutlined } from '../../../icons';
import container from './cameraTogglesContainer';
import defaultClassName from '../classNames';

const CameraToggleLeft = (props) => {
  const { handleToggleBackward, className: classNameRaw, showLabel } = props;

  let className = `${defaultClassName}-camera-toggle`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return (
    <ButtonWrapper
      showLabel={showLabel}
      className={`${className} left-toggle`}
      onClick={handleToggleBackward}
    >
      <div>
        <CaretRightOutlined />
      </div>
    </ButtonWrapper>
  );
};

const CameraToggleRight = (props) => {
  const { handleToggleForward, className: classNameRaw, showLabel } = props;

  let className = `${defaultClassName}-camera-toggles`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return (
    <ButtonWrapper
      showLabel={showLabel}
      className={`${className} right-toggle`}
      onClick={handleToggleForward}
    >
      <div>
        <CaretRightOutlined />
      </div>
    </ButtonWrapper>
  );
};

export const CameraTogglesComponent = (props) => {
  const { orientation, className: classNameRaw } = Object.assign(
    {
      orientation: 'horizontal',
    },
    props
  );

  let className = `${defaultClassName}-camera-toggles`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;
  return (
    <Wrapper className={className} orientation={orientation}>
      <CameraToggleRight {...props} />
      <CameraToggleLeft {...props} />
    </Wrapper>
  );
};

export const CameraToggles = container(CameraToggles);

CameraToggles.LeftToggle = container(CameraToggleLeft);
CameraToggles.RightToggle = container(CameraToggleRight);

CameraToggles.propTypes = {
  /**
   * Function to execute when user clicks 'CameraToggle'.
   */
  handleClick: PropTypes.func,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */
  className: PropTypes.string,
};

CameraToggles.defaultProps = {
  handleClick: undefined,
  classname: '',
};

export default CameraToggles;
