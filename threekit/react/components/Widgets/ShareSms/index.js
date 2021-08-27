import React from 'react';
import WidgetButton from './ShareSmsButton';
import ShareEmailForm from './ShareSmsForm';
import { Modal } from '../../Layouts';
import container from './shareSmsContainer';
import { ShareOutlined } from '../../../icons';

export const ShareSms = (props) => {
  const { onSend, show, setShow, showLabel } = Object.assign(
    { onSend: undefined, show: false, setShow: undefined },
    props
  );

  return (
    <React.Fragment>
      <WidgetButton handleClick={() => setShow(true)} showLabel={showLabel} />
      <Modal show={show} handleClose={() => setShow(false)}>
        <ShareEmailForm onSend={onSend} onCancel={() => setShow(false)} />
      </Modal>
    </React.Fragment>
  );
};

ShareSms.componentName = 'Share Sms';
ShareSms.Icon = ShareOutlined;

export default container(ShareSms);
