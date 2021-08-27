import React, { useState, useEffect } from 'react';
import { useThreekitInitStatus, useWishlist } from '../../../hooks';

const wishlistContainer = (WrappedComponent) => (props) => {
  const [showAdd, setShowAdd] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  const [
    wishlist,
    handleAddToCart,
    handleDeleteFromCart,
    handleResumeConfiguration,
  ] = useWishlist(props.userId);
  const hasLoaded = useThreekitInitStatus();

  if (!hasLoaded || !props.userId) return null;

  const onAdd = async (metadata) => {
    await handleAddToCart(metadata, { snapshotCamera: props.snapshotCamera });
    setShowAdd(false);
  };

  const onDelete = async (idx) => {
    handleDeleteFromCart(idx);
  };

  const onResume = async (idx) => {
    await handleResumeConfiguration(idx);
    setShowWishlist(false);
  };

  return (
    <WrappedComponent
      {...props}
      wishlist={wishlist}
      onAdd={onAdd}
      onDelete={onDelete}
      onResume={onResume}
      showAdd={showAdd}
      setShowAdd={setShowAdd}
      showWishlist={showWishlist}
      setShowWishlist={setShowWishlist}
    />
  );
};

export default wishlistContainer;
