import React from 'react';
import { ShareOutlined } from '../../../icons';
import { ButtonWrapper } from '../widgets.styles';
import defaultClassName from '../classNames';

export const ShareSmsButton = (props) => {
  const { handleClick, className: classNameRaw, showLabel } = props;

  let className = `${defaultClassName}-sms-share`;
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
      <div>Share by sms</div>
    </ButtonWrapper>
  );
};

export default ShareSmsButton;
