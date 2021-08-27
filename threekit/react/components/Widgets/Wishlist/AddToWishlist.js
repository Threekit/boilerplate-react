import React, { useState, useEffect } from 'react';
import {
  AddWishlistWrapper as Wrapper,
  AddWishlistHeader as Header,
  AddWishlistContent as Content,
  AddWishlistActionArea as ActionArea,
  InputTitle,
} from './wishlist.styles';
import { ButtonWrapper } from '../../InputComponents/inputComponents.styles';
import { TextInput } from '../../InputComponents/TextInput';

export const AddToWishlist = (props) => {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [thumbnail, setThumbnail] = useState(undefined);

  useEffect(() => {
    (async () => {
      const [imageUrl] = await window.threekit.controller.takeSnapshots(
        'snapshot',
        {
          output: 'dataUrl',
        }
      );
      setThumbnail(imageUrl);
    })();
  }, []);

  const { imageUrl, onCancel, onAdd } = Object.assign(
    { imageUrl: undefined, onCancel: undefined, onAdd: undefined },
    props
  );

  const handleClickCancel = () => {
    onCancel();
  };

  const handleClickAdd = () => {
    onAdd({ name, note });
  };

  return (
    <Wrapper>
      <Header>
        <div>Add to Wishlist</div>
        <div onClick={handleClickCancel}>X</div>
      </Header>
      <Content>
        <div>
          {thumbnail ? <img src={thumbnail} alt="saved-configuration" /> : null}
        </div>
        <div>
          <div>
            <InputTitle>Name</InputTitle>
            <TextInput value={name} handleChange={(val) => setName(val)} />
          </div>
          <div>
            <InputTitle>Note</InputTitle>
            <TextInput value={note} handleChange={(val) => setNote(val)} />
          </div>
        </div>
      </Content>
      <ActionArea>
        <ButtonWrapper onClick={handleClickCancel}>
          <div>Cancel</div>
        </ButtonWrapper>
        <ButtonWrapper onClick={handleClickAdd}>
          <div>Add to wishlist</div>
        </ButtonWrapper>
      </ActionArea>
    </Wrapper>
  );
};

export default AddToWishlist;
