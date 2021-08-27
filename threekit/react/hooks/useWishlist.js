import { useState, useEffect } from 'react';
import useThreekitInitStatus from './useThreekitInitStatus';

const useWishlist = (userId) => {
  const [wishlist, setWishlist] = useState(undefined);

  const isLoaded = useThreekitInitStatus();

  useEffect(() => {
    (async () => {
      if (userId && isLoaded) {
        const data = await window.threekit.controller.getUserWishlist(userId);
        setWishlist(data);
      }
    })();
  }, [userId, isLoaded]);

  if (!userId || !isLoaded) return [undefined, undefined, undefined, undefined];

  const handleAddToCart = (metadata, config) =>
    new Promise(async (resolve) => {
      const { snapshotCamera } = config;
      const updatedWishlist = await window.threekit.controller.addToUserWishlist(
        userId,
        {
          metadata,
          snapshotCamera,
        }
      );
      setWishlist(updatedWishlist);
      resolve();
    });

  const handleDeleteFromCart = async (idx) =>
    new Promise(async (resolve) => {
      const { configurationId } = wishlist.cart[idx];
      const updatedWishlist = await window.threekit.controller.deleteFromUserWishlist(
        configurationId
      );
      setWishlist(updatedWishlist);
      resolve();
    });

  const handleResumeConfiguration = (idx) =>
    new Promise(async (resolve) => {
      const { configurationId } = wishlist.cart[idx];
      await window.threekit.controller.resumeConfiguration(configurationId);
      resolve();
    });

  return [
    wishlist,
    handleAddToCart,
    handleDeleteFromCart,
    handleResumeConfiguration,
  ];
};

export default useWishlist;
