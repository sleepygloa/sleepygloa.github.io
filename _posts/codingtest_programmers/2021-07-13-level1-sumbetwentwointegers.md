---
title: 두 정수 사이의 합
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

## 📝 문제
두 정수 a, b가 주어졌을 때 a와 b 사이에 속한 모든 정수의 합을 리턴하는 함수, solution을 완성하세요.
예를 들어 a = 3, b = 5인 경우, 3 + 4 + 5 = 12이므로 12를 리턴합니다.

- a와 b가 같은 경우는 둘 중 아무 수나 리턴하세요.
- a와 b는 -10,000,000 이상 10,000,000 이하인 정수입니다.
- a와 b의 대소관계는 정해져있지 않습니다.

입출력 예시

|a|b|result|
|---|---|---|
|3|5|12|
|3|3|3|
|5|3|12|

## 🏆 1차 시도 - 성공

```java
class Solution {
    public long solution(int a, int b) {
        long answer = 0;
        
        //치환(a <= b 로)
        if(a > b) {
            int c = a; a = b; b = c;
        }
        
        //계산
        for(int i = a; i <= b; i++){
            answer += i;
        }
        
        return answer;
    }
}
```

### 생각

- a 를 낮은수, b를 높은 수라 생각하고, a > b  수가 입력 되었을때, 바꾸는 로직과 계산로직을 작성했다.
- 

## 📊 첨삭

like 가 많고, 요구사항과 코딩이 가시적으로 한번에 구분되는 코드.

```java
class Solution {

    public long solution(int a, int b) {
        return sumAtoB(Math.min(a, b), Math.max(b, a));
    }

    private long sumAtoB(long a, long b) {
        return (b - a + 1) * (a + b) / 2;
    }
}
```

### 검토
- 등차수열 공식
- ```(b - a + 1)``` : 개수, ```(a + b) / 2``` 중간값
- 수2 배운사람 어디계신가요. 아네 저군요