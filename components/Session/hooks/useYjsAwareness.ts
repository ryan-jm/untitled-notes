import { useMemo } from 'react';
import { Doc } from 'yjs';
import { Awareness } from 'y-protocols/awareness';

export interface User {
  name: string;
  color: string;
  [x: string]: any;
}

function useYjsAwareness(user: User, doc: Doc): Awareness {
  return useMemo(() => {
    const awareness = new Awareness(doc);
    awareness.setLocalStateField('user', {
      name: user.name,
      color: user.color,
    });
    return awareness;
  }, [user.name, user.color, doc]);
}

export default useYjsAwareness;
