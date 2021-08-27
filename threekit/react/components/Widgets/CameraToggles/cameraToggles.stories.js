import React from 'react';
import 'antd/dist/antd.css';

import {
  CameraToggleLeft as CameraToggleLeftComponent,
  CameraToggleRight as CameraToggleRightComponent,
  CameraToggleSingle as CameraToggleSingleComponent,
  CameraTogglesComponent,
} from './index';

export default {
  title: 'Widgets/Camera Toggles',
  component: CameraTogglesComponent,
  //   argTypes: { handleClick: { action: 'clicked' } },
};

const TemplateToggleLeft = (args) => <CameraToggleLeftComponent {...args} />;
const TemplateToggleRight = (args) => <CameraToggleRightComponent {...args} />;
const TemplateToggleSingle = (args) => (
  <CameraToggleSingleComponent {...args} />
);
const TemplateCameraToggles = (args) => <CameraTogglesComponent {...args} />;

export const CameraToggleLeft = TemplateToggleLeft.bind({});
CameraToggleLeft.args = {};

export const CameraToggleRight = TemplateToggleRight.bind({});
CameraToggleRight.args = {};

export const CameraToggleSingle = TemplateToggleSingle.bind({});
CameraToggleSingle.args = {};

export const CameraToggles = TemplateCameraToggles.bind({});
CameraToggles.args = {};
