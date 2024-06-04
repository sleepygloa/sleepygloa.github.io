import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

const themeObj = {
  bgColor: '#FFFFFF', //바탕 배경색
  pageBgColor: '#FFFFFF', //페이지 배경색
  postcodeTextColor: '#C05850', //우편번호 글자색
  emphTextColor: '#222222', //강조 글자색
};

export default function DaumPostcodeCommon(props){
  return (
    <div>
      <DaumPostcode
        theme={themeObj}
        onComplete={props.onComplete}
        onClose={props.onClose}
      />
    </div>
  );
};
