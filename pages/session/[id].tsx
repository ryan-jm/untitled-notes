import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import SessionEditor from '@/components/Session/SessionEditor';

const Session = (props) => {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (!provider) {
      const wRtc = new WebrtcProvider(props.id, new Y.Doc());
      setProvider(() => wRtc);
    }
    console.log(provider);
  }, [props.id, provider]);

  return (
    <Box w="100%" ml="40px" mr="40px">
      {provider ? <SessionEditor provider={provider} /> : <p>Connecting...</p>}
    </Box>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  return { props: { id } };
}

export default Session;
