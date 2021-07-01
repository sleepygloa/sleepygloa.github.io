---
title: 키패드누르기
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

아. 오늘 개발환경 추가한다고 삽질하다가 못 할 뻔했다.

[![문제](/assets/imgs/codetest/3.pushkeypad/1-1.question.png)](/assets/imgs/imgs/codetest/3.pushkeypad/1-1.question.png)
[![문제](/assets/imgs/codetest/3.pushkeypad/1-2.question.png)](/assets/imgs/imgs/codetest/3.pushkeypad/1-2.question.png)
[![문제](/assets/imgs/codetest/3.pushkeypad/1-3.question.png)](/assets/imgs/imgs/codetest/3.pushkeypad/1-3.question.png)
[![문제](/assets/imgs/codetest/3.pushkeypad/1-4.question.png)](/assets/imgs/imgs/codetest/3.pushkeypad/1-4.question.png)


## 1차 시도

```java
class Solution {
    public String solution(int[] numbers, String hand) {
        String answer = "";
        
        int beforeL = -1;
        int beforeR = -1;
        for (int i = 0; i < numbers.length; i++){
            int j = numbers[i];
            System.out.println(beforeL + "/" + beforeR);
            if(j == 1 || j == 4 || j == 7){
                beforeL= j;
                answer += "L";
            }else if(j == 3 || j == 6 || j == 9){
                beforeR= j;
                answer += "R";
            }else{
                if(j == 2){
                    if((beforeL == 1 || beforeL == 5) && (beforeR == 3 || beforeR == 5)){
                        if(hand.equals("left")){
                            beforeL = j;
                            // beforeR = -1;
                            answer += "L";
                        }else{
                            // beforeL = -1;
                            beforeR = j;
                            answer += "R";
                        }
                    }else if(beforeL == 1 || beforeL == 5){
                        beforeL = j;
                        // beforeR = -1;
                        answer += "L";
                    }else{
                        // beforeL = -1;
                        beforeR = j;
                        answer += "R";
                    }
                }else if(j == 5){
                    if((beforeL == 4 || beforeL == 2 || beforeL == 8) 
                    && (beforeR == 6 || beforeR == 2 || beforeR == 8)){
                        if(hand.equals("left")){
                            beforeL = j;
                            // beforeR = -1;
                            answer += "L";
                        }else{
                            // beforeL = -1;
                            beforeR = j;
                            answer += "R";
                        }
                    }else if((beforeL == 4 || beforeL == 2 || beforeL == 8)){
                        beforeL = j;
                        // beforeR = -1;
                        answer += "L";
                    }else{
                        // beforeL = -1;
                        beforeR = j;
                        answer += "R";
                    }
                }else if(j == 8){
                    if((beforeL == 7 || beforeL == 5 || beforeL == 0) 
                    && (beforeR == 9 || beforeR == 5 || beforeR == 0)){
                        if(hand.equals("left")){
                            beforeL = j;
                            // beforeR = -1;
                            answer += "L";
                        }else{
                            // beforeL = -1;
                            beforeR = j;
                            answer += "R";
                        }
                    }else if(beforeL == 7 || beforeL == 5 || beforeL == 0){
                        beforeL = j;
                        // beforeR = -1;
                        answer += "L";
                    }else{
                        // beforeL = -1;
                        beforeR = j;
                        answer += "R";
                    }
                }else if(j == 0){
                    if((beforeL == -1 || beforeL == 8) 
                    && (beforeR == -1 || beforeR == 8)){
                        if(hand.equals("left")){
                            beforeL = j;
                            // beforeR = -1;
                            answer += "L";
                        }else{
                            // beforeL = -1;
                            beforeR = j;
                            answer += "R";
                        }
                    }else if(beforeL == -1 || beforeL == 8){
                        beforeL = j;
                        // beforeR = -1;
                        answer += "L";
                    }else{
                        // beforeL = -1;
                        beforeR = j;
                        answer += "R";
                    }
                }
            }
        }
        return answer;
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/3.pushkeypad/2-1-1.success.png)](/assets/imgs/imgs/codetest/3.pushkeypad/2-1-1.success.png)

### 제출결과

[![결과](/assets/imgs/codetest/3.pushkeypad/2-1-2.fail.png)](/assets/imgs/imgs/codetest/3.pushkeypad/2-1-2.fail.png)

### 생각

- 우선 대충.. 생각나는 대로 했는데
- 중첩 IF 문으로 왼손 오른손 기본케이스를 정하고, 가운데 누를때의 상하좌우로 가까운 손가락 케이스를 잡았는데 결과를 보고 다시 문제를 분석해보니 1,3번은 그경우에 속하지만 2번문제의 경우는 다른문제이다.
- 2번 문제를 봤을땐, 왼손 8과 오른손 0의 경우에는 로직이없어서, 오........... 문제에 나온 거리에 대한 기준치를 정해서 다시 해야할 것 같다.

## 2차 시도

- 거리에 대한 케이스를 다시 정리해서 메서드를 뽑앗다.
- 왼손으로 갈 수 있는 케이스1, 오른손으로 갈 수 있는 케이스2, 중첩되는 범위에서의 케이스3 을 나눴고, 메인 문장에서는 간단하게 케이스1, 2, 3의 판단만 하였다.

```java
class Solution {
    
    public String solution(int[] numbers, String hand) {
        String answer = "";
        
        int beforeL = -1;
        int beforeR = -2;
        for (int i = 0; i < numbers.length; i++){
            
            int j = numbers[i];
            int distanceL = funcDistance(beforeL, j);
            int distanceR = funcDistance(beforeR, j);
            
            // System.out.println(beforeL+"["+distanceL+"]" + "/" + beforeR+"["+distanceR+"]");
            if(j == 1 || j == 4 || j == 7){
                beforeL= j;
                answer += "L";
            }else if(j == 3 || j == 6 || j == 9){
                beforeR= j;
                answer += "R";
            }else{
                if(distanceL < distanceR){
                    beforeL = j;
                    answer += "L";
                }else if(distanceL > distanceR){
                    beforeR = j;
                    answer += "R";
                }else{
                    if(hand.equals("left")){
                        beforeL = j;
                        answer += "L";
                    }else{
                        beforeR = j;
                        answer += "R";
                    }
                }
            }
        }
        return answer;
    }
    
    public int funcDistance(int before, int after){
            if(before == -1 && 
              (after == 7 || after == 0)
              ) return 1;
            if(before == -1 && 
              (after == 4 || after == 8)
              ) return 2;
            if(before == -1 && 
              (after == 1 || after == 5)
              ) return 3;
            if(before == -1 && 
              (after == 2)
              ) return 4;

            if(before == 7 && 
              (after == 4 || after == 8)
              ) return 1;
            if(before == 7 && 
              (after == 1 || after == 5 || after == 0)
              ) return 2;
            if(before == 7 && 
              (after == 2)
              ) return 3;

            if(before == 4 && 
              (after == 1 || after == 5 || after == 7)
              ) return 1;
            if(before == 4 && 
              (after == 2 || after == 8)
              ) return 2;
            if(before == 4 && 
              (after == 0)
              ) return 3;


            if(before == 1 && 
              (after == 2 || after == 4)
              ) return 1;
            if(before == 1 && 
              (after == 5 || after == 7)
              ) return 2;
            if(before == 1 && 
              (after == 8)
              ) return 3;
            if(before == 1 && 
              (after == 0)
              ) return 4;

      
        
            if(before == -2 && 
              (after == 9 || after == 0)
              ) return 1;
            if(before == -2 && 
              (after == 6 || after == 8)
              ) return 2;
            if(before == -2 && 
              (after == 3 || after == 5)
              ) return 3;
            if(before == -2 && 
              (after == 2)
              ) return 4;

            if(before == 9 && 
              (after == 6 || after == 8)
              ) return 1;
            if(before == 9 && 
              (after == 3 || after == 6 || after == 0)
              ) return 2;
            if(before == 9 && 
              (after == 2)
              ) return 3;

            if(before == 6 && 
              (after == 3 || after == 5 || after == 9)
              ) return 1;
            if(before == 6 && 
              (after == 2 || after == 8)
              ) return 2;
            if(before == 6 && 
              (after == 0)
              ) return 3;


            if(before == 3 && 
              (after == 2 || after == 6)
              ) return 1;
            if(before == 3 && 
              (after == 5 || after == 9)
              ) return 2;
            if(before == 3 && 
              (after == 8)
              ) return 3;
            if(before == 3 && 
              (after == 0)
              ) return 4;

        
        
            //공통부분
            if(before == 2 && 
              (after == 1 || after == 3 || after == 5)
              ) return 1;
            if(before == 2 && 
              (after == 4 || after == 6 || after == 8)
              ) return 2;
            if(before == 2 && 
              (after == 7 || after == 0 || after == 9)
              ) return 3;

            if(before == 5 && 
              (after == 2 || after == 4 || after == 6 || after == 8)
              ) return 1;
            if(before == 5 && 
              (after == 1 || after == 3 || after == 7 || after == 9 || after == 0)
              ) return 2;

            if(before == 8 && 
              (after == 5 || after == 7 || after == 9 || after == 0)
              ) return 1;
            if(before == 8 && 
              (after == 2 || after == 4 || after == 6)
              ) return 2;
            if(before == 8 && 
              (after == 1 || after == 3)
              ) return 3;

            if(before == 0 && 
              (after == 8)
              ) return 1;
            if(before == 0 && 
              (after == 5 || after == 7 || after == 9)
              ) return 2;
            if(before == 0 && 
              (after == 2 || after == 4 || after == 6)
              ) return 3;
            if(before == 0 && 
              (after == 1 || after == 3)
              ) return 4;
        
        
        return 99;
    }
}


```

### 결과
 
[![결과](/assets/imgs/codetest/3.pushkeypad/2-2-1.success.png)](/assets/imgs/imgs/codetest/3.pushkeypad/2-2-1.success.png)

### 제출결과

[![결과](/assets/imgs/codetest/3.pushkeypad/2-2-2.fail.png)](/assets/imgs/imgs/codetest/3.pushkeypad/2-2-2.fail.png)

### 생각

- 3개의 문제에 성공해서 성공할 줄 알았는데, 이전 코드보다 조금더 잘맞춘 코드가 됬다.
- 






## 3차 시도

- 케이스의 내용을 좀더 보강하여 ```return 99```로 빠지던 예외를 모든 거리를 계산하여 처리할 수 있게 수정했다.

```java
class Solution {
    
    public String solution(int[] numbers, String hand) {
        String answer = "";
        
        int beforeL = -1;
        int beforeR = -2;
        for (int i = 0; i < numbers.length; i++){
            
            int j = numbers[i];
            int distanceL = funcDistance(beforeL, j);
            int distanceR = funcDistance(beforeR, j);
            
            // System.out.println(beforeL+"["+distanceL+"]" + "/" + beforeR+"["+distanceR+"]");
            if(j == 1 || j == 4 || j == 7){
                beforeL= j;
                answer += "L";
            }else if(j == 3 || j == 6 || j == 9){
                beforeR= j;
                answer += "R";
            }else{
                if(distanceL < distanceR){
                    beforeL = j;
                    answer += "L";
                }else if(distanceL > distanceR){
                    beforeR = j;
                    answer += "R";
                }else{
                    if(hand.equals("left")){
                        beforeL = j;
                        answer += "L";
                    }else{
                        beforeR = j;
                        answer += "R";
                    }
                }
            }
        }
        return answer;
    }
    
    public int funcDistance(int before, int after){
        
            if(before == -1 && 
              (after == 7 || after == 0)
              ) return 1;
            if(before == -1 && 
              (after == 4 || after == 8)
              ) return 2;
            if(before == -1 && 
              (after == 1 || after == 5 || after == 9)
              ) return 3;
            if(before == -1 && 
              (after == 2 || after == 6)
              ) return 4;
            if(before == -1 && 
              (after == 3)
              ) return 5;

            if(before == 7 && 
              (after == 4 || after == 8)
              ) return 1;
            if(before == 7 && 
              (after == 1 || after == 5 || after == 0 || after == 9)
              ) return 2;
            if(before == 7 && 
              (after == 2 || after == 6)
              ) return 3;
            if(before == 7 && 
              (after == 3)
              ) return 4;


            if(before == 4 && 
              (after == 1 || after == 5 || after == 7)
              ) return 1;
            if(before == 4 && 
              (after == 2 || after == 6 || after == 8)
              ) return 2;
            if(before == 4 && 
              (after == 0 || after == 3 || after == 9)
              ) return 3;


            if(before == 1 && 
              (after == 2 || after == 4)
              ) return 1;
            if(before == 1 && 
              (after == 3 || after == 5 || after == 7)
              ) return 2;
            if(before == 1 && 
              (after == 6 || after == 8)
              ) return 3;
            if(before == 1 && 
              (after == 9 || after == 0)
              ) return 4;

      
        
            if(before == -2 && 
              (after == 9 || after == 0)
              ) return 1;
            if(before == -2 && 
              (after == 6 || after == 8)
              ) return 2;
            if(before == -2 && 
              (after == 3 || after == 5 || after == 7)
              ) return 3;
            if(before == -2 && 
              (after == 2 || after == 4)
              ) return 4;
            if(before == -2 && 
              (after == 1)
              ) return 5;

            if(before == 9 && 
              (after == 6 || after == 8)
              ) return 1;
            if(before == 9 && 
              (after == 3 || after == 5 || after == 7 || after == 0)
              ) return 2;
            if(before == 9 && 
              (after == 2 || after == 4)
              ) return 3;
            if(before == 9 && 
              (after == 1)
              ) return 4;

            if(before == 6 && 
              (after == 3 || after == 5 || after == 9)
              ) return 1;
            if(before == 6 && 
              (after == 2 || after == 4 || after == 8)
              ) return 2;
            if(before == 6 && 
              (after == 1 || after == 7 || after == 0)
              ) return 3;


            if(before == 3 && 
              (after == 2 || after == 6)
              ) return 1;
            if(before == 3 && 
              (after == 1 || after == 5 || after == 9)
              ) return 2;
            if(before == 3 && 
              (after == 4 || after == 8)
              ) return 3;
            if(before == 3 && 
              (after == 7 || after == 0)
              ) return 4;

        
        
            //공통부분
            if(before == 2 && 
              (after == 1 || after == 3 || after == 5)
              ) return 1;
            if(before == 2 && 
              (after == 4 || after == 6 || after == 8)
              ) return 2;
            if(before == 2 && 
              (after == 7 || after == 0 || after == 9)
              ) return 3;

            if(before == 5 && 
              (after == 2 || after == 4 || after == 6 || after == 8)
              ) return 1;
            if(before == 5 && 
              (after == 1 || after == 3 || after == 7 || after == 9 || after == 0)
              ) return 2;

            if(before == 8 && 
              (after == 5 || after == 7 || after == 9 || after == 0)
              ) return 1;
            if(before == 8 && 
              (after == 2 || after == 4 || after == 6)
              ) return 2;
            if(before == 8 && 
              (after == 1 || after == 3)
              ) return 3;

            if(before == 0 && 
              (after == 8)
              ) return 1;
            if(before == 0 && 
              (after == 5 || after == 7 || after == 9)
              ) return 2;
            if(before == 0 && 
              (after == 2 || after == 4 || after == 6)
              ) return 3;
            if(before == 0 && 
              (after == 1 || after == 3)
              ) return 4;
        
        
        return 99;
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/3.pushkeypad/2-3-1.success.png)](/assets/imgs/imgs/codetest/3.pushkeypad/2-3-1.success.png)

### 효율성테스트

[![결과](/assets/imgs/codetest/3.pushkeypad/2-3-2.fail.png)](/assets/imgs/imgs/codetest/3.pushkeypad/2-3-2.fail.png)

### 생각

- 케이스를 보강하였지만, (IF문의 경우의 수 추가) 통과되지 않았다.
- 뭘까뭘까하다, 테스트 케이스를 추가해보기 시작했다.

## 4차 시도 - 성공

- 테스트 케이스 ```[0,0,0,0,0]``` 가 실패했다. ?????? 아! 동일한 숫자가 나오면 99로 빠지는것 같다.



```java
class Solution {
    
    public String solution(int[] numbers, String hand) {
        String answer = "";
        
        int beforeL = -1;
        int beforeR = -2;
        for (int i = 0; i < numbers.length; i++){
            
            int j = numbers[i];
            int distanceL = funcDistance(beforeL, j);
            int distanceR = funcDistance(beforeR, j);
            
            // System.out.println(beforeL+"["+distanceL+"]" + "/" + beforeR+"["+distanceR+"]");
            if(j == 1 || j == 4 || j == 7){
                beforeL= j;
                answer += "L";
            }else if(j == 3 || j == 6 || j == 9){
                beforeR= j;
                answer += "R";
            }else{
                if(distanceL < distanceR){
                    beforeL = j;
                    answer += "L";
                }else if(distanceL > distanceR){
                    beforeR = j;
                    answer += "R";
                }else{
                    if(hand.equals("left")){
                        beforeL = j;
                        answer += "L";
                    }else{
                        beforeR = j;
                        answer += "R";
                    }
                }
            }
        }
        return answer;
    }
    
    public int funcDistance(int before, int after){
            if(before == after) return 0;
        
            if(before == -1 && 
              (after == 7 || after == 0)
              ) return 1;
            if(before == -1 && 
              (after == 4 || after == 8)
              ) return 2;
            if(before == -1 && 
              (after == 1 || after == 5 || after == 9)
              ) return 3;
            if(before == -1 && 
              (after == 2 || after == 6)
              ) return 4;
            if(before == -1 && 
              (after == 3)
              ) return 5;

            if(before == 7 && 
              (after == 4 || after == 8)
              ) return 1;
            if(before == 7 && 
              (after == 1 || after == 5 || after == 0 || after == 9)
              ) return 2;
            if(before == 7 && 
              (after == 2 || after == 6)
              ) return 3;
            if(before == 7 && 
              (after == 3)
              ) return 4;


            if(before == 4 && 
              (after == 1 || after == 5 || after == 7)
              ) return 1;
            if(before == 4 && 
              (after == 2 || after == 6 || after == 8)
              ) return 2;
            if(before == 4 && 
              (after == 0 || after == 3 || after == 9)
              ) return 3;


            if(before == 1 && 
              (after == 2 || after == 4)
              ) return 1;
            if(before == 1 && 
              (after == 3 || after == 5 || after == 7)
              ) return 2;
            if(before == 1 && 
              (after == 6 || after == 8)
              ) return 3;
            if(before == 1 && 
              (after == 9 || after == 0)
              ) return 4;

      
        
            if(before == -2 && 
              (after == 9 || after == 0)
              ) return 1;
            if(before == -2 && 
              (after == 6 || after == 8)
              ) return 2;
            if(before == -2 && 
              (after == 3 || after == 5 || after == 7)
              ) return 3;
            if(before == -2 && 
              (after == 2 || after == 4)
              ) return 4;
            if(before == -2 && 
              (after == 1)
              ) return 5;

            if(before == 9 && 
              (after == 6 || after == 8)
              ) return 1;
            if(before == 9 && 
              (after == 3 || after == 5 || after == 7 || after == 0)
              ) return 2;
            if(before == 9 && 
              (after == 2 || after == 4)
              ) return 3;
            if(before == 9 && 
              (after == 1)
              ) return 4;

            if(before == 6 && 
              (after == 3 || after == 5 || after == 9)
              ) return 1;
            if(before == 6 && 
              (after == 2 || after == 4 || after == 8)
              ) return 2;
            if(before == 6 && 
              (after == 1 || after == 7 || after == 0)
              ) return 3;


            if(before == 3 && 
              (after == 2 || after == 6)
              ) return 1;
            if(before == 3 && 
              (after == 1 || after == 5 || after == 9)
              ) return 2;
            if(before == 3 && 
              (after == 4 || after == 8)
              ) return 3;
            if(before == 3 && 
              (after == 7 || after == 0)
              ) return 4;

        
        
            //공통부분
            if(before == 2 && 
              (after == 1 || after == 3 || after == 5)
              ) return 1;
            if(before == 2 && 
              (after == 4 || after == 6 || after == 8)
              ) return 2;
            if(before == 2 && 
              (after == 7 || after == 0 || after == 9)
              ) return 3;

            if(before == 5 && 
              (after == 2 || after == 4 || after == 6 || after == 8)
              ) return 1;
            if(before == 5 && 
              (after == 1 || after == 3 || after == 7 || after == 9 || after == 0)
              ) return 2;

            if(before == 8 && 
              (after == 5 || after == 7 || after == 9 || after == 0)
              ) return 1;
            if(before == 8 && 
              (after == 2 || after == 4 || after == 6)
              ) return 2;
            if(before == 8 && 
              (after == 1 || after == 3)
              ) return 3;

            if(before == 0 && 
              (after == 8)
              ) return 1;
            if(before == 0 && 
              (after == 5 || after == 7 || after == 9)
              ) return 2;
            if(before == 0 && 
              (after == 2 || after == 4 || after == 6)
              ) return 3;
            if(before == 0 && 
              (after == 1 || after == 3)
              ) return 4;
        
        
        return 99;
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/3.pushkeypad/2-4-1.success.png)](/assets/imgs/imgs/codetest/3.pushkeypad/2-4-1.success.png)

### 효율성테스트

[![결과](/assets/imgs/codetest/3.pushkeypad/2-4-2.fail.png)](/assets/imgs/imgs/codetest/3.pushkeypad/2-4-2.fail.png)

### 생각

- 아흑 통과다. 
- 너무 무식한방법이지만, 결과가 좋다
- 다른 사람들은 계산식으로하는거같은데.. 생각을 넓혀야겠다.


## 첨삭

like 가 가장많은 다른 사람의 코드

```java
class Solution {
    //        0부터 9까지 좌표 {y,x}
    int[][] numpadPos = {
            {3,1}, //0
            {0,0}, //1
            {0,1}, //2
            {0,2}, //3
            {1,0}, //4
            {1,1}, //5
            {1,2}, //6
            {2,0}, //7
            {2,1}, //8
            {2,2}  //9
    };
    //초기 위치
    int[] leftPos = {3,0};
    int[] rightPos = {3,2};
    String hand;
    public String solution(int[] numbers, String hand) {
        this.hand = (hand.equals("right")) ? "R" : "L";

        String answer = "";
        for (int num : numbers) {
            String Umji = pushNumber(num);
            answer += Umji;

            if(Umji.equals("L")) {leftPos = numpadPos[num]; continue;}
            if(Umji.equals("R")) {rightPos = numpadPos[num]; continue;}
        }
        return answer;
    }

    //num버튼을 누를 때 어디 손을 사용하는가
    private String pushNumber(int num) {
        if(num==1 || num==4 || num==7) return "L";
        if(num==3 || num==6 || num==9) return "R";

        // 2,5,8,0 일때 어디 손가락이 가까운가
        if(getDist(leftPos, num) > getDist(rightPos, num)) return "R";
        if(getDist(leftPos, num) < getDist(rightPos, num)) return "L";

        //같으면 손잡이
        return this.hand;
    }

    //해당 위치와 번호 위치의 거리
    private int getDist(int[] pos, int num) {
        return Math.abs(pos[0]-numpadPos[num][0]) + Math.abs(pos[1]-numpadPos[num][1]);
    }
}
```

[![결과](/assets/imgs/codetest/3.pushkeypad/3.othersuccess.png)](/assets/imgs/codetest/3.pushkeypad/3.othersuccess.png)


### 검토
- 2차원 테이블을 이용해 거리를 계산했다.
- 테이블의 순서를 키패드로 이용했고, 그 위치를 좌상단 1번기준으로 좌표처럼 표시했다.
- 나의 엄청난 IF 문 빼고는 거의 비슷하다.
- 나의 엄청난 IF문은 이 한 문장으로 대체 되었다. ```Math.abs(pos[0]-numpadPos[num][0]) + Math.abs(pos[1]-numpadPos[num][1]);``` 가로 절대값 길이 + 세로 절대값 길이
  


### 생각

- 고정된 거리의 계산문제에서 저 코드를 활용할 수 있도록 눈여겨 봐놔야겠다.
