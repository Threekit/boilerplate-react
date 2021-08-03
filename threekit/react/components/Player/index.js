import React, { useEffect } from 'react';
import {
  Wrapper,
  TopLeftWidgetsWrapper,
  TopCenterWidgetsWrapper,
  TopRightWidgetsWrapper,
  MiddleLeftWidgetsWrapper,
  MiddleRightWidgetsWrapper,
  BottomLeftWidgetsWrapper,
  BottomCenterWidgetsWrapper,
  BottomRightWidgetsWrapper,
} from './player.styles';
import Controller from '../../../controller';
import {
  TK_PLAYER_DIV_ID,
  DEFAULT_CLASS_NAME,
  CLASS_NAME_PREFIX,
} from '../../../constants';

const className = `${DEFAULT_CLASS_NAME} ${CLASS_NAME_PREFIX}-player`;

const Player = (props) => {
  const { height, width, minHeight, children } = Object.assign(
    {
      height: '70vh',
      minHeight: '600px',
      width: '100%',
    },
    props
  );

  useEffect(() => {
    (() => {
      Controller.attachPlayerToComponent(TK_PLAYER_DIV_ID);
    })();
    return;
  }, []);

  return (
    <Wrapper
      height={height}
      width={width}
      minHeight={minHeight}
      className={className}
    >
      <div id={TK_PLAYER_DIV_ID} />
      {children}
    </Wrapper>
  );
};

Player.TopLeftWidgets = ({ children }) =>
  children ? <TopLeftWidgetsWrapper>{children}</TopLeftWidgetsWrapper> : null;

Player.TopCenterWidgets = ({ children }) =>
  children ? (
    <TopCenterWidgetsWrapper>{children}</TopCenterWidgetsWrapper>
  ) : null;

Player.TopRightWidgets = ({ children }) =>
  children ? <TopRightWidgetsWrapper>{children}</TopRightWidgetsWrapper> : null;

Player.MiddleLeftWidgets = ({ children }) =>
  children ? (
    <MiddleLeftWidgetsWrapper>{children}</MiddleLeftWidgetsWrapper>
  ) : null;

Player.MiddleRightWidgets = ({ children }) =>
  children ? (
    <MiddleRightWidgetsWrapper>{children}</MiddleRightWidgetsWrapper>
  ) : null;

Player.BottomLeftWidgets = ({ children }) =>
  children ? (
    <BottomLeftWidgetsWrapper>{children}</BottomLeftWidgetsWrapper>
  ) : null;

Player.BottomCenterWidgets = ({ children }) =>
  children ? (
    <BottomCenterWidgetsWrapper>{children}</BottomCenterWidgetsWrapper>
  ) : null;

Player.BottomRightWidgets = ({ children }) =>
  children ? (
    <BottomRightWidgetsWrapper>{children}</BottomRightWidgetsWrapper>
  ) : null;

export default Player;
