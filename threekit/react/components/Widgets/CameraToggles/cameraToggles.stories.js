import React from 'react';
import 'antd/dist/antd.css';

import { CameraToggles } from './index';

export default {
  title: 'Widgets/Camera Toggles',
  component: CameraToggles,
  //   argTypes: { handleClick: { action: 'clicked' } },
};

const Template = (args) => <CameraToggles {...args} />;

export const Default = Template.bind({});
Default.args = {};
