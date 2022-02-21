import { DownloadIcon } from '@chakra-ui/icons';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { storageRef, storage } from '../firebase/clientApp';

export default function Dashboard() {
  function download() {
    getDownloadURL(storageRef)
      .then((url) => {
        console.log(url);

        // const xhr = new XMLHttpRequest();

        // xhr.responseType = 'blob';
        // xhr.onload = (event) => {
        //   const blob = xhr.response;
        // };
        // xhr.open('GET', url);
        // xhr.send();

        //   // Or inserted into an <img> element
        const img = document.getElementById('image');
        img.setAttribute('src', url);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const name = ref(storage, 'Name');
  const sparkyRef = ref(storage, '');

  return (
    <h1>
      Dash Board
      <br />
      <button id="but" onClick={() => download()}>
        Download
      </button>
      <img src="" id="image" />
      <br />
    </h1>
  );
}
