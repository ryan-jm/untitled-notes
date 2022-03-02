import { Box, Button, ButtonGroup } from '@chakra-ui/react';
import { SuggestState } from '@remirror/pm/suggest';
import { EditorComponent, useCommands, useHelpers, useRemirrorContext } from '@remirror/react';
import { saveAs } from 'file-saver';
import { doc, collection, Timestamp, updateDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { useNoteContext } from '@/contexts/NoteContext';
import EditorButtons from '@/components/Editor/EditorButtons';
import { TagPopupComponent } from '@/components/Editor/extensions';
import HyperlinkToolbar from '@/components/Editor/HyperlinkToolbar';
import { db } from '../../firebase/clientApp';

const SessionEditor = ({ state, owner, id, forceLoad }: any) => {
  const { checkForTags } = useNoteContext();
  const { getJSON } = useHelpers();
  const { setContent } = useRemirrorContext();
  const commands = useCommands();
  const [isOwner, setIsOwner] = useState(owner);

  const handleSave = () => {
    const content = getJSON(state);
    const title = content.content.filter((node) => node.type === 'heading')[0];
    const tags = checkForTags(state.doc, true);

    const noteRef = doc(db, 'notes', id);
    const dbUpdate = {
      content,
      title: title.content[0].text,
      noteId: id,
      tags,
    };
    updateDoc(noteRef, dbUpdate);
  };

  useEffect(() => {
    // Enforce Title
    if (!isOwner) return;
    let checkState = state;
    const firstNode = checkState?.doc?.content?.content[0];
    const titleEmpty = checkState?.doc?.content?.content.length > 1 && firstNode?.content?.size === 0;
    if (firstNode?.type.name !== 'heading') {
      /* If no H1 is found at the first node, replace the first node with a H1 node */
      commands.toggleHeading({ level: 1 });
    }

    if (titleEmpty) {
      /* H1 is present on first node but has no text; will clone state schema and apply a default 'Untitled' title */
      console.log(titleEmpty);
      checkState = state.applyTransaction(state.tr.insertText('Untitled...', 0, 1)).state;
      const nodeSchema = getJSON(checkState);
      nodeSchema.content[0].type = 'heading';
      setContent(nodeSchema);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, isOwner]);

  return (
    <>
      <Box textAlign="center">
        <EditorButtons session={true} />
      </Box>
      <EditorComponent />
      <TagPopupComponent />
      <HyperlinkToolbar />
      <Box mt="20px" textAlign="center">
        {isOwner ? (
          <Button onClick={handleSave} size="sm" variant="toolbar">
            Save
          </Button>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default SessionEditor;
