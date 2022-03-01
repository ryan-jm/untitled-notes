/* eslint-disable import/no-anonymous-default-export */
import { MentionAtomNodeAttributes, MentionAtomPopupComponent, MentionAtomState } from '@remirror/react';
import { useEffect, useMemo, useState } from 'react';
import { LinkExtension, MentionAtomExtension } from 'remirror/extensions';

import { useNoteContext } from '@/contexts/NoteContext';

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
  const { updateTags, currentNote } = useNoteContext();
  const extension = new MentionAtomExtension({
    matchers: [
      { name: 'at', char: '@', appendText: ' ' },
      { name: 'tag', char: '#', appendText: ' ' },
    ],
  });

  const handleNewTag = (event, createTag) => {
    if (event.exitReason === 'move-end') {
      createTag({ id: `tag-${event.query.full}`, label: event.text.full });
      updateTags([{ id: `tag-${event.query.full}`, label: event.text.full, noteRef: currentNote?.noteId }], 'add');
    }

    // if (event.exitReason === 'invalid-exit-split') {

    // }
  };

  extension.addHandler('onChange', handleNewTag);
  return extension;
};

export const TagPopupComponent = ({ users }: ITagExtensionComponentProps) => {
  const { tags } = useNoteContext();
  const [state, setState] = useState<MentionAtomState | null>();

  const tagItems = useMemo(() => {
    const ids = (tags ?? []).map((tag) => tag.id);
    const uniqueTags = (tags ?? []).filter((tag, index) => !ids.includes(tag.id, index + 1));
    return uniqueTags.map((tag) => ({ id: `${tag.id}`, label: `${tag.label}` }));
  }, [tags]);

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
