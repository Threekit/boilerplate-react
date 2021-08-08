import React from 'react';
import { Wrapper, TitleWrapper, FormWrapper } from './singleProduct.styles';

import {
  Player,
  TwoCol,
  ThreekitProvider,
  Title,
  Description,
  Form,
} from '../../components';
import { selectAttribute, animateItem } from '../../../tools';

const FORMS = {
  basic: 'basic',
};

const formsComponents = {
  [FORMS.basic]: Form,
};

export const SingleProductComponent = (props) => {
  const { form, attributeComponents } = Object.assign(
    { form: FORMS.basic, attributeComponents: {} },
    props
  );

  const FormComponent = formsComponents[form];

  return (
    <Wrapper>
      <TwoCol>
        <div>
          <Player />
        </div>
        <FormWrapper>
          <TitleWrapper>
            <Title />
            <Description />
          </TitleWrapper>
          <FormComponent attributeComponents={attributeComponents} />
        </FormWrapper>
      </TwoCol>
    </Wrapper>
  );
};

export const SingleProduct = (props) => {
  const additionalTools = [];
  if (props.interactive) additionalTools.push(selectAttribute());
  else if (props.animated) additionalTools.push(animateItem());
  const config = Object.assign({}, props.config, {
    additionalTools,
  });
  return (
    <ThreekitProvider config={config}>
      <SingleProductComponent {...props} />
    </ThreekitProvider>
  );
};

export default SingleProduct;
