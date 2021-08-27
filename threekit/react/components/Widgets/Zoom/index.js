import React from 'react';
import PropTypes from 'prop-types';
import { ButtonWrapper, TwinButtonWrapper as Wrapper } from '../widgets.styles';
import container from './zoomContainer';
import { ZoomInOutlined, ZoomOutOutlined } from '../../../icons';
import defaultClassName from '../classNames';

export const ZoomOut = (props) => {
  const { step, zoomOut, className: classNameRaw } = Object.assign(
    {
      step: -1,
      zoomOut: undefined,
    },
    props
  );

  let className = `${defaultClassName}-zoom`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return (
    <ButtonWrapper
      className={`${className} zoom-out`}
      onClick={() => zoomOut(step)}
    >
      <div>
        <ZoomOutOutlined />
      </div>
    </ButtonWrapper>
  );
};

export const ZoomIn = (props) => {
  const { step, zoomIn, className: classNameRaw } = Object.assign(
    {
      step: 1,
      zoomIn: undefined,
    },
    props
  );

  let className = `${defaultClassName}-zoom`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return (
    <ButtonWrapper
      className={`${className} zoom-in`}
      onClick={() => zoomIn(step)}
    >
      <div>
        <ZoomInOutlined />
      </div>
    </ButtonWrapper>
  );
};

export const ZoomComponent = (props) => {
  const { step, orientation, className: classNameRaw } = Object.assign(
    {
      step: 1,
      orientation: 'horizontal',
    },
    props
  );

  let className = `${defaultClassName}-zoom`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return (
    <Wrapper className={className} orientation={orientation}>
      <ZoomOut {...props} step={-Math.abs(step)} />
      <ZoomIn {...props} step={Math.abs(step)} />
    </Wrapper>
  );
};

export const Zoom = container(ZoomComponent);

Zoom.ZoomOut = container(ZoomOut);
Zoom.ZoomIn = container(ZoomIn);

Zoom.propTypes = {
  /**
   * The number of steps, for both zoom-in and out, that we want to increment the zoom by.
   */
  step: PropTypes.number,
  /**
   * Used to the set the orientation/alignment of the buttons.
   */
  orientation: PropTypes.string,
  /**
   * Function to execute when user clicks 'Zoom In'.
   */
  zoomIn: PropTypes.func,
  /**
   * Function to execute when user clicks 'Zoom Out'.
   */
  zoomOut: PropTypes.func,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */
  className: PropTypes.string,
};

Zoom.defaultProps = {
  orientation: 'horizontal',
  zoomIn: undefined,
  zoomOut: undefined,
  className: '',
};

ZoomComponent.Icon = ZoomInOutlined;
ZoomComponent.componentName = 'Zoom';

export default Zoom;
