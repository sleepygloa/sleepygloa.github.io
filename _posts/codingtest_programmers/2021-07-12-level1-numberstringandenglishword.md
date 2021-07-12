---
title: 카카오_숫자 문자열과 영단어
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

## 📝 문제
네오와 프로도가 숫자놀이를 하고 있습니다. 네오가 프로도에게 숫자를 건넬 때 일부 자릿수를 영단어로 바꾼 카드를 건네주면 프로도는 원래 숫자를 찾는 게임입니다.

숫자의 일부 자릿수가 영단어로 바뀌어졌거나, 혹은 바뀌지 않고 그대로인 문자열 s가 매개변수로 주어집니다. s가 의미하는 원래 숫자를 return 하도록 solution 함수를 완성해주세요.

- 1 ≤ s의 길이 ≤ 50
- s가 "zero" 또는 "0"으로 시작하는 경우는 주어지지 않습니다.
- return 값이 1 이상 2,000,000,000 이하의 정수가 되는 올바른 입력만 s로 주어집니다.

입출력 예시

|s|result|
|---|---|
|"one4seveneight"|1478|
|"23four5six7"|234567|
|"2three45sixseven"|234567|
|"123"|123|

## 🏆 1차 시도 - 성공

```java
class Solution {
    public int solution(String s) {
        return Integer.parseInt(convertword(s));
    }
    
    public static String convertword(String w){
        if(w.indexOf("zero") > -1) w = w.replaceAll("zero", "0");
        if(w.indexOf("one") > -1) w = w.replaceAll("one", "1");
        if(w.indexOf("two") > -1) w = w.replaceAll("two", "2");
        if(w.indexOf("three") > -1) w = w.replaceAll("three", "3");
        if(w.indexOf("four") > -1) w = w.replaceAll("four", "4");
        if(w.indexOf("five") > -1) w = w.replaceAll("five", "5");
        if(w.indexOf("six") > -1) w = w.replaceAll("six", "6");
        if(w.indexOf("seven") > -1) w = w.replaceAll("seven", "7");
        if(w.indexOf("eight") > -1) w = w.replaceAll("eight", "8");
        if(w.indexOf("nine") > -1) w = w.replaceAll("nine", "9");
        return w;
    }
}
```

### 생각

- 변환하는 문자를 각각의 IF 로 작성하여 모두 치환하게 하였다.

## 📊 첨삭

like 가 많고, 요구사항과 코딩이 가시적으로 한번에 구분되는 코드.

```java
class Solution {
    public int solution(String s) {
        String[] strArr = {"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};
        for(int i = 0; i < strArr.length; i++) {
            s = s.replaceAll(strArr[i], Integer.toString(i));
        }
        return Integer.parseInt(s);
    }
}
```

### 검토
- 배열의 자리수가 요구하는 숫자와 일치하는 점을 이용하여 숫자를 변수로 이용하지 않고 한번에 처리했다.