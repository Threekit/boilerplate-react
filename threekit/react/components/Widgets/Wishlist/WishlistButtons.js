import React from 'react';
import { ButtonWrapper } from '../widgets.styles';
import { HeartOutlined, WishlistOutlined } from '../../../icons';
import defaultClassName from '../classNames';

export const AddWishlistButton = (props) => {
  const { handleClick, className: classNameRaw } = props;

  let className = `${defaultClassName}-wishlist`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return (
    <ButtonWrapper className={`${className} add-btn`} onClick={handleClick}>
      <div>
        <HeartOutlined />
      </div>
    </ButtonWrapper>
  );
};

export const OpenWishlistButton = (props) => {
  const { handleClick, className: classNameRaw } = props;

  let className = `${defaultClassName}-wishlist`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return (
    <ButtonWrapper className={`${className} open-btn`} onClick={handleClick}>
      <div>
        <WishlistOutlined />
      </div>
    </ButtonWrapper>
  );
};
