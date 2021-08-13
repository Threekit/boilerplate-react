import React from 'react';
import 'antd/dist/antd.css';

import { TextInput } from './index';

export default {
  title: 'Input Components/Text Input',
  component: TextInput,
  //   argTypes: { handleClick: { action: 'clicked' } },
};

const Template = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Text Input Title',
  description: 'This is an example of a text input component',
};
