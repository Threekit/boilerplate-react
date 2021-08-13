import React from 'react';
import 'antd/dist/antd.css';

import { EmailShareForm } from './EmailShareForm';
import { EmailShareButton } from './EmailShareButton';

export default {
  title: 'Widgets/ShareEmail',
  component: EmailShareForm,
  //   argTypes: { handleClick: { action: 'clicked' } },
};

const TemplateEmailShareForm = (args) => <EmailShareForm {...args} />;
const TemplateEmailShareButton = (args) => <EmailShareButton {...args} />;

export const WidgetButton = TemplateEmailShareButton.bind({});
WidgetButton.args = {};

export const DefaultForm = TemplateEmailShareForm.bind({});
DefaultForm.args = {};

export const DetailedForm = TemplateEmailShareForm.bind({});
DetailedForm.args = {
  includeName: true,
  includeMessage: true,
};
