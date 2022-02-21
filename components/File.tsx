import { storage } from "../firebase/clientApp";

// import { useState } from "react";

import { useState } from "react";


import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { log } from "console";

// const File = () =>{
// // Create a root reference
// const storage = getStorage();

// // Create a reference to 'mountains.jpg'
// const mountainsRef = ref(storage, 'pi.jpg');

// // Create a reference to 'images/mountains.jpg'
// const mountainImagesRef = ref(storage, 'images/pi.jpg');


// //State
// const [file , setFile] = useState(null);
// // While the file names are the same, the references point to different files
// mountainsRef.name === mountainImagesRef.name;           // true
// mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 


// const storageRef = ref(storage, 'some-child');

// // 'file' comes from the Blob or File API
// uploadBytes(storageRef, file).then((snapshot) => {
//   console.log('Uploaded a blob or file!');
// });

   
//     function changeHandler(event){
//     setFile(event.target.files[0]);
        
//     }
//     function submitHandler(){
//     //      const uploadTask = storage.ref(`images/${image.name}`)
//     //    .put(image);

        
//     }
//     // console.log(image,"immmmmmmmm");
    
//     return(
//         <>
//             <input type="file" onChange={changeHandler}></input> 
//         <button onClick={submitHandler}>submit</button> 
//         </>
//     )
// }

// export default File;

const File = () =>{
    // const [file , setFile] = useState(null);
    const [progress , setProgress] = useState(0);

    function submitHandler(event){
        event.preventDefault();
        const file = (event.target[0].files[0])
        changeHandler(file);
    }

// console.log(file);

    function changeHandler(file){
        if(!file) return ;
        const storageRef = ref(storage,`/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef,file);
        uploadTask.on("state_changed",(snapshot)=>{
            const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
         );
         setProgress(prog);
        },(err)=> console.log(err,"here is the err"),
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref)
            .then(url => console.log(url,"<><><><><><<<<<<<<<<<dhjdhjdhdhhnd")
            )
        }
        )

    }
    return(
        <>
        <form onSubmit={submitHandler}>
            <input type="file" />
            <button type="submit">Submit</button>
            
        </form>
        </>
    )
}

export default File;