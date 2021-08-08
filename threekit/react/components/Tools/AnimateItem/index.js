import { useEffect, useRef } from 'react';
import { useThreekitInitStatus } from '../../../hooks';
import { METADATA_RESERVED } from '../../../../constants';
import { easeInOutCubic, metadataValueToObject } from '../../../../utils';

export const AnimateItem = (props) => {
  const loaded = useThreekitInitStatus();

  const originalPosition = useRef();
  const originalRotation = useRef();
  const isTransformed = useRef();
  const animationInProgress = useRef();

  const {
    topItemOnly,
    translateMetadataField,
    rotateMetadataField,
    duration,
  } = Object.assign(
    {
      topItemOnly: true,
      translateMetadataField: METADATA_RESERVED.translate,
      rotateMetadataField: METADATA_RESERVED.rotate,
      duration: 1000,
    },
    props
  );

  useEffect(() => {
    const tool = (player) => ({
      key: 'animate-item',
      label: 'animate-item',
      active: true,
      enabled: true,
      handlers: {
        click: async (event) => {
          const hits = event.hitNodes;
          if (!hits?.length) return undefined;
          const hierarchy = [...hits[0].hierarchy];
          hierarchy.reverse();

          let itemId;
          let item;
          let nullId;
          let translateDelta;
          let rotateDelta;
          if (topItemOnly) {
            for (let node of hierarchy) {
              if (itemId) continue;
              if (node.type === 'Null') {
                nullId = node.nodeId;
                continue;
              }
              if (node.type === 'Item') itemId = node.nodeId;
            }
            if (!nullId) return;

            if (animationInProgress.current[nullId] === true) return;

            item = window.threekit.player.scene.get({ id: itemId });

            const translate = item.configurator?.metadata.find(
              (el) => el.name === translateMetadataField
            );
            const rotate = item.configurator?.metadata.find(
              (el) => el.name === rotateMetadataField
            );

            if (!translate && !rotate) return;

            if (translate) {
              translateDelta = Object.assign(
                { x: 0, y: 0, z: 0, duration },
                metadataValueToObject(translate?.defaultValue)
              );

              originalPosition.current[
                nullId
              ] = window.threekit.player.scene.get({
                id: nullId,
                plug: 'Transform',
                property: 'translation',
              });
            }
            if (rotate) {
              rotateDelta = Object.assign(
                { x: 0, y: 0, z: 0, duration },
                metadataValueToObject(rotate?.defaultValue)
              );

              originalRotation.current[
                nullId
              ] = window.threekit.player.scene.get({
                id: nullId,
                plug: 'Transform',
                property: 'rotation',
              });
            }
          }

          if (!(nullId in isTransformed.current))
            isTransformed.current[nullId] = false;

          let start;
          const animateFrame = (timestamp) => {
            let axisList = ['x', 'y', 'z'];
            if (start === undefined) start = timestamp;
            const elapsed = timestamp - start;

            if (translateDelta) {
              //  Translate Setup
              let updatedPosition = {
                x: undefined,
                y: undefined,
                z: undefined,
              };
              const tProgress = elapsed / translateDelta.duration;
              const tAnimPercent = easeInOutCubic(tProgress);
              if (!isTransformed.current[nullId]) {
                updatedPosition = axisList.reduce((output, axis) => {
                  return Object.assign(output, {
                    [axis]: Math.min(
                      originalPosition.current[nullId][axis] +
                        translateDelta[axis] * tAnimPercent,
                      translateDelta[axis]
                    ),
                  });
                }, updatedPosition);
              } else {
                updatedPosition = axisList.reduce((output, axis) => {
                  return Object.assign(output, {
                    [axis]: Math.min(
                      originalPosition.current[nullId][axis] -
                        translateDelta[axis] * tAnimPercent,
                      translateDelta[axis]
                    ),
                  });
                }, updatedPosition);
              }

              window.threekit.player.scene.set(
                {
                  id: nullId,
                  plug: 'Transform',
                  property: 'translation',
                },
                updatedPosition
              );
            }
            if (rotateDelta) {
              //  Rotation Setup
              let updatedRotation = {
                x: undefined,
                y: undefined,
                z: undefined,
              };
              const rProgress = elapsed / rotateDelta.duration;
              const rAnimPercent = easeInOutCubic(rProgress);
              if (!isTransformed.current[nullId]) {
                updatedRotation = axisList.reduce((output, axis) => {
                  return Object.assign(output, {
                    [axis]: Math.min(
                      originalRotation.current[nullId][axis] +
                        rotateDelta[axis] * rAnimPercent,
                      rotateDelta[axis]
                    ),
                  });
                }, updatedRotation);
              } else {
                updatedRotation = axisList.reduce((output, axis) => {
                  return Object.assign(output, {
                    [axis]: Math.min(
                      originalRotation.current[nullId][axis] -
                        rotateDelta[axis] * rAnimPercent,
                      rotateDelta[axis]
                    ),
                  });
                }, updatedRotation);
              }

              window.threekit.player.scene.set(
                {
                  id: nullId,
                  plug: 'Transform',
                  property: 'rotation',
                },
                updatedRotation
              );
            }

            if (
              elapsed <
              Math.max(
                translateDelta?.duration || 0,
                rotateDelta?.duration || 0
              )
            ) {
              window.requestAnimationFrame(animateFrame);
            } else {
              animationInProgress.current[nullId] = false;
              isTransformed.current[nullId] = !isTransformed.current[nullId];
            }
          };

          animationInProgress.current[nullId] = true;
          window.requestAnimationFrame(animateFrame);
        },
      },
    });

    (() => {
      if (!loaded) return;
      originalPosition.current = {};
      originalRotation.current = {};
      isTransformed.current = {};
      animationInProgress.current = {};
      window.threekit.controller.addTool(tool);
    })();
    // return window.threekit.controller.removeTool(tooltip());
  }, [loaded]);

  return null;
};

export default AnimateItem;
