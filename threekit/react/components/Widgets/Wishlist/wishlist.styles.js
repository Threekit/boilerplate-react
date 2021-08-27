import styled from 'styled-components';
import { ButtonWrapper } from '../widgets.styles';

/*****************************************************
 * Wishlist
 ****************************************************/

export const WishlistWrapper = styled.div`
  width: 600px;
  height: 100vh;

  display: grid;
  grid-template-rows: max-content auto max-content;
`;

export const WishlistHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 0 12px;
  padding: 10px 0px;
  border-bottom: 1px solid ${(props) => props.theme.borderColorBase};

  & > div {
    height: max-content;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  & > div:nth-child(1) {
    font-size: 20px;
    color: ${(props) => props.theme.textColor};
  }

  & > div:nth-child(2) {
    cursor: pointer;
  }
`;

export const WishlistContent = styled.div`
  margin: 0 12px;
  padding: 10px 0px;
  overflow: scroll;
`;

export const WishlistActionArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  background: #f2f2f4;
  padding: 20px 0px;
`;

export const WishlistActionAreaButton = styled(ButtonWrapper)`
  background: white;
`;

/*****************************************************
 * Wishlist Item
 ****************************************************/

export const WishlistItemWrapper = styled.div`
  border-bottom: 1px solid #eee;
  padding: 16px 0px;
`;

export const WishlistItemContent = styled.div`
  display: grid;
  grid-template-columns: max-content auto max-content;
  grid-gap: 12px;

  & > div:nth-child(1) {
    img {
      width: 80px;
    }
  }

  & > div:nth-child(2) {
  }

  & > div:nth-child(3) {
    color: ${(props) => props.theme.textColorSecondary};
    font-size: 18px;
    font-weight: 600;
  }
`;

export const WishlistItemActionArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  & > div {
    margin-left: 8px;
  }
`;

/*****************************************************
 * Add Wishlist
 ****************************************************/

export const AddWishlistWrapper = styled.div`
  width: 600px;
  padding: 16px 32px;
  background: #ffffff;
  /* box-shadow: 17px 0px 45px rgba(0, 0, 0, 0.1); */
  border-radius: 4px;
  border: 1px solid grey;

  display: grid;
  grid-template-rows: repeat(3, max-content);
  grid-gap: 12px;
`;

export const AddWishlistHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  color: ${(props) => props.theme.textColor};

  & > div:nth-child(1) {
    font-size: 20px;
    font-weight: 600;
  }

  & > div:nth-child(2) {
    cursor: pointer;
  }
`;

export const AddWishlistContent = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  grid-gap: 28px;

  & > div:nth-child(1) {
    img {
      width: 128px;
    }
  }

  & > div:nth-child(2) {
  }
`;

export const AddWishlistActionArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  & > div {
    margin-left: 8px;
  }
`;

export const InputTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
`;
