---
title: 가운데 글자 가져오기
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

## 📝 문제
- 단어 s의 가운데 글자를 반환하는 함수, solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.
- s는 길이가 1 이상, 100이하인 스트링입니다.

## 🏆 1차 시도 - 성공

```java
class Solution {
    public String solution(String s) {
        String answer = "";
        //짝
        if(s.length() % 2 == 0){
            answer = s.substring(s.length()/2-1, s.length()/2+1);
        //홀
        }else{
            answer = s.substring(s.length()/2, s.length()/2+1);
        }
        return answer;
    }
}
```

### 생각

- 가운데 글자를 구하는데 홀수/짝수 구분이 필요했고, 글자수를 필요한 만큼 잘라 처리했다.

## 📊 첨삭

like 가 많고, 요구사항과 코딩이 가시적으로 한번에 구분되는 코드.

```java
class Solution {
    public String solution(String s) {
        return s.substring((s.length()-1) / 2, s.length()/2 + 1);
    }
}
```

### 검토
- 한 줄로 처리했다. 
- substring 의 first 포함, last 불포함 관계를 이해하고, 홀수 짝수 구하는 수학적 이해로 시작위치를 -1 한다음 /2 함으로 첫번째 위치가 산출되고, 마지막 위치는 /2 먼저하고 + 1 함으로 결과를 뽑았다.
- 이건 외워야한다.