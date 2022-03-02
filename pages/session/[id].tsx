import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { useCallback, useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import Session from '@/components/Session/Session';
import SessionForm from '@/components/Session/SessionForm';
import { useAuth } from '@/contexts/AuthContext';
import { useNoteContext } from '@/contexts/NoteContext';
import { doc, getDoc } from 'firebase/firestore';

import { useRouter } from 'next/router';
import { db } from '../../firebase/clientApp';

const SessionPage = (props) => {
  const { notes } = useNoteContext();
  const router = useRouter();
  const [provider, setProvider] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [initialContent, setInitialContent] = useState('');
  const [data, setData] = useState(null);

  const [color, setColor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    const checkForSession = async () => {
      const sessionRef = doc(db, 'sessions', props.id);
      const sessionSnap = await getDoc(sessionRef);
      if (sessionSnap.exists) {
        const sessionData = sessionSnap.data();
        setInitialContent(() => sessionData.note.content);
        const isOwner = user.uid === sessionData.owner;
        if (isOwner) {
          setDisplayName(sessionData.owner_display_name);
          setColor(sessionData.owner_color);
        }
        return { isOwner, sessionData };
      } else {
        // Session doesn't exist.
        return Promise.reject();
      }
    };

    if (user && isLoading) {
      checkForSession()
        .then(({ isOwner, sessionData }) => {
          setData(() => sessionData);
          if (isOwner) {
            setOwner(isOwner);
            setIsLoading(false);
          }
        })
        .catch(() => {
          router.push('/');
        });
    }

    if (!provider && !isLoading) {
      const wRtc = new WebrtcProvider(`untitled-notes-session-${props.id}`, new Y.Doc());
      const awareness = wRtc.awareness;
      awareness.setLocalStateField('user', { name: displayName, color: color });
      wRtc.on('chat-message', console.log);
      setProvider(() => wRtc);
    }
  }, [props.id, provider, isLoading, user, displayName, color, notes, router]);

  const handleComplete = useCallback(
    (info) => {
      setDisplayName(info.name);
      setColor(info.color);
      if (info.password === data.password) {
        setIsLoading(false);
      }
    },
    [data]
  );

  return (
    <Box w="100%">
      {provider ? (
        <Session provider={provider} initialContent={initialContent} owner={owner} id={props.id} />
      ) : (
        <SessionForm complete={handleComplete} />
      )}
    </Box>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  return { props: { id } };
}

export default SessionPage;
