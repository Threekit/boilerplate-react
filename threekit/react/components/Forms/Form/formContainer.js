import React from 'react';
import { useAttributes, useNestedConfigurator } from '../../../hooks';
import { Modal, Drawer } from '../../Layouts';
import { DISPLAY_OPTIONS } from '../../../../constants';
import { filterFormAttributes } from '../../../../utils';

const attributesContainer = (WrappedComponent, props) => {
  const [attributes] = useAttributes();
  const { includeReservedAttributes, attributeComponents } = Object.assign(
    { includeReservedAttributes: false, attributeComponents: {} },
    props
  );

  const filterAttributes = filterFormAttributes(
    attributes,
    attributeComponents,
    includeReservedAttributes
  );

  return <WrappedComponent {...props} attributes={filterAttributes} />;
};

const nestedAttributesContainer = (WrappedComponent, props) => {
  const [
    nestedAttributes,
    address,
    setNestedAttributeAddress,
  ] = useNestedConfigurator();

  const { includeReservedAttributes, attributeComponents } = Object.assign(
    { includeReservedAttributes: false, attributeComponents: {} },
    props
  );

  const DisplayComponent =
    props.display === DISPLAY_OPTIONS.drawer
      ? Drawer
      : props.display === DISPLAY_OPTIONS.modal
      ? Modal
      : undefined;

  const filterAttributes = filterFormAttributes(
    nestedAttributes,
    attributeComponents,
    includeReservedAttributes
  );

  if (!DisplayComponent)
    return (
      <WrappedComponent
        {...props}
        title={address?.[0] || ''}
        attributes={filterAttributes}
      />
    );

  return (
    <DisplayComponent
      show={!!address}
      handleClose={() => setNestedAttributeAddress(undefined)}
    >
      <WrappedComponent
        {...props}
        title={address?.[0] || ''}
        attributes={filterAttributes}
      />
    </DisplayComponent>
  );
};

const formContainer = (WrappedComponent) => (props) => {
  if (props.nestedConfigurator)
    return nestedAttributesContainer(WrappedComponent, props);
  return attributesContainer(WrappedComponent, props);
};

export default formContainer;
