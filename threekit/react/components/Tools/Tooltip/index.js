import React, { useState, useEffect, useRef } from 'react';
import { useThreekitInitStatus } from '../../../hooks';
import { METADATA_RESERVED } from '../../../../constants';
import { Wrapper, Inner, Arrow } from './tooltip.styles';

export const Tooltip = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const loaded = useThreekitInitStatus();
  const timeout = useRef();
  const positonalElRef = useRef(null);
  const messageElRef = useRef(null);

  const { duration, metadataField, prepOutput } = Object.assign(
    {
      duration: 0.7,
      metadataField: METADATA_RESERVED.tooltip,
      prepOutput: undefined,
    },
    props
  );

  useEffect(() => {
    const tooltipTool = (player) => ({
      key: 'tooltip',
      label: 'tooltip',
      active: true,
      enabled: true,
      handlers: {
        mousedown: () => {
          if (!timeout.current) return;
          clearTimeout(timeout.current);
          setShowTooltip(false);
        },
        hover: async (event) => {
          const hits = event.hitNodes;
          if (!hits.length) return;
          const hierarchy = [...hits[0].hierarchy];
          hierarchy.reverse();

          for (let node of hierarchy) {
            if (node.type === 'Item') {
              const item = player.scene.get({
                id: node.nodeId,
              });
              const tooltip = item.configurator.metadata.find(
                (el) => el.name === metadataField
              );
              if (tooltip?.defaultValue?.length) {
                if (timeout) clearTimeout(timeout.current);
                if (!showTooltip) setShowTooltip(true);
                positonalElRef.current.style.top =
                  event.originalEvent.pageY + 'px';
                positonalElRef.current.style.left =
                  event.originalEvent.pageX + 'px';
                messageElRef.current.innerHTML = prepOutput
                  ? prepOutput(tooltip.defaultValue)
                  : tooltip.defaultValue;
                timeout.current = setTimeout(
                  () => setShowTooltip(false),
                  duration * 1000
                );
                break;
              }
            }
          }
        },
      },
    });
    (() => {
      if (!loaded) return;
      window.threekit.controller.addTool(tooltipTool);
    })();
    // return window.threekit.controller.removeTool(tooltip());
  }, [loaded]);

  if (!loaded || !showTooltip) return null;

  return (
    <Wrapper ref={positonalElRef}>
      <div>
        <Inner ref={messageElRef} />
        <Arrow />
      </div>
    </Wrapper>
  );
};

export default Tooltip;
