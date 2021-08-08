import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  .tk-icon {
    fill: black;
  }
`;

export const CaretRightOutlined = () => {
  return (
    <SVG
      width="10"
      height="16"
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="tk-icon"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.70712 15.7071L0.292908 14.2929L6.5858 8L0.292907 1.70711L1.70712 0.292894L9.41423 8L1.70712 15.7071Z"
      />
    </SVG>
  );
};

export default CaretRightOutlined;
