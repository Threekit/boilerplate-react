import React, { useState } from 'react';
import { Select, Button, Input } from 'antd';
import {
  ComponentSelectorWrapper,
  Title,
  AttributeRow,
  SelectedExperienceWrapper,
  OrdinalCustomizerWrapper,
} from './experienceBuilder.styles';
import { message } from 'antd';
import experiences from '../experiences';
import { ATTRIBUTE_TYPES, DISPLAY_OPTIONS } from '../../constants';
import { componentOptions } from '../../react/components/InputComponents';

export const ComponentSelector = (props) => {
  const { creds, experience, item } = props;
  const { authToken, threekitEnv, orgId } = creds;
  const [attributes, setAttributes] = useState(
    item.attributes.map((el) => ({
      name: el.name,
      type: el.type,
      component: 0,
    }))
  );
  const [arrayAttributeComponent, setArrayAttributeComponent] = useState(
    'cards'
  );
  const [arrayAttributeLabel, setArrayAttributeLabel] = useState('');
  const [display, setDisplay] = useState(DISPLAY_OPTIONS.modal);

  const componentsMap = Object.entries(componentOptions).reduce(
    (output, [attrType, componentsObj]) =>
      Object.assign(output, { [attrType]: Object.keys(componentsObj) }),

    {}
  );

  const handleChange = (attrIdx, componentIdx) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[attrIdx].component = componentIdx;
    setAttributes(updatedAttributes);
  };

  const generateUrl = () => {
    if (!experience?.length)
      return message.warning('Please select an experience');

    let data = {
      assetId: item.id,
      authToken,
      orgId,
      env: threekitEnv,
      experience,
    };

    const attributesPrepped = attributes.reduce((output, el, i) => {
      if (!el.component) return output;
      output += `${i ? ',' : ''}${el.name}::${el.component}`;
      return output;
    }, '');

    if (experience === experiences['ordinal-interactive'].id)
      data = Object.assign(data, {
        arrayAttribute: arrayAttributeLabel,
        arrayAttributeComponent,
        display,
      });
    else if (attributesPrepped?.length)
      data = Object.assign(data, {
        attributes: btoa(attributesPrepped),
      });

    const baseUrl = `${window.location.origin}/experience`;
    const dataParams = Object.entries(data).reduce((output, [key, val], i) => {
      if (!val.length) return output;
      output += `${i ? '&' : ''}${key}=${val}`;
      return output;
    }, '?');

    window.location.href = baseUrl + dataParams;
  };

  if (!experience) return <div>Please choose an experience first.</div>;

  return (
    <ComponentSelectorWrapper>
      <SelectedExperienceWrapper>
        Selected Experience: <span>{experience}</span>
      </SelectedExperienceWrapper>
      <hr />
      <Title>Attributes</Title>
      {experience === experiences['ordinal-interactive'].id ? (
        <OrdinalCustomizerWrapper>
          <div>
            Array Attribute Label:
            <Input
              value={arrayAttributeLabel}
              onChange={(e) => setArrayAttributeLabel(e.target.value)}
            />
          </div>
          <div>
            Selector Component:
            <Select
              style={{ width: 220 }}
              value={arrayAttributeComponent}
              onChange={(value) => setArrayAttributeComponent(value)}
            >
              {(componentsMap[ATTRIBUTE_TYPES.asset] || []).map((el, j) => (
                <Select.Option key={j} value={el}>
                  <span style={{ textTransform: 'capitalize' }}>
                    {el.replace(/-/g, ' ')}
                  </span>
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            Display:
            <Select value={display} onChange={setDisplay}>
              {Object.keys(DISPLAY_OPTIONS).map((el, i) => (
                <Select.Option key={i} value={el}>
                  {el}
                </Select.Option>
              ))}
            </Select>
          </div>
        </OrdinalCustomizerWrapper>
      ) : (
        attributes.map((el, i) => (
          <AttributeRow key={i}>
            <div>
              {el.name} [{el.type}]
            </div>
            <div>
              <Select
                style={{ width: 220 }}
                value={el.component}
                onChange={(value) => handleChange(i, value)}
              >
                {(componentsMap[el.type] || []).map((el, j) => (
                  <Select.Option key={j} value={j}>
                    {el.replace(/-/g, ' ')}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </AttributeRow>
        ))
      )}
      <Button type="primary" onClick={generateUrl}>
        Launch
      </Button>
    </ComponentSelectorWrapper>
  );
};

export default ComponentSelector;
