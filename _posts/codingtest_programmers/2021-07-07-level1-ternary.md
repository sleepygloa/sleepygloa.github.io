---
title: 3진법
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

[![문제](/assets/imgs/codetest/12.ternary/1-1.question.png)](/assets/imgs/imgs/codetest/12.ternary/1-1.question.png)

## 1차 시도

```java
import java.util.*;
class Solution {
    public int solution(int n) {
        int answer = 0;
        
        //입력값 3진법 변환
        int mok = 0;
        int re = 0;
        
        
        //역순 만들기
        int[] answerarr = new int[stack.size()];
        int cnt = 0;
        while(stack.size() > 0){
            int num = stack.pop();
            answerarr[cnt] = num;
            cnt++;
        }
        
        //10진수 변환
        for(int i = answerarr.length-1; i >= 0; i--){
            answer += answerarr[i] * (Math.pow(3, i));
        }
        
        return answer;
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/12.ternary/2-1-1.success.png)](/assets/imgs/imgs/codetest/12.ternary/2-1-1.success.png)

### 제출결과

[![결과](/assets/imgs/codetest/12.ternary/2-1-2.fail.png)](/assets/imgs/imgs/codetest/12.ternary/2-1-2.fail.png)

### 생각

- 와 잘짰다. 내가 생각해도 stack도 쓰고, 깔끔한거같다. 싶었다. 통과인줄알았다. 1,2 실패


## 2차 시도

성공했으면 좋았을텐데, 에러가나니, 핸들링이 안되기 시작
List 로 다시변경하였다. 테스트케이스를 증가시켜 테스트를하였다.
사실 오늘 퇴사와 프리랜서얘기가 오고가며 정신이 사나워 더이상 코딩이 안되었다..

다시시도.
코드를 갈아엎었다.
문제 유도방법대로 명시적인 코드를 작성했었으나
역순뒤집기를 그냥 빼버리고, 간단한 코드로 바꿔버렸다.


```java
import java.util.*;
class Solution {
    public int solution(int n) {
        int answer = 0;
        
        //입력값 3진법 변환
        int re = 0;
        String str = "";
        while(n != 0){
            re = n % 3 ;
            str += re;
            n /= 3;
        }

        //10진수 변환
        String[] arr = str.split("");
        
        //결과
        if(!str.equals("") && arr.length < 2) {
            answer = Integer.parseInt(str);
            return answer;
        }
        
        int num = 0;
        for(int i = arr.length-1; i >= 0; i--){
            if(arr[i].equals("")) continue;
            answer += Integer.parseInt(arr[i]) * (Math.pow(3, num));
            num++;
        }
        
        return answer;
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/12.ternary/2-1-1.success.png)](/assets/imgs/imgs/codetest/12.ternary/2-1-1.success.png)

### 제출결과

[![결과](/assets/imgs/codetest/12.ternary/2-1-2.fail.png)](/assets/imgs/imgs/codetest/12.ternary/2-1-2.fail.png)

### 생각

- 테스트케이스를 0~10 까지늘려 테스트를 했었는데, 1과 2의 테스트 케이스 기대값을 잘못넣어 헤딩 했다.


## 첨삭

like 가 많고, 요구사항과 코딩이 가시적으로 한번에 구분되는 코드.

```java
class Solution {
    public int solution(int n) {
        String a = "";

        while(n > 0){
            a = (n % 3) + a;
            n /= 3;
        }
        a = new StringBuilder(a).reverse().toString();


        return Integer.parseInt(a,3);
    }
}
```

[![결과](/assets/imgs/codetest/12.ternary/3.othersuccess.png)](/assets/imgs/codetest/12.ternary/3.othersuccess.png)


### 검토
- Integer.parseInt 를 잘 알고 있는지. 간단한 reverse 함수를 쓸 수 있는지.


### 생각
- Integer.parseInt 를 많이 쓰긴하지만. int 형으로 변환한다는 생각만 있었지, 10진법 수로 변환한다는 내부적인 코드를 보진 않았었다. ```parseInt(String s, int radix)``` radix 라는 변수를 받아서 해당 진수로 변환까지 해준다.