import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  .tk-icon-fill {
    fill: black;
  }

  .tk-icon-heart {
    fill: white;
  }

  .tk-icon-stroke {
    stroke: black;
    stroke-width: 1;
  }
`;

export const WishlistOutlined = () => {
  return (
    <SVG
      width="24"
      height="26"
      viewBox="0 0 24 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="16" height="20" className="tk-icon-stroke" />
      <rect x="4" y="5" width="2" height="2" className="tk-icon-fill" />
      <rect x="4" y="10" width="2" height="2" className="tk-icon-fill" />
      <rect x="4" y="15" width="2" height="2" className="tk-icon-fill" />
      <rect x="8" y="5" width="6" height="2" className="tk-icon-fill" />
      <rect x="8" y="10" width="6" height="2" className="tk-icon-fill" />
      <rect x="8" y="15" width="6" height="2" className="tk-icon-fill" />
      <path
        d="M15.4088 23.8065L16 24.2399L16.5912 23.8065C16.8733 23.5997 17.1867 23.3797 17.5178 23.1473C18.5023 22.456 19.6439 21.6546 20.587 20.7629C21.868 19.5518 23 17.9863 23 15.9629C23 13.7463 21.3333 12.4003 19.6355 12.0798C18.411 11.8486 16.9987 12.1186 16 13.0523C15.0014 12.1186 13.589 11.8486 12.3645 12.0797C10.6667 12.4003 9 13.7463 9 15.9629C9 17.9863 10.132 19.5517 11.413 20.7629C12.3561 21.6546 13.4977 22.456 14.4823 23.1473C14.8134 23.3797 15.1267 23.5997 15.4088 23.8065Z"
        className="tk-icon-stroke tk-icon-heart"
      />
    </SVG>
  );
};

export default WishlistOutlined;
