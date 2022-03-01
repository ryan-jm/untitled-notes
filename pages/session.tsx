import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

const Session = (props) => {
  return <p>Hello</p>;
};

export async function getServerSideProps({ req, res }) {
  if (!res.socket.server.yjs) {
    console.log('No YJS socket found, initialising one.');
  }

  return { props: {} };
}

export default Session;
