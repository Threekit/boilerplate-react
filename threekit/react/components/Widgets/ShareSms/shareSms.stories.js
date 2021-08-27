import React from 'react';
import 'antd/dist/antd.css';

import { ShareSmsForm } from './ShareSmsForm';
import { ShareSmsButton } from './ShareSmsButton';

export default {
  title: 'Widgets/Share Sms',
  component: ShareSmsForm,
  //   argTypes: { handleClick: { action: 'clicked' } },
};

const TemplateShareSmsForm = (args) => <ShareSmsForm {...args} />;
const TemplateShareSmsButton = (args) => <ShareSmsButton {...args} />;

export const WidgetButton = TemplateShareSmsButton.bind({});
WidgetButton.args = {};

export const Form = TemplateShareSmsForm.bind({});
Form.args = {};
