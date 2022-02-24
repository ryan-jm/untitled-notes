import { MentionAtomNodeAttributes, MentionAtomPopupComponent, MentionAtomState } from '@remirror/react';
import { FC, useEffect, useMemo, useState } from 'react';
import { LinkExtension, MentionAtomExtension } from 'remirror/extensions';

import { useEditorContext } from '../../../contexts/EditorContext';

interface ITagExtensionComponentProps<UserData extends MentionAtomNodeAttributes = MentionAtomNodeAttributes> {
  users?: UserData[];
  tags?: string[];
}

export const HyperlinkExtension = () => {
  const extension = new LinkExtension({ autoLink: true, defaultTarget: '_blank' });
  extension.addHandler('onClick', (_, data) => {
    window.open(data.href);
    return true;
  });
  return extension;
};

export const TagExtension = () => {
  const extension = new MentionAtomExtension({
    matchers: [
      { name: 'at', char: '@', appendText: ' ' },
      { name: 'tag', char: '#', appendText: ' ' },
    ],
  });

  const handleNewTag = (event, createTag) => {
    if (event.exitReason === 'move-end') {
      createTag({ id: `tag-${event.query.full}`, label: event.text.full });
    }
  };

  extension.addHandler('onChange', handleNewTag);
  return extension;
};

export const TagPopupComponent = ({ users }: ITagExtensionComponentProps) => {
  const { tags } = useEditorContext();
  const [state, setState] = useState<MentionAtomState | null>();

  useEffect(() => {
    console.log(state);
  }, [state]);
  const tagItems = useMemo(() => (tags ?? []).map((tag) => ({ id: tag, label: `#${tag}` })), [tags]);
  const items = useMemo(() => {
    if (!state) {
      return [];
    }

    const allItems = state.name === 'at' ? users : tagItems;

    if (!allItems) {
      return [];
    }

    const query = state.query.full.toLowerCase() ?? '';
    return allItems.filter((item) => item.label.toLowerCase().includes(query)).sort();
  }, [state, users, tagItems]);

  return <MentionAtomPopupComponent onChange={setState} items={items} />;
};

export default null;
