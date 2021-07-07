---
title: 카카오 인형뽑기 게임
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

[![문제](/assets/imgs/codetest/9.cranedollgarchargame/1-1.question.png)](/assets/imgs/imgs/codetest/9.cranedollgarchargame/1-1.question.png)
[![문제](/assets/imgs/codetest/9.cranedollgarchargame/1-2.question.png)](/assets/imgs/imgs/codetest/9.cranedollgarchargame/1-2.question.png)
[![문제](/assets/imgs/codetest/9.cranedollgarchargame/1-3.question.png)](/assets/imgs/imgs/codetest/9.cranedollgarchargame/1-3.question.png)
[![문제](/assets/imgs/codetest/9.cranedollgarchargame/1-4.question.png)](/assets/imgs/imgs/codetest/9.cranedollgarchargame/1-4.question.png)
[![문제](/assets/imgs/codetest/9.cranedollgarchargame/1-5.question.png)](/assets/imgs/imgs/codetest/9.cranedollgarchargame/1-5.question.png)


## 1차 시도

```java
import java.util.ArrayList;

class Solution {
    ArrayList<Integer> result = new ArrayList<Integer>();
    public int solution(int[][] board, int[] moves) {
        int answer = 0;
        //기계작동 횟수
        for(int i = 0; i < moves.length; i++){
            
            int X = moves[i]-1; //Y 위치 값.
            int Y = -1;
            
            for(int j = 0; j < board[X].length; j++){
                if(board[j][X] != 0){
                    Y = j; //높이
                    break;
                }
            }
            
            if(Y < 0) continue;
            
            int moveData = board[Y][X];
            
            result.add(moveData); //넣기
            answer++;
            board[Y][X] = 0; //빼기
            confirm();
        }
        
        answer = answer - result.size();
        return answer;
    }

    
    //확인
    public void confirm(){
        for (int i = 1; i < result.size(); i++){
            if(result.get(i-1) == result.get(i)){
                result.remove(i);
                result.remove(i-1);
                i = 0;
                continue;
            }
        }

    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/9.cranedollgarchargame/2-1-1.success.png)](/assets/imgs/imgs/codetest/9.cranedollgarchargame/2-1-1.success.png)

### 제출결과

[![결과](/assets/imgs/codetest/9.cranedollgarchargame/2-1-2.fail.png)](/assets/imgs/imgs/codetest/9.cranedollgarchargame/2-1-2.fail.png)

### 생각

- 문제를 잘못읽어서 결과값을 반대로 가져왔다. 엄청 오래걸려서 카카오는 못가는구나 싶었다.

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

[![결과](/assets/imgs/codetest/9.cranedollgarchargame/3.othersuccess.png)](/assets/imgs/codetest/9.cranedollgarchargame/3.othersuccess.png)


### 검토
- stack 을 이용한 처리


### 생각

- stack 을 이용한 처리를 해본적이없어서 조금 오래 보았다.
- 편한 List 만 쓸것이아니라 이런 형식의 알고리즘? 에서는 stack 을 써봐야겠다.
- 결과치대체로 스택을 이용한 문구가 빨랐다.