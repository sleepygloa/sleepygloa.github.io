---
title: 나누어 떨어지는 숫자 배열
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

## 📝 문제
array의 각 element 중 divisor로 나누어 떨어지는 값을 오름차순으로 정렬한 배열을 반환하는 함수, solution을 작성해주세요.
divisor로 나누어 떨어지는 element가 하나도 없다면 배열에 -1을 담아 반환하세요.

- arr은 자연수를 담은 배열입니다.
- 정수 i, j에 대해 i ≠ j 이면 arr[i] ≠ arr[j] 입니다.
- divisor는 자연수입니다.
- array는 길이 1 이상인 배열입니다.

입출력 예시

|arr|divisor|result|
|---|---|---|
|[5,9,7,10]|5|[5,10]|
|[2,36,1,3]|1|[1,2,3,36]|
|[3,2,6]|10|[-1]|

## 🏆 1차 시도 - 성공

```java
import java.util.Arrays;

class Solution {
    public int[] solution(int[] arr, int divisor) {
        int[] answer = {};
        
        //배열크기 세팅
        int cnt = 0;
        for(int a : arr){
            if(a % divisor == 0) {
                cnt++;
            }
        }
        answer = new int[cnt];
        
        //나누어지는 수 확인
        cnt = 0;
        for(int a : arr){
            if(a % divisor == 0) {
                answer[cnt] = a;
                cnt++;
            }
        }
            
        //판단
        if(answer.length > 0) {
            Arrays.sort(answer);
        }else{
            answer = new int[1];
            answer[0] = -1;
        }
        
        
        return answer;
    }
}
```

### 생각

- 어렵지 않게 해결했다.
- int[] 에 대한 처리를 할 때 배열의 크기를 지정하고, 결과를 쌓고, 답의 판단을 하는 3구문으로 나누었는데, 좀 더 줄일 수 있는 방안을 찾고싶다. 1,2 문장

## 📊 첨삭

like 가 많고, 요구사항과 코딩이 가시적으로 한번에 구분되는 코드.

```java
import java.util.Arrays;

class Divisible {
    public int[] divisible(int[] array, int divisor) {
        //ret에 array에 포함된 정수중, divisor로 나누어 떨어지는 숫자를 순서대로 넣으세요.
        return Arrays.stream(array).filter(factor -> factor % divisor == 0).toArray();
    }
    // 아래는 테스트로 출력해 보기 위한 코드입니다.
    public static void main(String[] args) {
        Divisible div = new Divisible();
        int[] array = {5, 9, 7, 10};
        System.out.println( Arrays.toString( div.divisible(array, 5) ));
    }
}
```

### 검토
- 람다식(공부해야함)
- 