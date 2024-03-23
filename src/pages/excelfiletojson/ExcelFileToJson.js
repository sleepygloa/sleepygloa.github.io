import React, { useState } from 'react';
import axios from 'axios';


import {API_URL} from "../../contraints";

export default function ExcelFileToJson(props) {

  const [file, setFile] = useState(null);
  const [returnJsonData, setReturnJsonData] = useState([]);

  const initData = (e) => {
    setReturnJsonData([]);
    setFile(null);
    
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/api/excelUpload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('서버로부터의 응답:', response.data);
      setReturnJsonData(response.data);
    } catch (error) {
      console.error('업로드 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <div>
        <p>1. Excelfile To Json</p>
        <input  type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        <button onClick={initData}>Init</button>
      </div>
      <div>
        {returnJsonData.length > 0 && (<div>{JSON.stringify(returnJsonData)}</div>)}
      </div>
    </div>

  );
}


