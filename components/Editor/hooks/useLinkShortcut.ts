import { useExtension } from '@remirror/react';
import { useState } from 'react';
import { LinkExtension, ShortcutHandlerProps } from 'remirror/extensions';

const useLinkShortcut = () => {
  const [shortcut, setShortcut] = useState<ShortcutHandlerProps | undefined>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useExtension(
    LinkExtension,
    ({ addHandler }) =>
      addHandler('onShortcut', (props) => {
        if (!isEditing) {
          setIsEditing(true);
        }

        return setShortcut(props);
      }),
    [isEditing]
  );

  return { shortcut, isEditing, setIsEditing };
};

export default useLinkShortcut;
