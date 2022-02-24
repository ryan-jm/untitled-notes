import { collection, getDocsFromServer, orderBy, query, where } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';

import { db } from '../firebase/clientApp';
import { useAuth } from './AuthContext';

interface IEditorContext {
  tags: string[];
  updateTags?: (tag: string) => void;
}

const initialState = {
  tags: [],
};

const EditorContext = createContext<IEditorContext>(initialState);

const EditorProvider = ({ toolbar, children }: any) => {
  const [tags, setTags] = useState<string[]>([]);
  const { user } = useAuth();

  const updateTags = (tag: string) => {
    setTags((prev) => [...prev, tag]);
  };

  useEffect(() => {
    if (!tags.length) {
      const userTags = [];
      const userNotes = query(collection(db, 'notes'), where('user', '==', user.uid), orderBy('created_at', 'desc'));
      getDocsFromServer(userNotes).then((data) => {
        data.forEach((doc) => {
          const note = doc.data();
          note.content.content.forEach((node) => {
            if (node.type.name === 'mentionAtom' && node.attrs.name === 'tag') {
              userTags.push(node.attrs.label.slice(1));
            }
          });
        });
        setTags(() => userTags);
      });
    }
  }, [tags, setTags]);

  return (
    <EditorContext.Provider value={{ tags, updateTags }}>
      {toolbar}
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => useContext(EditorContext);

export default EditorProvider;
