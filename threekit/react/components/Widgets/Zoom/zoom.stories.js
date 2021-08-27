import React from 'react';
import 'antd/dist/antd.css';

import { ZoomComponent } from './index';

export default {
  title: 'Widgets/Zoom',
  component: ZoomComponent,
  //   argTypes: { handleClick: { action: 'clicked' } },
};

const Template = (args) => <ZoomComponent {...args} />;

export const Horizontal = Template.bind({});
Horizontal.args = {};

export const Vertical = Template.bind({});
Vertical.args = {
  orientation: 'vertical',
};
