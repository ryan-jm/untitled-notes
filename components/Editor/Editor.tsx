import { Box, Button, ButtonGroup } from '@chakra-ui/react';
import { SuggestState } from '@remirror/pm/suggest';
import { EditorComponent, useCommands, useHelpers, useRemirrorContext } from '@remirror/react';
import { saveAs } from 'file-saver';
import { doc, collection, Timestamp, updateDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { useNoteContext } from '../../contexts/NoteContext';
import { db } from '../../firebase/clientApp';
import CreateSessionModal from '../Session/CreateSessionModal';
import EditorButtons from './EditorButtons';
import { TagPopupComponent } from './extensions';
import HyperlinkToolbar from './HyperlinkToolbar';

const Editor = ({ state, setShowModal }: any) => {
  const { user } = useAuth();
  const { editing, checkForTags } = useNoteContext();
  const { getJSON, getMarkdown } = useHelpers();
  const { setContent } = useRemirrorContext();
  const commands = useCommands();

  const handleSave = () => {
    const content = getJSON(state);
    const title = content.content.filter((node) => node.type === 'heading')[0];
    const tags = checkForTags(state.doc, true);

    if (!editing) {
      const newDocRef = doc(collection(db, 'notes'));
      const dbEntry = {
        created_at: Timestamp.fromDate(new Date(Date.now())),
        content,
        title: title.content[0].text,
        user: user.uid,
        noteId: newDocRef.id,
        tags,
      };
      setDoc(newDocRef, dbEntry);
    } else if (editing) {
      const noteRef = doc(db, 'notes', editing);
      const dbUpdate = {
        content,
        title: title.content[0].text,
        noteId: editing,
        tags,
      };
      updateDoc(noteRef, dbUpdate);
    }
  };

  const localSave = () => {
    const inputState = getMarkdown(state);
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
        <EditorButtons setShowModal={setShowModal} />
      </Box>
      <EditorComponent />
      <TagPopupComponent />
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
