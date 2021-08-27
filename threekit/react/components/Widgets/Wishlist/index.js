import React from 'react';
import { AddWishlistButton, OpenWishlistButton } from './WishlistButtons';
import AddToWishlist from './AddToWishlist';
import WishlistComponent from './Wishlist';
import { Drawer, Modal } from '../../Layouts';
import { TwinButtonWrapper } from '../widgets.styles';
import container from './wishlistContainer';
import { WishlistOutlined } from '../../../icons';

export const Wishlist = (props) => {
  const {
    title,
    wishlist,
    onAdd,
    onDelete,
    onResume,
    showAdd,
    setShowAdd,
    showWishlist,
    setShowWishlist,
  } = Object.assign(
    {
      title: 'Wishlist',
      wishlist: undefined,
      showAdd: false,
      setShowAdd: undefined,
      showWishlist: false,
      setShowWishlist: undefined,
      onAdd: undefined,
    },
    props
  );

  return (
    <React.Fragment>
      <TwinButtonWrapper>
        <AddWishlistButton handleClick={() => setShowAdd(true)} />
        <OpenWishlistButton handleClick={() => setShowWishlist(true)} />
      </TwinButtonWrapper>
      <Drawer show={showWishlist} handleClose={() => setShowWishlist(false)}>
        <WishlistComponent
          title={title}
          cart={wishlist?.cart || []}
          onCancel={() => setShowWishlist(false)}
          onDelete={onDelete}
          onResume={onResume}
        />
      </Drawer>
      <Modal show={showAdd} handleClose={() => setShowAdd(false)}>
        <AddToWishlist onCancel={() => setShowAdd(false)} onAdd={onAdd} />
      </Modal>
    </React.Fragment>
  );
};

Wishlist.Icon = WishlistOutlined;
Wishlist.componentName = 'Wishlist';

export default container(Wishlist);
