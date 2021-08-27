import React from 'react';
import 'antd/dist/antd.css';

import {
  AddWishlistButton as AddWishlist,
  OpenWishlistButton as OpenWishlist,
} from './WishlistButtons';
import { Wishlist as WishlistComponent } from './Wishlist';
import { WishlistItem as WishlistItemComponent } from './WishlistItem';
import { AddToWishlist as AddToWishlistComponent } from './AddToWishlist';

export default {
  title: 'Widgets/Wishlist',
  component: WishlistComponent,
  argTypes: { onAdd: { action: 'clicked' } },
};

const TemplateAddButton = (args) => <AddWishlist {...args} />;
const TemplateOpenButton = (args) => <OpenWishlist {...args} />;
const TemplateWishlist = (args) => <WishlistComponent {...args} />;
const TemplateWishlistItem = (args) => <WishlistItemComponent {...args} />;
const TemplateAddToWishlist = (args) => <AddToWishlistComponent {...args} />;

export const AddButton = TemplateAddButton.bind({});
AddButton.args = {};

export const OpenButton = TemplateOpenButton.bind({});
OpenButton.args = {};

export const Wishlist = TemplateWishlist.bind({});
Wishlist.args = {};

export const WishlistItem = TemplateWishlistItem.bind({});
WishlistItem.args = {
  imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
};

export const AddToWishlist = TemplateAddToWishlist.bind({});
AddToWishlist.args = {
  imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
};
