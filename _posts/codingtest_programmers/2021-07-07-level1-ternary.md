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
        Stack<Integer> stack = new Stack<Integer>();
        while(3 <= n){
            mok = Math.round(n / 3);
            re = n % 3 ;
            n = mok;
            stack.push(re);
        }
        stack.push(mok);
        
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


```java
import java.util.*;
class Solution {
    public int solution(int n) {
        int answer = 0;
        
        //입력값 3진법 변환
        int mok = 0;
        int re = 0;
        Stack<Integer> stack = new Stack<Integer>();
        while(3 <= n){
            mok = Math.round(n / 3);
            re = n % 3 ;
            n = mok;
            stack.push(re);
        }
        stack.push(mok);
        
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


## 첨삭

like 가 많고, 요구사항과 코딩이 가시적으로 한번에 구분되는 코드.

```java
import java.util.Stack;

class Solution {
    public int solution(int[][] board, int[] moves) {
        int answer = 0;
        Stack<Integer> stack = new Stack<>();
        for (int move : moves) {
            for (int j = 0; j < board.length; j++) {
                if (board[j][move - 1] != 0) {
                    if (stack.isEmpty()) {
                        stack.push(board[j][move - 1]);
                        board[j][move - 1] = 0;
                        break;
                    }
                    if (board[j][move - 1] == stack.peek()) {
                        stack.pop();
                        answer += 2;
                    } else
                        stack.push(board[j][move - 1]);
                    board[j][move - 1] = 0;
                    break;
                }
            }
        }
        return answer;
    }
}
```

[![결과](/assets/imgs/codetest/12.ternary/3.othersuccess.png)](/assets/imgs/codetest/12.ternary/3.othersuccess.png)


### 검토
- stack 을 이용한 처리


### 생각

- stack 을 이용한 처리를 해본적이없어서 조금 오래 보았다.
- 편한 List 만 쓸것이아니라 이런 형식의 알고리즘? 에서는 stack 을 써봐야겠다.
- 결과치대체로 스택을 이용한 문구가 빨랐다.