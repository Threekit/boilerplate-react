import React from 'react';
import WishlistItem from './WishlistItem';
import { DeleteOutlined, ShareOutlined, CartOutlined } from '../../../icons';
import {
  WishlistWrapper as Wrapper,
  WishlistHeader as Header,
  WishlistContent as Content,
  WishlistActionArea as ActionArea,
  WishlistActionAreaButton as ButtonWrapper,
} from './wishlist.styles';

export const Wishlist = (props) => {
  const { title, cart, onCancel, onDelete, onResume } = Object.assign(
    {
      title: 'Wishlist',
      cart: [],
      onCancel,
      onDelete,
      onResume,
    },
    props
  );

  return (
    <Wrapper>
      <Header>
        <div>{title}</div>
        <div onClick={() => onCancel()}>X</div>
      </Header>
      <Content>
        {cart.map((el, i) => (
          <WishlistItem
            key={i}
            {...el}
            onDelete={() => onDelete(i)}
            onResume={() => onResume(i)}
          />
        ))}
      </Content>
      {/* <ActionArea>
        <ButtonWrapper showLabel>
          <div>
            <DeleteOutlined />
          </div>
          <div>Delete All</div>
        </ButtonWrapper>
        <ButtonWrapper showLabel>
          <div>
            <ShareOutlined />
          </div>
          <div>Share wishlist</div>
        </ButtonWrapper>
        <ButtonWrapper showLabel>
          <div>
            <CartOutlined />
          </div>
          <div>Add all to cart</div>
        </ButtonWrapper>
      </ActionArea> */}
    </Wrapper>
  );
};

export default Wishlist;
