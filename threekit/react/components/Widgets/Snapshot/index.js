import React from 'react';
import PropTypes from 'prop-types';
import { ButtonWrapper } from '../widgets.styles';
import container from './snapshotContainer';
import defaultClassName from '../classNames';
import { SNAPSHOT_FORMATS } from '../../../../constants';
import { DownloadOutlined } from '../../../icons';

export const Snapshot = (props) => {
  const { handleClick, className: classNameRaw, showLabel } = props;

  let className = `${defaultClassName}-snapshot`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return (
    <ButtonWrapper
      showLabel={showLabel}
      className={className}
      onClick={handleClick}
    >
      <div>
        <DownloadOutlined />
      </div>
      <div>Download image</div>
    </ButtonWrapper>
  );
};

Snapshot.propTypes = {
  /**
   * The list of cameras we want snapshots from. Takes either an array of string
   * or optionally a string for a single camera
   */
  cameras: PropTypes.array,
  /**
   * The name you would like to give the file (Do not include the format).
   */
  filename: PropTypes.string,
  /**
   * Function to execute when user clicks 'Snapshot'.
   */
  format: PropTypes.string,
  /**
   * Format you would like the image to be saved in
   */
  handleClick: PropTypes.func,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */ className: PropTypes.string,
};

Snapshot.defaultProps = {
  cameras: undefined,
  handleClick: undefined,
  classname: '',
  filename: 'snapshot',
  format: SNAPSHOT_FORMATS.png,
};

Snapshot.Icon = DownloadOutlined;
Snapshot.componentName = 'Download Snapshot';

export default container(Snapshot);
