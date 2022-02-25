import { Box, Button, ButtonGroup } from '@chakra-ui/react';
import { SuggestState } from '@remirror/pm/suggest';
import { EditorComponent, useCommands, useHelpers, useRemirrorContext } from '@remirror/react';
import { saveAs } from 'file-saver';
import { doc, collection, Timestamp, updateDoc, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { useNoteContext } from '../../contexts/NoteContext';
import { db } from '../../firebase/clientApp';
import EditorButtons from './EditorButtons';
import HyperlinkToolbar from './HyperlinkToolbar';

const Editor = ({ state }: any) => {
  const { user } = useAuth();
  const { editing } = useNoteContext();
  const { getJSON, getMarkdown } = useHelpers();
  const { setContent } = useRemirrorContext();
  const commands = useCommands();

  const handleSave = () => {
    const content = getJSON(state);

    const title = content.content.filter((node) => node.type === 'heading');
    if (!editing) {
      const newDocRef = doc(collection(db, 'notes'));
      const dbEntry = {
        created_at: Timestamp.fromDate(new Date(Date.now())),
        content,
        title: title[0].content[0].text,
        user: user.uid,
        noteId: newDocRef.id,
      };
      setDoc(newDocRef, dbEntry);
    } else if (editing) {
      console.log(editing);
      const noteRef = doc(db, 'notes', editing);
      const dbUpdate = {
        content,
        title: title[0].content[0].text,
        noteId: editing,
      };
      updateDoc(noteRef, dbUpdate);
    }
  };

  const localSave = () => {
    const inputState = getMarkdown(state);
    console.log(inputState);

    const blob = new Blob([inputState], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'UntitledNote.md');
  };

  useEffect(() => {
    // Enforce Title
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
  }, [state]);

  return (
    <>
      <Box textAlign="center">
        <EditorButtons />
      </Box>
      <EditorComponent />
      <HyperlinkToolbar />
      <Box mt="20px" textAlign="center">
        <Button onClick={handleSave} size="sm" variant="toolbar">
          Save
        </Button>
        &nbsp;
        <Button onClick={localSave} size="sm" variant="toolbar">
          Save Locally
        </Button>
      </Box>
    </>
  );
};

export default Editor;
