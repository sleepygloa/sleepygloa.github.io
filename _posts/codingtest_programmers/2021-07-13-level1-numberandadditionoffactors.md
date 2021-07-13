---
title: 약수의 개수와 덧셈
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

## 📝 문제
두 정수 left와 right가 매개변수로 주어집니다. left부터 right까지의 모든 수들 중에서, 약수의 개수가 짝수인 수는 더하고, 약수의 개수가 홀수인 수는 뺀 수를 return 하도록 solution 함수를 완성해주세요.

- 1 ≤ left ≤ right ≤ 1,000

입출력 예시

|left|right|result|
|---|---|---|
|13|17|43|
|24|27|52|

## 🏆 1차 시도 - 성공

```java
class Solution {
    public int solution(int left, int right) {
        int answer = 0;
        
        //각 수의 중간까지 loop를 돌며 약수의 개수를 체크
        for(int i = left; i <= right; i++){
            int j = 1;
            
            //약수개수 확인
            int num = 0;
            while(j <= i){
                if(i % j == 0) num++;
                j++;
                
            }
            
            //판단
            if(num % 2 == 0){
                answer += i;
            }else{
                answer -= i;
            }
            
            //초기화
            j = 1;
        }
        
        return answer;
    }
}
```

### 생각

- 처음부터 꼼꼼히 체크했다.
- left와 right 까지의 loop 와 함축적이지 않게 체크할 수 j 를 left,right을 담은 i만큼 증가시키면서 약수를 체크했다.

## 📊 첨삭

내용무. 비슷하다.