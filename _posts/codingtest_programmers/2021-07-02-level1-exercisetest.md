---
title: 모의고사
categories: 
  - codingtest-level1
tags:
  - codingtest-level1
  
toc: true
---

[![문제](/assets/imgs/codetest/7.exercisetest/1-1.question.png)](/assets/imgs/imgs/codetest/7.exercisetest/1-1.question.png)
[![문제](/assets/imgs/codetest/7.exercisetest/1-2.question.png)](/assets/imgs/imgs/codetest/7.exercisetest/1-2.question.png)

## 1차 시도

```java
import java.util.ArrayList;
class Solution {
    public int[] solution(int[] answers) {
        int[] answer = {};
        int[] value = {0,0,0};
        for(int i = 0; i < answers.length; i++){
            value[0] += firstperson(answers[i], i+1);
            value[1] += secondperson(answers[i], i+1);
            value[2] += threeperson(answers[i], i+1);
        }
        
        //가장 높은 점수인 사람 찾기
        ArrayList<Integer> list = new ArrayList<Integer>();
        int score = 0;
        for(int i = 0; i < value.length; i++){
            if(score < value[i]) {
                score = value[i];
                list.clear();
                list.add(i+1);
            }else if(score == value[i]) {
                score = value[i];
                list.add(i+1);
            }
        }
        answer = new int[list.size()];
        
        for(int i = 0; i < list.size(); i++){
            answer[i] = list.get(i);
        }
        
        return answer;
    }
    
    private int firstperson(int answers, int j){
        int cnt = 0;
        //1
        if((j % 5) == 1){
            if(1 == answers) cnt++;
        }else if((j % 5) == 2){
            if(2 == answers) cnt++;
        }else if((j % 5) == 3){
            if(3 == answers) cnt++;
        }else if((j % 5) == 4){
            if(4 == answers) cnt++;
        }else if((j % 5) == 0){
            if(5 == answers) cnt++;
        }
        return cnt;
    }

    private int secondperson(int answers, int j){
        int cnt = 0;
        //2
        if((j % 8) == 1){
            if(2 == answers) cnt++;
        }else if((j % 8) == 2){
            if(1 == answers) cnt++;
        }else if((j % 8) == 3){
            if(2 == answers) cnt++;
        }else if((j % 8) == 4){
            if(3 == answers) cnt++;
        }else if((j % 8) == 5){
            if(2 == answers) cnt++;
        }else if((j % 8) == 6){
            if(4 == answers) cnt++;
        }else if((j % 8) == 7){
            if(2 == answers) cnt++;
        }else if((j % 8) == 0){
            if(5 == answers) cnt++;
        }
        return cnt;
    }
           

    private int threeperson(int answers, int j){
        int cnt = 0;
        //3
        if((j % 10) == 1){
            if(3 == answers) cnt++;
        }else if((j % 10) == 2){
            if(3 == answers) cnt++;
        }else if((j % 10) == 3){
            if(1 == answers) cnt++;
        }else if((j % 10) == 4){
            if(1 == answers) cnt++;
        }else if((j % 10) == 5){
            if(2 == answers) cnt++;
        }else if((j % 10) == 6){
            if(2 == answers) cnt++;
        }else if((j % 10) == 7){
            if(4 == answers) cnt++;
        }else if((j % 10) == 8){
            if(4 == answers) cnt++;
        }else if((j % 10) == 9){
            if(5 == answers) cnt++;
        }else if((j % 10) == 0){
            if(5 == answers) cnt++;
        }
        return cnt;
    }
}
```

### 결과
 
[![결과](/assets/imgs/codetest/7.exercisetest/2-1-1.success.png)](/assets/imgs/imgs/codetest/7.exercisetest/2-1-1.success.png)

### 제출결과

[![결과](/assets/imgs/codetest/7.exercisetest/2-1-2.fail.png)](/assets/imgs/imgs/codetest/7.exercisetest/2-1-2.fail.png)

### 생각

- 문제와 도출하자는 답에 대해 잘 이해가 안갔었다.
- 그외의 큰 문제는 없었다.

## 첨삭

like 가 많고, 요구사항과 코딩이 가시적으로 한번에 구분되는 코드.

```java
import java.util.ArrayList;
class Solution {
    public int[] solution(int[] answer) {
        int[] a = {1, 2, 3, 4, 5};
        int[] b = {2, 1, 2, 3, 2, 4, 2, 5};
        int[] c = {3, 3, 1, 1, 2, 2, 4, 4, 5, 5};
        int[] score = new int[3];
        for(int i=0; i<answer.length; i++) {
            if(answer[i] == a[i%a.length]) {score[0]++;}
            if(answer[i] == b[i%b.length]) {score[1]++;}
            if(answer[i] == c[i%c.length]) {score[2]++;}
        }
        int maxScore = Math.max(score[0], Math.max(score[1], score[2]));
        ArrayList<Integer> list = new ArrayList<>();
        if(maxScore == score[0]) {list.add(1);}
        if(maxScore == score[1]) {list.add(2);}
        if(maxScore == score[2]) {list.add(3);}
        return list.stream().mapToInt(i->i.intValue()).toArray();
    }
}
```


### 검토
- 경우의 수를 배열로 저장하였고, 최대 값 비교에 Math.max 함수를 사용하였다.
- return 시 Collection.stream... 을 사용하였다. (공부안했던부분.)


### 생각

- 조금만 생각을 정리한다면, 코드의 1/3이 줄었을 것이다.(경우의 수 배열.)
- Collection.stream 을 공부해보자.
- 흠.. 처리속도는 내꺼가 빠르다.