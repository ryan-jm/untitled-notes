import { Input } from '@chakra-ui/react';
import {
  ComponentItem,
  FloatingToolbar,
  FloatingWrapper,
  ToolbarItemUnion,
  useActive,
  useCurrentSelection,
} from '@remirror/react';
import React, { useMemo } from 'react';

import useFloatingLinkState from './hooks/useFloatingLinkState';

const HyperlinkToolbar = () => {
  const { isEditing, linkPositioner, clickEdit, onRemove, setHref, href, submitHref, cancelHref } =
    useFloatingLinkState();
  const active = useActive();
  const activeLink = active.link();
  const { empty } = useCurrentSelection();

  const toolbarItems: ToolbarItemUnion[] = useMemo(
    () => [
      {
        type: ComponentItem.ToolbarGroup,
        label: 'Link',
        items: activeLink
          ? [
              { type: ComponentItem.ToolbarButton, onClick: () => clickEdit(), icon: 'pencilLine' },
              { type: ComponentItem.ToolbarButton, onClick: onRemove, icon: 'linkUnlink' },
            ]
          : [{ type: ComponentItem.ToolbarButton, onClick: () => clickEdit(), icon: 'link' }],
      },
    ],
    [clickEdit, onRemove, activeLink]
  );

  const items: ToolbarItemUnion[] = useMemo(() => toolbarItems, [toolbarItems]);

  return (
    <>
      <FloatingToolbar positioner="selection" placement="top" enabled={!isEditing} items={items} />
      <FloatingToolbar
        items={toolbarItems}
        positioner={linkPositioner}
        placement="bottom"
        enabled={!isEditing && empty}
      />
      <FloatingWrapper positioner="always" placement="bottom" enabled={isEditing} renderOutsideEditor>
        <Input
          sx={{ zIndex: 20, backgroundColor: 'white' }}
          autoFocus
          placeholder="Enter link..."
          onChange={(event) => setHref(event.target.value)}
          value={href}
          onKeyPress={(event) => {
            const { code } = event;

            if (code === 'Enter') {
              submitHref();
            }

            if (code === 'Escape') {
              cancelHref();
            }
          }}
        />
      </FloatingWrapper>
    </>
  );
};

export default HyperlinkToolbar;
