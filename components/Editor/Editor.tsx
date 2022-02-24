import { Button, ButtonGroup } from '@chakra-ui/react';
import { EditorComponent, useCommands, useHelpers, useRemirrorContext } from '@remirror/react';
import { saveAs } from 'file-saver';
import { addDoc, collection, getDocsFromServer, limit, orderBy, query, Timestamp, where } from 'firebase/firestore';
import React, { useEffect } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import EditorProvider from '../../contexts/EditorContext';
import { db } from '../../firebase/clientApp';
import EditorButtons from './EditorButtons';
import { TagPopupComponent } from './extensions';
import HyperlinkToolbar from './HyperlinkToolbar';

// FileSaver.js library
const Editor = ({ state, manager }: any) => {
  const { user } = useAuth();
  const { getJSON, getMarkdown } = useHelpers();
  const { setContent } = useRemirrorContext();
  const commands = useCommands();

  useEffect(() => {
    console.log(state);
  }, [state]);

  const handleSave = () => {
    const collectionRef = collection(db, 'notes');
    const content = getJSON(state);
    const title = content.content[0].text;
    const dbEntry = {
      created_at: Timestamp.fromDate(new Date(Date.now())),
      title,
      content,
      user: user.uid,
    };
    addDoc(collectionRef, dbEntry);
  };

  const loadNote = async () => {
    // Currently loads the most recent note, but queries will remain useful for loading a list of all user-added notes.
    const totalNotes = [];
    const loadQuery = query(collection(db, 'notes'), where('user', '==', user.uid));
    const noteSnapshot = await getDocsFromServer(loadQuery);

    // queries the db for the last created note, based on created_at timestamp.
    const lastNoteQuery = query(
      collection(db, 'notes'),
      where('user', '==', user.uid),
      orderBy('created_at', 'desc'),
      limit(1)
    );
    const getLastNote = await getDocsFromServer(lastNoteQuery);
    const lastNote = getLastNote.docs[0].data();

    noteSnapshot.forEach((doc) => totalNotes.unshift(doc.data()));
    const doc = {
      type: 'doc',
      content: lastNote.content.content,
    };

    manager.view.updateState(manager.createState({ content: doc }));
  };

  const localSave = () => {
    const inputState = getMarkdown(state);
    console.log(inputState);

    const blob = new Blob([inputState], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'UntitledNote.md');
  };

  const enforceTitle = (state) => {
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
  };

  useEffect(() => {
    enforceTitle(state);
  }, [state, enforceTitle]);

  return (
    <EditorProvider toolbar={<EditorButtons />}>
      <EditorComponent />
      <HyperlinkToolbar />
      <TagPopupComponent />
      <ButtonGroup isAttached size="sm">
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={localSave}>Save Locally</Button>
        <Button onClick={loadNote}>Load Last Saved Note</Button>
      </ButtonGroup>
    </EditorProvider>
  );
};

export default Editor;
