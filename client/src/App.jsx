import { useState } from 'react'
import axios, { Axios } from "axios"

function App() {
 const [file,setFile]=useState(0);
 const [fileContent,setFileContent]=useState("");

  // Function to handle file upload
 const uploadFile=()=>{
  const filedata = new FormData();
  filedata.append("file",file)
  axios.post("http://localhost:3000/upload", filedata)
      .then((response) => {
        console.log("Successfully uploaded file");
        setFileContent(response.data); // Set the file content from the server response
      })
      .catch((e) => {
        console.log("Error while uploading file data", e);
      });
  };

  return (
    <>
<input type='file' onChange={(e)=>setFile(e.target.files[0])}/>
<button onClick={uploadFile}>Submit</button>
{fileContent && (
        <div>
          <h3>File Content:</h3>
          <pre>{fileContent}</pre>
        </div>
      )}
    </>
  )
}

export default App
