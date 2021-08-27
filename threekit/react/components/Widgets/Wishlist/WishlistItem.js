import React from 'react';
import {
  WishlistItemWrapper as Wrapper,
  WishlistItemContent as Content,
  WishlistItemActionArea as ActionArea,
} from './wishlist.styles';
import { ButtonWrapper } from '../widgets.styles';
import { DeleteOutlined, ShareOutlined } from '../../../icons';

export const WishlistItem = (props) => {
  const { imageUrl, metadata, onCancel, onDelete, onResume } = Object.assign(
    { imageUrl: undefined, metadata, onCancel: undefined, onAdd: undefined },
    props
  );

  const { _thumbnail, name, sku, note, price } = metadata;

  return (
    <Wrapper>
      <Content>
        <div>
          {_thumbnail ? (
            <img src={_thumbnail} alt="saved-configuration" />
          ) : null}
        </div>
        <div>
          {name ? <div>{name}</div> : null}
          {sku ? <div>{sku}</div> : null}
          {note ? <div>{note}</div> : null}
        </div>
        <div>{price}</div>
      </Content>
      <ActionArea>
        <ButtonWrapper onClick={onDelete}>
          <div>
            <DeleteOutlined />
          </div>
        </ButtonWrapper>
        {/* <ButtonWrapper>
          <div>Edit</div>
        </ButtonWrapper> */}
        <ButtonWrapper>
          <div>
            <ShareOutlined />
          </div>
        </ButtonWrapper>
        <ButtonWrapper onClick={onResume} showIcon={false} showLabel>
          <div />
          <div>Resume</div>
        </ButtonWrapper>
      </ActionArea>
    </Wrapper>
  );
};

export default WishlistItem;
