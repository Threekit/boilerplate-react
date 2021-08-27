import React from 'react';
import { ShareOutlined } from '../../../icons';
import { ButtonWrapper } from '../widgets.styles';
import defaultClassName from '../classNames';

export const ShareEmailButton = (props) => {
  const { handleClick, className: classNameRaw, showLabel } = props;

  let className = `${defaultClassName}-email-share`;
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
      <div>Send to e-mail</div>
    </ButtonWrapper>
  );
};

export default ShareEmailButton;
