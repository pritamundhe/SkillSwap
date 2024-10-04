import axios from 'axios'
import React, { useState } from 'react'

export default function ResourcePage() {
    const [file, setFile] = useState()
    const handleUpload = (e) =>{
        const formData = new FormData()
        formData.append('file', file)
        axios.post('http://localhost:5000/resource/up',formData)
        .then(res=>console.log(res))
        .catch(err=> console.log(err))
    }
  return (
    <div>
      <input type='file' onChange={e=> setFile(e.target.files[0])   }/>
      <button type='submit' onClick={handleUpload}>Upload</button>
    </div>
  )
}

