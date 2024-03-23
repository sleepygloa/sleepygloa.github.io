import React, { useState } from 'react';
import axios from 'axios';


import {API_URL} from "../../contraints";

export default function StrArrChangeStr(props) {

  const [templateString, setTemplateString] = useState(''); // 첫 번째 입력 문자열
  const [replacementString, setReplacementString] = useState(''); // 두 번째 입력 문자열 (','로 구분된 값)
  const [result, setResult] = useState(''); // 결과 문자열

  const handleReplace = () => {
    const replacements = replacementString.split(','); // 두 번째 입력 문자열을 배열로 변환
    let resultString = templateString; // 치환을 시작할 문자열 복사

    replacements.forEach((replacement) => {
      // '?'를 찾아 배열의 현재 요소로 치환
      resultString = resultString.replace('?', replacement.trim());
    });

    setResult(resultString); // 결과 문자열 상태 업데이트
  };

  return (
    <div>
      <button onClick={handleReplace}>치환 시작</button>
      <p>-. 치환할 문자열 </p>
      <textarea
        placeholder="치환될 문자열 입력..."
        value={templateString}
        onChange={(e) => setTemplateString(e.target.value)}
      />
      <p>-. 변경할 문자배열</p>
      <textarea
        placeholder="'첫번째값, 두번째값, 세번째값' 형식으로 입력"
        value={replacementString}
        onChange={(e) => setReplacementString(e.target.value)}
      />
      <hr />
      <p>결과: {result}</p>
    </div>

  );
}


