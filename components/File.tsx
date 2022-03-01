// import { useState } from "react";

import { useState } from 'react';

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase/clientApp';

const File = () => {
  // const [file , setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  function submitHandler(event) {
    event.preventDefault();
    const file = event.target[0].files[0];
    changeHandler(file);
  }

  function changeHandler(file) {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
      },

      (err) => console.log(err, 'here is the err'),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
        console.log(progress);
      }
    );
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="file" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default File;
