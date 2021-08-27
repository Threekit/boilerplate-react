import React from 'react';
import 'antd/dist/antd.css';

import { ShareEmailForm } from './ShareEmailForm';
import { ShareEmailButton } from './ShareEmailButton';

export default {
  title: 'Widgets/ShareEmail',
  component: ShareEmailForm,
  //   argTypes: { handleClick: { action: 'clicked' } },
};

const TemplateShareEmailForm = (args) => <ShareEmailForm {...args} />;
const TemplateShareEmailButton = (args) => <ShareEmailButton {...args} />;

export const WidgetButton = TemplateShareEmailButton.bind({});
WidgetButton.args = {};

export const DefaultForm = TemplateShareEmailForm.bind({});
DefaultForm.args = {};

export const DetailedForm = TemplateShareEmailForm.bind({});
DetailedForm.args = {
  includeName: true,
  includeMessage: true,
};
