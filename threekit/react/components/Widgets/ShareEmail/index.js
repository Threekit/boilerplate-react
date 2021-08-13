import React from 'react';
import WidgetButton from './EmailShareButton';
import EmailShareForm from './EmailShareForm';
import { Modal } from '../../Layouts';
import container from './shareEmailcontainer';

export const ShareEmail = (props) => {
  const { onSend, show, setShow } = Object.assign(
    { onSend: undefined, show: false, setShow: undefined },
    props
  );

  const handleSend = async (data) => {
    const response = await onSend(data);
    setShow(false);
  };

  return (
    <React.Fragment>
      <WidgetButton handleClick={() => setShow(true)} />
      <Modal show={show} handleClose={() => setShow(false)}>
        <EmailShareForm onSend={handleSend} onCancel={() => setShow(false)} />
      </Modal>
    </React.Fragment>
  );
};

export default container(ShareEmail);
