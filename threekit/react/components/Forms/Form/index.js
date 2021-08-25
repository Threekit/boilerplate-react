import React from 'react';
import { Wrapper } from './form.styles';
import { Title, Description } from '../../Display';
import { componentOptions } from '../../InputComponents';
import container from './formContainer';

export const Form = (props) => {
  const {
    title,
    alignTitle,
    description,
    attributes,
    attributeComponents,
    nestedConfigurator,
  } = Object.assign(
    {
      title: undefined,
      alignTitle: 'center',
      description: undefined,
      attributes: [],
      attributeComponents: {},
      nestedConfigurator: false,
    },
    props
  );

  if (!attributes) return null;

  return (
    <Wrapper>
      {!nestedConfigurator ? (
        <>
          <Title align={alignTitle} title={title} />
          <Description description={description} />
        </>
      ) : null}
      {attributes.map((attr, i) => {
        let Component;
        if (attr.name in (attributeComponents || {})) {
          Component = Object.entries(componentOptions[attr.type] || {}).find(
            ([key]) => key === attributeComponents[attr.name]?.toLowerCase()
          )?.[1];
        }
        if (!Component) {
          Component = Object.values(componentOptions[attr.type] || {})?.[0];
        }
        if (!Component) {
          console.log(
            `No default component available for ${attr.type} type Attributes`
          );
          return null;
        }
        return (
          <Component
            key={i}
            nestedConfigurator={nestedConfigurator}
            attribute={attr.name}
          />
        );
      })}
    </Wrapper>
  );
};

export default container(Form);
