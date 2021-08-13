import React from 'react';
import 'antd/dist/antd.css';

import { TextArea } from './index';

export default {
  title: 'Input Components/Text Area',
  component: TextArea,
  //   argTypes: { handleClick: { action: 'clicked' } },
};

const Template = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Text Area Title',
  description: 'This is an example of a text area component',
};
