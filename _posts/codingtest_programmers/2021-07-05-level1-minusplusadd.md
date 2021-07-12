---
title: 음양 더하기
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

[![문제](/assets/imgs/codetest/8.minusplusadd/1-1.question.png)](/assets/imgs/imgs/codetest/8.minusplusadd/1-1.question.png)
[![문제](/assets/imgs/codetest/8.minusplusadd/1-2.question.png)](/assets/imgs/imgs/codetest/8.minusplusadd/1-2.question.png)

## 1차 시도

```java
class Solution {
    public int solution(int[] absolutes, boolean[] signs) {
        int answer = 123456789;
        
        int before = 0;
        for(int i = 0; i < signs.length; i++){
            if(signs[i]){
                before += absolutes[i];
            }else{
                before -= absolutes[i];
            }
        }
        answer = before;
        return answer;
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/8.minusplusadd/2-1-1.success.png)](/assets/imgs/imgs/codetest/8.minusplusadd/2-1-1.success.png)

### 제출결과

[![결과](/assets/imgs/codetest/8.minusplusadd/2-1-2.fail.png)](/assets/imgs/imgs/codetest/8.minusplusadd/2-1-2.fail.png)

### 생각

- 엄~~~청 간단한 문제였다.

## 첨삭

like 가 많고, 요구사항과 코딩이 가시적으로 한번에 구분되는 코드.

```java
class Solution {
    public int solution(int[] absolutes, boolean[] signs) {
        int answer = 0;
        for (int i=0; i<signs.length; i++)
            answer += absolutes[i] * (signs[i]? 1: -1);
        return answer;
    }
}
```


### 검토
- ```-1```, ```+1``` 의 경우를 삼항연산자를 이용하여 처리함.


### 생각

- 내용 무.